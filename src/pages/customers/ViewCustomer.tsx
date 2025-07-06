import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  SimpleGrid,
  Text,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRef } from "react";
import { useDeleteCustomer } from "../../hooks";

const ViewCustomer = () => {
  const {
    state: { customerDetails },
  } = useLocation();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const deleteCustomerMutation = useDeleteCustomer();

  const handleDelete = async () => {
    try {
      await deleteCustomerMutation.mutateAsync(customerDetails._id);
      toast({
        title: "Customer deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/customers");
    } catch (error) {
      toast({
        title: "Failed to delete customer",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    onClose();
  };

  return (
    <>
      <Box mx="32px" mt="48px" boxShadow="md" px={7} pt={5} pb={7}>
        <Flex
          w="100%"
          justify="center"
          alignItems="center"
          mb="20px"
          position="relative"
        >
          <IconButton
            aria-label="go back"
            as={ArrowBackIcon}
            w="36px"
            position="absolute"
            h="28px"
            left="150px"
            variant="ghost"
            onClick={() => {
              navigate("/customers");
            }}
            cursor="pointer"
          />
          <Text fontSize="28px" fontWeight="semibold" mb="32px">
            Customer #{customerDetails.customerId}
          </Text>
        </Flex>
        <Box>
          <SimpleGrid columns={3} gap={10}>
            <Flex flexDir="column" gap={1}>
              <Text textStyle="infoTitle">Full Name</Text>
              <Text>{customerDetails.name}</Text>
            </Flex>
            <Flex flexDir="column" gap={1}>
              <Text textStyle="infoTitle">Phone Number</Text>
              <Text>{customerDetails.phoneNumber}</Text>
            </Flex>
            <Flex flexDir="column" gap={1}>
              <Text textStyle="infoTitle">Address</Text>
              <Text>{customerDetails.address}</Text>
            </Flex>
          </SimpleGrid>
          <SimpleGrid columns={3} gap={10} mt={10}>
            <Flex flexDir="column">
              <Text textStyle="infoTitle">Landmark</Text>
              <Text>{customerDetails.landmark}</Text>
            </Flex>
            <Flex flexDir="column" gap={1}>
              <Text textStyle="infoTitle">Delivery Notes</Text>
              <Text>{customerDetails.deliveryNotes}</Text>
            </Flex>
          </SimpleGrid>
          <SimpleGrid columns={3} gap={10} mt={10}>
            <Flex flexDir="column" gap={1}>
              <Text textStyle="infoTitle">Created At</Text>
              <Text>
                {new Date(customerDetails.createdAt).toLocaleDateString()}
              </Text>
            </Flex>
            <Flex flexDir="column" gap={1}>
              <Text textStyle="infoTitle">Last Updated</Text>
              <Text>
                {new Date(customerDetails.updatedAt).toLocaleDateString()}
              </Text>
            </Flex>
          </SimpleGrid>
        </Box>
        <Flex justifyContent="flex-end" gap={4} mt={10}>
          <Button
            bgColor="#43BE57"
            _hover={{ bgColor: "#007B23" }}
            color="white"
            onClick={() =>
              navigate(`/customers/${customerDetails._id}/edit`, {
                state: { customerDetails },
              })
            }
          >
            Edit
          </Button>
          <Button
            bgColor="#FF0000"
            _hover={{ bgColor: "#8C0000" }}
            color="white"
            onClick={onOpen}
            isLoading={deleteCustomerMutation.isPending}
          >
            Delete
          </Button>
        </Flex>
      </Box>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this customer? This action cannot
              be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDelete}
                ml={3}
                isLoading={deleteCustomerMutation.isPending}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ViewCustomer;
