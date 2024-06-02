import { Link as RouterLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { Box, Button, Link } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";

const categorieslist = ["Electrinies", "Fruits", "Vegetables"];

export default function Header() {
  return (
    <div className="flex justify-between  items-center p-4 shadow-lg">
      <h1>E-commerce</h1>
      <Box className="w-[60%] flex items-center gap-10">
        <Input className="w-[400px]" placeholder="Search products..." />

        <ul className="w-full flex justify-between items-center gap-10">
          <li>
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/products">Products</RouterLink>
          </li>
          <li>
            <RouterLink to="/order-history">Order_History</RouterLink>
          </li>
          <li>
            <Box position="relative" role="group">
              <Button
                bg="transparent"
                _hover={{ bg: "gray.200" }}
                _focus={{ boxShadow: "none" }}
              >
                Categories
              </Button>
              <Box
                position="absolute"
                left={0}
                display="none"
                _groupHover={{ display: "block" }}
                _hover={{ display: "block" }}
                bg="white"
                boxShadow="md"
                rounded="md"
                zIndex={1}
                w="200px"
              >
                <Box p={2}>
                  {categorieslist.map((category) => (
                    <Link
                      as={RouterLink}
                      to={`/${category}`}
                      display="block"
                      px={4}
                      py={2}
                      _hover={{ bg: "gray.100" }}
                    >
                      {category}
                    </Link>
                  ))}
                </Box>
              </Box>
            </Box>
          </li>
        </ul>
      </Box>
      <div className="flex justify-between items-center gap-10">
        <button>
          <RouterLink to="/profile">
            <FaUser className="w-5 h-5" />
          </RouterLink>
        </button>
        <button>
          <RouterLink to="/checkout">
            <FaShoppingCart className="w-5 h-5" />
          </RouterLink>
        </button>
        <button>
          <RiLogoutBoxRLine className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
