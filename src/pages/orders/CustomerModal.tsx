import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Flex,
  Text,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { useCustomers } from "../../hooks/useCustomers";

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (customer: any) => void;
}

const CustomerModal: React.FC<CustomerModalProps> = ({
  isOpen,
  onClose,
  onImport,
}) => {
  const { data, isLoading } = useCustomers();
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select a Customer</ModalHeader>
        <ModalBody>
          {isLoading ? (
            <Flex justify="center" align="center" minH="150px">
              <Spinner />
            </Flex>
          ) : (
            <Flex direction="column" gap={3}>
              {data?.map((customer: any) => (
                <Box
                  key={customer._id}
                  borderWidth={2}
                  borderColor={
                    selectedCustomer === customer._id ? "#1A7DDB" : "gray.200"
                  }
                  borderRadius="md"
                  p={4}
                  cursor="pointer"
                  bg={selectedCustomer === customer._id ? "blue.50" : "white"}
                  onClick={() => setSelectedCustomer(customer._id)}
                  transition="all 0.2s"
                >
                  <Text fontWeight="bold" fontSize="lg">
                    {customer.firstName} {customer.lastName}
                  </Text>
                  <Text color="gray.600">{customer.phoneNumber}</Text>
                  <Text color="gray.500" fontSize="sm">
                    {customer.address}
                  </Text>
                </Box>
              ))}
              {data?.length === 0 && <Text>No customers found.</Text>}
            </Flex>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              const customer = data?.find(
                (c: any) => c._id === selectedCustomer
              );
              if (customer) onImport(customer);
            }}
            isDisabled={!selectedCustomer}
          >
            Import
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomerModal;
