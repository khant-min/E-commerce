import { Box, Heading, Text, Button, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <Box className="container mx-auto p-6 my-16">
      <Box className="flex flex-wrap justify-between items-center">
        <Box className="max-w-[40%] md:w-1/2 p-4">
          <Heading as="h2" size="xl" mb={4}>
            Discover a vast array of products
          </Heading>
          <Text fontSize="lg" mb={6}>
            All in one convenient place. Start your shopping journey now and
            enjoy the best online shopping experience.
          </Text>
          <Link to="/products">
            <Button colorScheme="blue">Start Shopping</Button>
          </Link>
        </Box>
        <Box className="w-full md:w-1/2 p-4">
          <Image
            src="/images/foods.avif"
            alt="Shopping"
            className="rounded-lg"
            boxSize="100%"
            objectFit="cover"
          />
        </Box>
      </Box>

      <Box className="flex justify-between items-center my-10">
        <Box className="w-full p-4 flex flex-col items-center gap-4 text-center">
          <Image src="/icons/best-deals.svg" alt="Best deals" />
          <Heading as="h2">Best Deals</Heading>
          <Text>
            Find the best deals from different markets all in one place.
          </Text>
        </Box>

        <Box className="w-full p-4 flex flex-col items-center gap-4 text-center">
          <Image src="/icons/fast-shipping.svg" alt="Customer Support" />
          <Heading as="h2">Fast Shipping</Heading>
          <Text>
            Get your products delivered quickly with our fast shipping options.
          </Text>
        </Box>

        <Box className="w-full p-4 flex flex-col items-center gap-4 text-center">
          <Image src="/icons/customer-support.svg" alt="Fast Shipping" />
          <Heading as="h2">Customer Support</Heading>
          <Text>
            Our dedicated support team is here to help you with any inquiries.
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export default HeroSection;
