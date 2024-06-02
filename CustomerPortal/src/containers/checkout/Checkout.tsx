import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Checkout() {
  const data = [
    {
      name: "Product 1",
      description: "Product 1 description",
      quantity: 10,
      price: "88.88",
    },
    {
      name: "Product 2",
      description: "Product 2 description",
      quantity: 10,
      price: "88.88",
    },
    {
      name: "Product 3",
      description: "Product 3 description",
      quantity: 10,
      price: "88.88",
    },
    {
      name: "Product 4",
      description: "Product 4 description",
      quantity: 10,
      price: "88.88",
    },
  ];

  return (
    <Box className="w-full flex flex-col justify-between items-center my-10">
      <Heading as="h2" size="lg">
        Shopping Cart
      </Heading>
      <Box className="w-full flex p-10 gap-10">
        <Box className="w-full flex flex-col justify-between items-start gap-10">
          {data.map((product) => (
            <Box className="w-full flex justify-between items-center">
              <Box className="flex justify-between items-center gap-6">
                <Image src="/images/bg.jpg" className="w-16 h-14 rounded-md" />
                <Box>
                  <Heading as="h4" size="sm">
                    {product.name}
                  </Heading>
                  <Text>{product.description}</Text>
                </Box>
              </Box>
              <Box className="flex justify-between items-center gap-6">
                <HStack spacing={4}>
                  <Button>-</Button>
                  <Text>{product.quantity}</Text>
                  <Button>+</Button>
                </HStack>
                <Text>${product.price}</Text>
                <Button color="red">
                  <MdDelete className="w-6 h-6" />
                </Button>
              </Box>
            </Box>
          ))}
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
                  <Td>Shipping</Td>
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
          <Box className="flex gap-10">
            <Button>
              <IoMdArrowRoundBack />
              Back
            </Button>
            <Button>Proceed to Checkout</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
