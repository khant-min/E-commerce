import { Avatar, Box, Button, Heading, Text } from "@chakra-ui/react";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";

export default function Profile() {
  return (
    <Box className="min-h-[500px] flex flex-col items-center justify-center gap-10">
      <Box className="flex gap-10">
        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        <Heading>John Doe</Heading>
      </Box>
      <Box className="flex flex-col gap-2">
        <Text className="flex items-center gap-4">
          <MdOutlineEmail /> johndoe20@gmail.com
        </Text>
        <Text className="flex items-center gap-4">
          <MdOutlinePhone /> 09-86879485
        </Text>
      </Box>
      <Box>
        <Button>Change Password</Button>
        <Button>Edit Profile</Button>
      </Box>
    </Box>
  );
}
