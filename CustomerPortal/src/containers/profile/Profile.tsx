import React from "react";
import {
  Box,
  Avatar,
  Text,
  Stack,
  Button,
  Badge,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";

const MotionAvatar = motion(Avatar);

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user")!);

  return (
    <Box className="my-20">
      <Stack align="center" spacing={4}>
        <MotionAvatar
          size="2xl"
          src={user.profile}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 1 }}
        />
        <Text color="blue.600" fontSize="2xl" fontWeight="bold">
          {user.name}
        </Text>

        <Box className="flex flex-col gap-2">
          <Text className="flex items-center gap-4" fontSize="md" mt={2}>
            <MdOutlineEmail fontSize={20} />
            <p>{user.email}</p>
          </Text>
          <Text className="flex items-center gap-4" fontSize="md" mt={2}>
            <MdOutlinePhone fontSize={20} />
            <p>{user.phone}</p>
          </Text>
        </Box>

        <HStack>
          <Button
            className="hover:scale-105"
            colorScheme="blue"
            variant="outline"
          >
            Change Password
          </Button>
          <Button
            className="hover:scale-105"
            colorScheme="blue"
            variant="solid"
          >
            Edit Profile
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
}
