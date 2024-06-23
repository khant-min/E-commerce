import {
  Box,
  Button,
  HStack,
  Heading,
  IconButton,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useEffect, useState } from "react";
import { CartContextProps, Product, useCart } from "../CartProvider";
import ModalForm from "../../components/modal/Modal,";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const [orderedItems, setOrderedItems] = useState<Product[]>(
    JSON.parse(localStorage.getItem("cart")!)
  );
  const { removeFromCart } = useCart() as CartContextProps;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addQuantity = (id: number) => {
    setOrderedItems((prev) => {
      prev.find((item) => item.id === id)?.quantity! + 1;
      return prev;
    });
  };

  const subtractQuantity = (id: number) => {
    setOrderedItems((prev) => {
      const num = prev.find((item) => item.id === id)?.quantity! - 1;
      return prev;
    });
  };

  useEffect(() => {
    setOrderedItems(JSON.parse(localStorage.getItem("cart")!));
  }, [orderedItems]);

  // useEffect(() => {}, [orderedItems.quantity]);

  return (
    <Box className="w-full flex flex-col justify-between items-center my-10">
      <Heading as="h2" size="lg">
        Shopping Cart
      </Heading>
      <Box className="w-full flex p-10 gap-10">
        <Box className="w-full flex flex-col justify-start items-start gap-10">
          {orderedItems.length ? (
            orderedItems.map((product) => (
              <Box
                key={product.id}
                className="w-full flex justify-between items-center"
              >
                <Box className="flex justify-between items-center gap-6">
                  <Image src={product.image} className="w-16 h-14 rounded-md" />
                  <Box>
                    <Heading as="h4" size="sm">
                      {product.name}
                    </Heading>
                    <Text>
                      {product.description.length > 70
                        ? `${product.description.slice(0, 70)}...`
                        : product.description}
                    </Text>
                  </Box>
                </Box>
                <Box className="flex justify-between items-center gap-6">
                  <HStack spacing={4}>
                    <Button onClick={() => subtractQuantity(product.id)}>
                      -
                    </Button>
                    <Text>{product.quantity}</Text>
                    <Button onClick={() => addQuantity(product.id)}>+</Button>
                  </HStack>
                  <Text>${product.price}</Text>
                  <Button color="red" onClick={onOpen}>
                    <IconButton
                      size="xs"
                      fontSize={20}
                      color="red"
                      icon={<MdDelete />}
                      aria-label="Remove an item"
                    />
                  </Button>
                </Box>

                <ModalForm
                  title="Are you sure?"
                  body="Delete this product from cart."
                  isOpen={isOpen}
                  onClose={onClose}
                  onSubmit={() => console.log(product)}
                />
              </Box>
            ))
          ) : (
            <div>You doesn't have any order yet!</div>
          )}
        </Box>
        <Box className="w-[30%] flex flex-col gap-4 text-center">
          <Heading as="h3" size="md">
            Order Summary
          </Heading>
          <TableContainer>
            <Table variant="simple">
              <Tbody>
                <Tr>
                  <Td>Shopping Fee</Td>
                  <Td>$19.99</Td>
                </Tr>
                <Tr>
                  <Td>Discount</Td>
                  <Td>$23.99</Td>
                </Tr>
                <Tr>
                  <Td>Subtotal</Td>
                  <Td>$199.98</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <Box className="flex gap-10">
            <Button
              className="hover:scale-105"
              colorScheme="blue"
              variant="outline"
              onClick={() => navigate("/products")}
            >
              <IoMdArrowRoundBack />
              Back
            </Button>
            <Button
              className="hover:scale-105"
              colorScheme="blue"
              onClick={() => navigate("/order")}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
