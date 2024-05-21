import {
  Button,
  Card,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "40px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div style={{ width: "50%" }}>
        <img src="/images/bg.jpg" alt="" style={{ height: "100%" }} />
      </div>
      <div style={{ width: "50%", padding: "20px" }}>
        <Heading style={{ textAlign: "start" }}>Create an Account</Heading>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            width: "80%",
          }}
        >
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input type="text" placeholder="Enter your name" />
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Enter your email" />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="email" placeholder="Enter your password" />
          </FormControl>

          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input type="email" placeholder="Enter your password again" />
          </FormControl>

          <Button colorScheme="blue">Register</Button>

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
