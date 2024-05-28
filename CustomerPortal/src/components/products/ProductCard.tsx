import { Box, Card, CardBody, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {
  image: string;
  name: string;
  description: string;
  price: number;
}

const ProductCard = ({ image, name, description, price }: Props) => {
  return (
    <Card className="w-96 h-80 flex flex-col items-start justify-center flex-shrink-0">
      <Box className="bg-gray-100 m-5 w-[90%] h-[50%]">{image}</Box>
      <CardBody className="w-full">
        <Text as={"b"} fontSize={"lg"}>
          {name}
        </Text>
        <Text>{description}</Text>
        <Box className="flex justify-between items-center mt-4">
          <Text color={"purple"}>${price}</Text>
          <Link to={"#"} className="text-purple-900">
            View
          </Link>
        </Box>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
