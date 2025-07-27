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
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useDeleteService, useUser } from "../../hooks";

const ViewService = () => {
  const {
    state: { serviceDetails },
  } = useLocation();
  const navigate = useNavigate();
  const user = useUser();
  const isAdmin = user.role === "admin";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const deleteServiceMutation = useDeleteService();

  const handleDelete = async () => {
    try {
      await deleteServiceMutation.mutateAsync(serviceDetails._id);
      toast({
        title: "Service deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/services");
    } catch (error) {
      toast({
        title: "Failed to delete service",
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
              navigate("/services");
            }}
            cursor="pointer"
          />
          <Text fontSize="28px" fontWeight="semibold" mb="32px">
            Service #{serviceDetails.serviceId}
          </Text>
        </Flex>
        <Box>
          <SimpleGrid columns={3} gap={10}>
            <Flex flexDir="column" gap={1}>
              <Text textStyle="infoTitle">Item Name</Text>
              <Text>{serviceDetails.itemName}</Text>
            </Flex>
            <Flex flexDir="column" gap={1}>
              <Text textStyle="infoTitle">Service Type</Text>
              <Text>{serviceDetails.serviceType}</Text>
            </Flex>
            <Flex flexDir="column" gap={1}>
              <Text textStyle="infoTitle">Average Duration</Text>
              <Text>{serviceDetails.duration}</Text>
            </Flex>
          </SimpleGrid>
          <SimpleGrid columns={3} gap={10} mt={10}>
            <Flex flexDir="column" gap={1}>
              <Text textStyle="infoTitle">Price</Text>
              <Text>GHS {serviceDetails.price}</Text>
            </Flex>
            <Flex flexDir="column" gap={1}>
              <Text textStyle="infoTitle">Description</Text>
              <Text>{serviceDetails.description}</Text>
            </Flex>
            <Flex flexDir="column" gap={1}>
              <Text textStyle="infoTitle">Created At</Text>
              <Text>
                {new Date(serviceDetails.createdAt).toLocaleDateString()}
              </Text>
            </Flex>
          </SimpleGrid>
          <SimpleGrid columns={3} gap={10} mt={10}>
            <Flex flexDir="column" gap={1}>
              <Text textStyle="infoTitle">Last Updated</Text>
              <Text>
                {new Date(serviceDetails.updatedAt).toLocaleDateString()}
              </Text>
            </Flex>
          </SimpleGrid>
        </Box>
        {isAdmin && (
          <Flex justifyContent="flex-end" gap={4}>
            <Button
              bgColor="#43BE57"
              _hover={{ bgColor: "#007B23" }}
              color="white"
              onClick={() =>
                navigate(`/services/${serviceDetails._id}/edit`, {
                  state: {
                    serviceDetails,
                  },
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
              isLoading={deleteServiceMutation.isPending}
            >
              Delete
            </Button>
          </Flex>
        )}
      </Box>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Service
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this service? This action cannot
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
                isLoading={deleteServiceMutation.isPending}
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

export default ViewService;
