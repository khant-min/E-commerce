import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import OrderService from "../../services/OrderService";

interface OrderFormData {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export default function Order() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormData>();

  const onSubmit = (data: OrderFormData) => {
    console.log(data);
  };

  const placeOrder = async (data: any) => {
    // const res = await OrderService.create()

    // userId,
    // orderItems,
    // discounts = 0,
    // taxes = 0,
    // shippingCost = 0,
    // shippingAddress,
    // paymentMethod,
    // orderNotes,
    console.log(data);
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

              <FormControl id="email" isInvalid={!!errors.email}>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                />
              </FormControl>

              <FormControl id="state" isInvalid={!!errors.state}>
                <FormLabel>Region</FormLabel>
                <Input
                  type="text"
                  {...register("state", { required: "State is required" })}
                />
              </FormControl>

              <FormControl id="city" isInvalid={!!errors.city}>
                <FormLabel>City</FormLabel>
                <Input
                  type="text"
                  {...register("city", { required: "City is required" })}
                />
              </FormControl>

              <FormControl id="state" isInvalid={!!errors.state}>
                <FormLabel>Township</FormLabel>
                <Input
                  type="text"
                  {...register("state", { required: "State is required" })}
                />
              </FormControl>

              <FormControl id="address" isInvalid={!!errors.address}>
                <FormLabel>Address</FormLabel>
                <Input
                  type="text"
                  {...register("address", { required: "Address is required" })}
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

                <Button className="hover:scale-105 w-40" colorScheme="blue">
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
                  <Td>$199.98</Td>
                </Tr>
                <Tr>
                  <Td>Delivery Fee</Td>
                  <Td>$19.99</Td>
                </Tr>
                <Tr>
                  <Td>Tax</Td>
                  <Td>$23.99</Td>
                </Tr>
                <Tr>
                  <Td>Total</Td>
                  <Td>$243.96</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <Box className="flex justify-center gap-10">
            <Button
              className="hover:scale-105"
              colorScheme="blue"
              width="full"
              onClick={() => console.log("hello")}
            >
              Place Order
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
