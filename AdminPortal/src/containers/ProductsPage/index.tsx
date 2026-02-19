import { useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import { Badge, Box, Button } from "@mui/material";
import { Image } from "@mui/icons-material";

export default function Product() {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const res = await ProductService.getList();
    console.log("res: ", res);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {products ? (
        <div className="">
          {products.map((product: any) => (
            <Box
              key={product.id}
              //  onClick={() =>
              //    navigate(`/products/${product.id}`, { state: product })
              //  }
              //  maxW="sm"
              //  borderWidth="1px"
              //  borderRadius="lg"
              //  overflow="hidden"
              className="flex flex-col items-start justify-center flex-shrink-0 p-2 hover:scale-105 transition-all"
            >
              <Image href={product.images[0].image} />

              <Box p="6">
                <Box display="flex" alignItems="baseline">
                  <Badge>New</Badge>
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
                // mt="1"
                // fontWeight="semibold"
                // as="h4"
                // lineHeight="tight"
                // isTruncated
                >
                  {product.description}
                </Box>

                <Box>{product.sellPrice} $</Box>
              </Box>
            </Box>
          ))}
        </div>
      ) : (
        <div>There is no products yet</div>
      )}
    </div>
  );
}
