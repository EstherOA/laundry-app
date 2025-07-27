import { ArrowBackIcon, RepeatIcon, DownloadIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Icon,
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
import { useDeleteStaff } from "../../hooks";
import { format } from "date-fns";

const ViewStaff = () => {
  const {
    state: { staffDetails },
  } = useLocation();

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const deleteStaffMutation = useDeleteStaff();

  const handleDelete = async () => {
    try {
      await deleteStaffMutation.mutateAsync(staffDetails._id);
      toast({
        title: "Staff member deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/staff");
    } catch (error) {
      toast({
        title: "Failed to delete staff member",
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
              navigate("/staff");
            }}
            cursor="pointer"
          />
          <Text fontSize="28px" fontWeight="semibold" mb="32px">
            Employee #{staffDetails.staffId}
          </Text>
        </Flex>
        <SimpleGrid columns={4} gap={10}>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Full Name</Text>
            <Text>{staffDetails.name}</Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Phone Number</Text>
            <Text>{staffDetails.phoneNumber}</Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Flex alignItems="center">
              <Text textStyle="infoTitle" mr={1}>
                Initial Password
              </Text>
            </Flex>
            <Text>
              {staffDetails.hasDefaultPassword ? staffDetails.password : "N/A"}
            </Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Address</Text>
            <Text>{staffDetails.address}</Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">ID Number</Text>
            <Text>{staffDetails.idNumber}</Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Role</Text>
            <Text>{staffDetails.role}</Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">SSNIT</Text>
            <Text>{staffDetails.ssnit}</Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">TIN</Text>
            <Text>{staffDetails.tin}</Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Date Commenced</Text>
            <Text>
              {format(new Date(staffDetails.dateCommenced), "dd MMM yyyy")}
            </Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Salary</Text>
            <Text>{staffDetails.salary}</Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Shift</Text>
            <Text>{staffDetails.shift}</Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Contract</Text>
            <Flex alignItems="center" gap={1}>
              <Text>kofi_contract.pdf</Text>
              <Icon as={DownloadIcon} />
            </Flex>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Created At</Text>
            <Text>
              {format(new Date(staffDetails.createdAt), "dd MMM yyyy")}
            </Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Last Updated</Text>
            <Text>
              {format(new Date(staffDetails.updatedAt), "dd MMM yyyy")}
            </Text>
          </Flex>
        </SimpleGrid>
        <Flex justifyContent="flex-end" gap={4} mt="64px">
          <Button
            bgColor="#43BE57"
            _hover={{ bgColor: "#007B23" }}
            color="white"
            onClick={() =>
              navigate(`/staff/${staffDetails._id}/edit`, {
                state: { staffDetails },
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
            isLoading={deleteStaffMutation.isPending}
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
              Delete Staff Member
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this staff member? This action
              cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDelete}
                ml={3}
                isLoading={deleteStaffMutation.isPending}
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

export default ViewStaff;
