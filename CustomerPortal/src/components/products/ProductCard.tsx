import { Box, Card, CardBody, Text } from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";

interface Props {
  image: string;
  name: string;
  description: string;
  price: string;
}

const ProductCard = (product: any) => {
  console.log("in card", product);
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/products/${1}`)}
      className="w-60 h-60 flex flex-col items-start justify-center flex-shrink-0 p-2 hover:scale-105 transition-all"
    >
      <Box className="bg-gray-100 m-5 w-[90%] h-[50%]">
        <img src="/images/bg.jpg" alt="" />
      </Box>
      <CardBody className="w-full">
        <Text as={"b"} fontSize={"lg"}>
          {product.name}
        </Text>
        <Text>{product.description}</Text>
        <Box className="flex justify-between items-center mt-4">
          <Text color={"purple"}>${product.price}</Text>
        </Box>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
