import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

export default function ModalForm({
  title,
  body,
  isOpen,
  onClose,
  onSubmit,
}: {
  title: string;
  body: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button onClick={onSubmit} variant="ghost">
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
