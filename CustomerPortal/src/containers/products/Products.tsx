import { Badge, Box, Image } from "@chakra-ui/react";
import ProductService from "../../services/ProductService";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import CategoryService from "../../services/CategoryService";

interface Products {
  [key: string]: any;
}

export default function Products() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const categoryId = queryParams.get("category") || null;

  const [products, setProducts] = useState<Products[]>([]);

  const fetchData = async () => {
    console.log("category: ", categoryId);
    const res = categoryId
      ? await CategoryService.getProductListByCategoryId({ categoryId })
      : await ProductService.getList();
    console.log(res);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return (
    <Box className="my-14 flex-col justify-center items-center w-full cursor-pointer">
      <Box className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full">
        {!products ? (
          <Loading />
        ) : products.length ? (
          products.map((product) => (
            <Box
              key={product.id}
              onClick={() =>
                navigate(`/products/${product.id}`, { state: product })
              }
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              className="flex flex-col items-start justify-center flex-shrink-0 p-2 hover:scale-105 transition-all"
            >
              <Image src={product.images[0].image} />

              <Box p="6">
                <Box display="flex" alignItems="baseline">
                  <Badge borderRadius="full" px="2" colorScheme="teal">
                    New
                  </Badge>
                  <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                    ml="2"
                  >
                    {product.name}
                  </Box>
                </Box>

                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                >
                  {product.description}
                </Box>

                <Box>{product.sellPrice} $</Box>
              </Box>
            </Box>
          ))
        ) : (
          <div className="w-screen text-center text-2xl">
            There is no products
          </div>
        )}
      </Box>
    </Box>
  );
}
