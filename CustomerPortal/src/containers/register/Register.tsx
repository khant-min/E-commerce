import {
  Button,
  Card,
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

export default function Register() {
  const navigate = useNavigate();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      return toast({
        title: "Account creation failed.",
        description: "Please enter same passwords.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
    const res = await UserService.register(data);
    console.log("res: ", res);

    if (res.success) {
      toast({
        title: "Account creation successed.",
        description: "Please login to enter site",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      navigate("/login");
    } else {
      toast({
        title: "Account creation failed.",
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
      <div style={{ width: "50%" }}>
        <img src="/images/bg.jpg" alt="" style={{ height: "100%" }} />
      </div>
      <div style={{ width: "50%", padding: "20px" }}>
        <Heading style={{ textAlign: "start" }}>Create an Account</Heading>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            width: "80%",
          }}
        >
          <FormControl id="name" isInvalid={!!errors.name}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your name asdf"
            />
          </FormControl>

          <FormControl id="email" isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
            />
          </FormControl>

          <FormControl id="phoneNumber" isInvalid={!!errors.email}>
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="number"
              {...register("phoneNumber", {
                required: "Phone Number is required",
              })}
              placeholder="Enter your phone number"
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

          <FormControl
            id="confirmPassword"
            isInvalid={!!errors.confirmPassword}
          >
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
              })}
              placeholder="Enter your password again"
            />
          </FormControl>

          <Button colorScheme="blue" type="submit">
            Register
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
              Already have an account?
            </p>
            <Link to="/login">
              <p style={{ color: "blue" }}>Login</p>
            </Link>
          </div>
        </form>
      </div>
    </Card>
  );
}
