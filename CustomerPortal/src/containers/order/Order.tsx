import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import OrderService from "../../services/OrderService";

export default function Order() {
  const navigate = useNavigate();
  const location = useLocation();
  const { subtotal, tax, shoppingFee, discount } = location.state;
  const toast = useToast();

  const user = JSON.parse(localStorage.getItem("user")!);
  const cart = JSON.parse(localStorage.getItem("cart")!);
  const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo")!);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const deliveryFee = 5000;
  const total =
    subtotal + deliveryFee + tax + shoppingFee - (subtotal * 2) / 100;

  const onSubmit = (data: any) => {
    console.log(data);
    localStorage.setItem("shippingInfo", JSON.stringify(data));
  };

  const placeOrder = async () => {
    const orderData = {
      userId: user.userId,
      orderItems: cart.map((item: any) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      shippingAddress: shippingInfo.address,
      paymentMethod: shippingInfo.paymentMethod,
      orderNotes: shippingInfo.orderNotes,
    };

    const res = await OrderService.create(orderData);
    console.log("last res: ", res);

    if (res.success) {
      toast({
        title: "Ordered successed.",
        description:
          "Your order is processing, after done we'll send you an email",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      localStorage.removeItem("cart");
    } else {
      toast({
        title: "Ordered failed.",
        description: res.data.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <Box className="w-full flex flex-col justify-between items-center my-10">
      <Heading as="h2" size="lg">
        Shipping Info
      </Heading>
      <Box className="w-full flex p-10 gap-10">
        {/* <Box className="w-full flex flex-col justify-start items-start gap-10"></Box> */}

        <Box
          //   maxW="md"
          mx="auto"
          mt={5}
          p={5}
          borderWidth={1}
          borderRadius="md"
          boxShadow="md"
          width="50%"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl id="name" isInvalid={!!errors.name}>
                <FormLabel>Full Name</FormLabel>
                <Input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                />
              </FormControl>

              <FormControl id="phoneNumber" isInvalid={!!errors.phoneNumber}>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  type="number"
                  {...register("phoneNumber", {
                    required: "Phone Number is required",
                  })}
                />
              </FormControl>

              <FormControl id="address" isInvalid={!!errors.address}>
                <FormLabel>Address</FormLabel>
                <Input
                  type="text"
                  {...register("address", { required: "Address is required" })}
                />
              </FormControl>

              <FormControl
                id="paymentMethod"
                isInvalid={!!errors.paymentMethod}
              >
                <FormLabel>Payment Method</FormLabel>
                <Select
                  {...register("paymentMethod", {
                    required: "Payment Method is required",
                  })}
                >
                  <option value="KPAY">KPAY</option>
                  <option value="WAVEPAY">WAVEPAY</option>
                  <option value="PAYPAL">PAYPAL</option>
                </Select>
              </FormControl>

              <FormControl id="orderNotes" isInvalid={!!errors.orderNotes}>
                <FormLabel>Order Notes</FormLabel>
                <Input
                  type="text"
                  {...register("orderNotes", {
                    required: "Order Notes is required",
                  })}
                />
              </FormControl>

              <FormControl className="flex items-center justify-end gap-6">
                <Button
                  onClick={() => navigate("/products")}
                  type="submit"
                  variant="outline"
                  colorScheme="blue"
                  size="md"
                  width="20%"
                  alignSelf="end"
                  className="hover:scale-105"
                >
                  <IoMdArrowRoundBack />
                  Back
                </Button>

                <Button
                  type="submit"
                  className="hover:scale-105 w-40"
                  colorScheme="blue"
                >
                  Save
                </Button>
              </FormControl>
            </Stack>
          </form>
        </Box>
        <Box className="w-[30%] flex flex-col gap-4 text-center">
          <Heading as="h3" size="md">
            Order Summary
          </Heading>
          <TableContainer>
            <Table variant="simple">
              <Tbody>
                <Tr>
                  <Td>Subtotal</Td>
                  <Td>{subtotal} Ks</Td>
                </Tr>
                <Tr>
                  <Td>Delivery Fee</Td>
                  <Td>{deliveryFee} Ks</Td>
                </Tr>
                <Tr>
                  <Td>Tax</Td>
                  <Td className="flex gap-4">
                    {tax} Ks <p className="font-semibold">(5%)</p>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Total</Td>
                  <Td>{total} Ks</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <Box className="flex justify-center gap-10">
            <Button
              className="hover:scale-105"
              colorScheme="blue"
              width="full"
              onClick={placeOrder}
            >
              Place Order
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
