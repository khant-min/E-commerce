import asyncHandler from "../middleware/asyncHandler";
import ErrorResponse from "../utils/errorResponse";
import prisma from "../utils/prisma";

export const getOrderHistory = asyncHandler(async (req, res, next) => {
  const { userId } = req.body;

  if (!userId) return next(new ErrorResponse("User Id required.", 400));

  const foundUser = await prisma.customer.findUnique({ where: { id: userId } });

  if (!foundUser)
    return next(new ErrorResponse("This user doesn't exist.", 401));

  const orders = await prisma.order.findMany({
    where: { customerId: userId },
    select: {
      id: true,
      orderDate: true,
      orderStatus: true,
      orderNotes: true,
      paymentMethod: true,
      totalAmount: true,
      orderItems: {
        select: {
          id: true,
          orderId: false,
        },
      },
    },
  });

  res.status(200).json(orders);
});

export const getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await prisma.order.findMany({
    include: {
      orderItems: true,
      customer: true,
    },
  });

  res.status(200).json(orders);
});

/**
 * Get A Product Customer Choose
 * @route GET api/products/:id
 * @access public (All)
 * @returns chosen product
 */

/**
 *  Called when an order requested
 *  @route Post | api/orders
 *  @access private (Customer)
 *  @returns sends an order message to email
 */
export const createAnOrder = asyncHandler(async (req, res, next) => {
  const {
    userId: customerId,
    orderItems,
    shippingAddress,
    paymentMethod,
    orderNotes,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return next(new ErrorResponse("Order items are required", 400));
  }

  let subtotal = 0;
  let taxes = 0;
  let shoppingFee = 2000;
  let discounts = 2; // percentage
  let shippingCost = 5000;
  const calculatedOrderItems = [];

  for (const item of orderItems) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
    });

    if (!product) {
      return next(
        new ErrorResponse(`Product with id ${item.productId} not found`, 404)
      );
    }

    // Check if there is enough stock
    if (product.quantityInStock < item.quantity) {
      return next(
        new ErrorResponse(
          `Not enough stock for product with id ${item.productId}`,
          400
        )
      );
    }

    calculatedOrderItems.push({
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: product.sellPrice,
      totalPrice: product.sellPrice * item.quantity,
    });

    subtotal += product.sellPrice * item.quantity;
    taxes += subtotal * 0.05;

    // Subtract the ordered quantity from the stock
    await prisma.product.update({
      where: { id: item.productId },
      data: { quantityInStock: product.quantityInStock - item.quantity },
    });
  }

  const totalAmount =
    subtotal +
    shippingCost +
    taxes +
    shoppingFee -
    (subtotal * discounts) / 100;

  const newOrder = await prisma.order.create({
    data: {
      orderStatus: "PROCESSING",
      customerId,
      subtotal,
      discounts,
      taxes,
      shippingCost,
      totalAmount,
      shippingAddress,
      paymentMethod,
      orderNotes,
      orderItems: {
        create: calculatedOrderItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
        })),
      },
    },
  });

  console.log("New order created: ", newOrder);

  res.status(201).json({ message: "New order created" });
});
