import {
  Button,
  Card,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const res = await UserService.login({ ...data, role: "CUSTOMER" });
    console.log("res: ", res);

    if (res.success) {
      toast({
        title: "Login successed.",
        // description: "Please login to enter site",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");
    } else {
      toast({
        title: "Login failed.",
        description: res.data.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      navigate("/");
    }
  }, []);

  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "40px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
        maxWidth: "1280px",
        margin: "20px auto",
        padding: "1.5rem",
        textAlign: "center",
      }}
    >
      <div style={{ width: "50%", padding: "80px" }}>
        <Heading style={{ textAlign: "start" }}>Welcome Back!</Heading>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            // width: "80%",
          }}
        >
          <FormControl id="email" isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
            />
          </FormControl>

          <FormControl id="password" isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Enter your password"
            />
          </FormControl>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Checkbox defaultChecked>Remember Me</Checkbox>
            <Link to="/forgot-password">
              <p style={{ color: "blue" }}>Forgot your password?</p>
            </Link>
          </div>

          <Button type="submit" colorScheme="blue">
            Login
          </Button>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "60%",
            }}
          >
            <p style={{ opacity: 0.6, fontWeight: "bold" }}>
              Don't have an account?
            </p>
            <Link to="/register">
              <p style={{ color: "blue" }}>Register</p>
            </Link>
          </div>
        </form>
      </div>
      <div style={{ width: "50%" }}>
        <img src="/images/bg2.jpg" alt="" style={{ height: "100%" }} />
      </div>
    </Card>
  );
}
