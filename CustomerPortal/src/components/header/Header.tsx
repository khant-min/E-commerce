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
import { CartContextProps, useCart } from "../../contexts/CartProvider";
import UserService from "../../services/UserService";
import { useEffect, useState } from "react";
import axios from "axios";
import CategoryService from "../../services/CategoryService";

interface CategoryList {
  id: number;
  name: string;
  description: string;
}

export default function Header() {
  const navigate = useNavigate();
  const toast = useToast();
  // const { cart } = useCart() as CartContextProps;
  // const [cart, setCart] = useState([]);
  const [categoryList, setCategoryList] = useState<CategoryList[]>([]);

  const cart = JSON.parse(localStorage.getItem("cart")!);

  // useEffect(() => {
  //   setCart(JSON.parse(localStorage.getItem("cart")!));
  // }, [localStorage.getItem("cart")]);

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

  const fetchData = async () => {
    const res = await CategoryService.getList();
    setCategoryList(res.data);
  };

  const fetchProducts = async (categoryId: number) => {
    const res = await CategoryService.getProductListByCategoryId(categoryId);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
                  {categoryList.map((category) => (
                    <Link
                      key={category.id}
                      as={RouterLink}
                      to={`/products?category=${category.id}`}
                      display="block"
                      px={4}
                      py={2}
                      _hover={{ bg: "gray.100" }}
                    >
                      {category.name}
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
          <Button colorScheme="blue" onClick={() => navigate("/register")}>
            Register
          </Button>
          <Button colorScheme="blue" onClick={() => navigate("/login")}>
            Login
          </Button>
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
                {cart.length > 0 && (
                  <Badge
                    position="absolute"
                    top="-1"
                    right="-1"
                    borderRadius="full"
                    px="2"
                    colorScheme="red"
                  >
                    {cart.length}
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
