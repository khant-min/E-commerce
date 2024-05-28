import {
  Button,
  Card,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Login() {
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
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            // width: "80%",
          }}
        >
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Enter your email" />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="email" placeholder="Enter your password" />
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

          <Button colorScheme="blue">Login</Button>

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
