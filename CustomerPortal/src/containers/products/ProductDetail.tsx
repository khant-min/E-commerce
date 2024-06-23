import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { CartContextProps, useCart } from "../CartProvider";

const ProductDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state;
  const [mainImg, setMainImg] = useState("");
  const { addToCart } = useCart() as CartContextProps;

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
      boxShadow="lg"
    >
      <Flex align="center" justifyContent="space-between" gap="20">
        <VStack>
          <Box as={motion.div} whileHover={{ scale: 1.05 }} mb={4}>
            <Image
              src={mainImg ? mainImg : product.images[0].image}
              alt={product.name}
              width={1000}
              height={400}
              objectFit="cover"
              borderRadius="md"
            />
          </Box>
          <HStack mb={4} spacing={2}>
            {product.images.map((image: any, index: number) => (
              <Box
                as={motion.div}
                whileHover={{ scale: 1.1, cursor: "pointer" }}
                key={index}
                borderWidth="1px"
                borderRadius="md"
                overflow="hidden"
                onClick={() => setMainImg(image.image)}
              >
                <Image
                  src={image.image}
                  alt={`${product.name}-${index}`}
                  boxSize="50px"
                  objectFit="cover"
                />
              </Box>
            ))}
          </HStack>
        </VStack>

        <VStack align="start" spacing={3} w="full">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Text fontSize="2xl" fontWeight="bold" lineHeight="short">
            {product.name}
          </Text>
          <Text fontSize="md" color="gray.600">
            {product.description}
          </Text>
          <Text fontWeight="bold" fontSize="xl" color="teal.600">
            {product.sellPrice} $
          </Text>

          <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
            <GridItem>
              <Text>
                Brand: <strong>{product.brand}</strong>
              </Text>
            </GridItem>
            <GridItem>
              <Text>
                Remaining Items: <strong>{product.quantityInStock}</strong>
              </Text>
            </GridItem>
            <GridItem>
              <Text>
                Weight: <strong>{product.weight}</strong>
              </Text>
            </GridItem>
            <GridItem>
              <Text>
                Dimensions:
                <strong>
                  {product.width} x {product.height}
                </strong>
              </Text>
            </GridItem>
            <GridItem>
              <Text>
                Brand: <strong>{product.brand}</strong>
              </Text>
            </GridItem>
            <GridItem>
              <Text>
                Color: <strong>{product.color}</strong>
              </Text>
            </GridItem>
            <GridItem>
              <Text>
                Expire Date: <strong>{product.expirationDate}</strong>
              </Text>
            </GridItem>
            <GridItem gridColumn={2} className="flex gap-6 my-10">
              <Button
                className="flex gap-2 hover:scale-105"
                colorScheme="blue"
                onClick={() => navigate("/products")}
              >
                <IoMdArrowRoundBack />
                Back
              </Button>
              <Button
                className="flex gap-2 hover:scale-105"
                colorScheme="blue"
                onClick={() =>
                  addToCart({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    quantity: 1,
                    price: product.sellPrice,
                    image: product.images[0].image,
                  })
                }
              >
                <FaShoppingCart />
                Add to Cart
              </Button>
            </GridItem>
          </Grid>
        </VStack>
      </Flex>
    </Box>
  );
};

export default ProductDetail;
