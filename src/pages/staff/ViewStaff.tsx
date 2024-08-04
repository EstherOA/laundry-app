import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ViewStaff = () => {
  const navigate = useNavigate();

  return (
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
          Customer #20
        </Text>
      </Flex>
      <SimpleGrid columns={4} gap={10}>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="infoTitle">Full Name</Text>
          <Text>John Doe</Text>
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="infoTitle">Phone Number</Text>
          <Text>2 Days</Text>
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Flex>
            <Text textStyle="infoTitle">Initial Password</Text>
            <Icon />
          </Flex>
          <Text>30</Text>
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="infoTitle">Role</Text>
          <Text>Admin</Text>
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="infoTitle">SSNIT</Text>
          <Text>1123</Text>
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="infoTitle">TIN</Text>
          <Text>1123</Text>
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="infoTitle">Date Commenced</Text>
          <Text>13th May, 2024</Text>
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="infoTitle">Salary</Text>
          <Text>1123</Text>
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="infoTitle">Shift</Text>
          <Text>1123</Text>
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="infoTitle">Contract</Text>
          <Flex>
            <Text>kofi_contract.pdf</Text>
            <Icon />
          </Flex>
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="infoTitle">Created At</Text>
          <Text>13th May, 2024</Text>
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="infoTitle">Last Updated</Text>
          <Text>13th May, 2024</Text>
        </Flex>
      </SimpleGrid>
      <Flex justifyContent="flex-end" gap={4} mt="64px">
        <Button
          bgColor="#43BE57"
          _hover={{ bgColor: "#007B23" }}
          color="white"
          onClick={() => navigate("/staff/20/edit")}
        >
          Edit
        </Button>
        <Button bgColor="#FF0000" _hover={{ bgColor: "#8C0000" }} color="white">
          Delete
        </Button>
      </Flex>
    </Box>
  );
};

export default ViewStaff;
