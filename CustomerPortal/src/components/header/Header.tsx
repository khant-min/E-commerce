import { Link as RouterLink, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import {
  Badge,
  Box,
  Button,
  IconButton,
  Link,
  useToast,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { CartContextProps, useCart } from "../../containers/CartProvider";
import UserService from "../../services/UserService";

const categorieslist = ["Electrinies", "Fruits", "Vegetables"];

export default function Header() {
  const navigate = useNavigate();
  const toast = useToast();
  const { itemCountInCart } = useCart() as CartContextProps;

  const logout = async () => {
    const user = JSON.parse(localStorage.getItem("user")!);
    const res = await UserService.logout({ userId: user.userId });
    // console.log(res);

    if (res.success) {
      toast({
        title: "Logout successed.",
        // description: "Please login to enter site",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      localStorage.removeItem("user");
      navigate("/");
    } else {
      toast({
        title: "Logout failed.",
        description: res.data.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

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

      {localStorage.getItem("user") === null ? (
        <Box className="flex gap-2">
          <Button onClick={() => navigate("/register")}>Register</Button>
          <Button onClick={() => navigate("/login")}>Login</Button>
        </Box>
      ) : (
        <div className="flex justify-between items-center gap-10">
          <button>
            <RouterLink to="/profile">
              <IconButton
                icon={<FaUser />}
                aria-label="Profile"
                variant="outline"
              />
            </RouterLink>
          </button>
          <button>
            <RouterLink to="/checkout">
              <Box position="relative" display="inline-block">
                <IconButton
                  icon={<FaShoppingCart />}
                  aria-label="Shopping Cart"
                  variant="outline"
                />
                {itemCountInCart > 0 && (
                  <Badge
                    position="absolute"
                    top="-1"
                    right="-1"
                    borderRadius="full"
                    px="2"
                    colorScheme="red"
                  >
                    {itemCountInCart}
                  </Badge>
                )}
              </Box>
            </RouterLink>
          </button>
          <button>
            <IconButton
              onClick={logout}
              fontSize={20}
              icon={<RiLogoutBoxRLine />}
              aria-label="Logout"
              variant="outline"
            />
          </button>
        </div>
      )}
    </div>
  );
}
