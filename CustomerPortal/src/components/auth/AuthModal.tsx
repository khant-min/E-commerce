import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function AuthModal({ title, isOpen, onClose }: any) {
  const navigate = useNavigate();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={() => navigate("/register")}>
            Register
          </Button>
          <Button onClick={() => navigate("/login")} colorScheme="blue">
            Login
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
