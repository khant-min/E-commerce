import { Box, Button, Input } from "@chakra-ui/react";
import ProductCard from "../../components/products/ProductCard";

export default function Products() {
  return (
    <Box className="my-14 flex-col justify-center items-center w-full">
      <Box className="flex justify-around items-center m-5">
        <Input placeholder="Search products..." width={450} />
        <Input
          placeholder="Filter by price/ popularity (select list)..."
          width={450}
        />
        <Button className="w-[35%]" colorScheme="purple">
          Search
        </Button>
      </Box>
      <Box className="bg-gray-200 flex justify-start items-center p-6 h-screen gap-5 overflow-x-scroll scroll-m-0 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-slate-100">
        <ProductCard
          image="Image here"
          name="Name here"
          description="Description here"
          price={99.99}
        />
        <ProductCard
          image="Image here"
          name="Name here"
          description="Description here"
          price={99.99}
        />
        <ProductCard
          image="Image here"
          name="Name here"
          description="Description here"
          price={99.99}
        />
        <ProductCard
          image="Image here"
          name="Name here"
          description="Description here"
          price={99.99}
        />
        <ProductCard
          image="Image here"
          name="Name here"
          description="Description here"
          price={99.99}
        />
        <ProductCard
          image="Image here"
          name="Name here"
          description="Description here"
          price={99.99}
        />
        <ProductCard
          image="Image here"
          name="Name here"
          description="Description here"
          price={99.99}
        />
      </Box>
    </Box>
  );
}
