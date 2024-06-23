import asyncHandler from "../middleware/asyncHandler";
import ErrorResponse from "../utils/errorResponse";
import prisma from "../utils/prisma";

export const getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await prisma.order.findMany({
    include: {
      orderItems: true,
      customer: true,
    },
  });

  res.status(200).json(orders);
});

export const createAnOrder = asyncHandler(async (req, res, next) => {
  const {
    userId: customerId,
    orderItems,
    discounts = 0,
    taxes = 0,
    shippingCost = 0,
    shippingAddress,
    paymentMethod,
    orderNotes,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return next(new ErrorResponse("Order items are required", 400));
  }

  // const subtotal = orderItems.reduce(
  //   (acc: any, item: any) => acc + item.unitPrice * item.quantity,
  //   0
  // );

  const subtotal = 1000;

  const totalAmount = subtotal + taxes + shippingCost - discounts;

  const order = await prisma.order.create({
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
        create: orderItems.map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.unitPrice * item.quantity,
        })),
      },
    },
    include: {
      orderItems: true,
    },
  });

  res.status(201).json(order);
});
