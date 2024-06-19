import { Box, Button, Card, CardBody, Text } from "@chakra-ui/react";
import ProductService from "../../services/ProductService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Products {
  [key: string]: string;
}

export default function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Products[]>([]);

  const fetchData = async () => {
    const res = await ProductService.getList();
    console.log(res);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box className="my-14 flex-col justify-center items-center w-full cursor-pointer">
      <Box className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full">
        {products.length ? (
          products.map((product) => (
            <Card
              onClick={() => navigate(`/products/${1}`, { state: product })}
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
                  <Text color={"purple"}>${product.sellPrice}</Text>
                </Box>
              </CardBody>
            </Card>
          ))
        ) : (
          <div>No products...</div>
        )}
      </Box>
    </Box>
  );
}
