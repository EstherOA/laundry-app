import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const EditStaff = () => {
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
            navigate("/customers");
          }}
          cursor="pointer"
        />
        <Text textStyle="h1">Edit Employee #20</Text>
      </Flex>
      <SimpleGrid columns={4} gap={10} mt={10}>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="formLabel">First Name</Text>
          <Input />
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="formLabel">Last Name</Text>
          <Input />
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="formLabel">Phone Number</Text>
          <Input />
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="formLabel">Initial Password</Text>
          <Input />
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="formLabel">Role</Text>
          <Select h="32px" fontSize="14px" placeholder="Select role">
            <option value="option1">Admin</option>
            <option value="option2">Employee</option>
          </Select>
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="formLabel">Date Commenced</Text>
          <Input />
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="formLabel">SSNIT</Text>
          <Input />
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="formLabel">TIN</Text>
          <Input />
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="formLabel">Salary</Text>
          <Input type="number" />
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="formLabel">Shift Time</Text>
          <Select h="32px" fontSize="14px" placeholder="Select payment mode">
            <option value="option1">Even Days</option>
            <option value="option2">Odd Days</option>
          </Select>
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="formLabel">Contract</Text>
          <Input />
        </Flex>
      </SimpleGrid>
      <Flex justifyContent="flex-end" mt={10}>
        <Button bgColor="#43BE57" _hover={{ bgColor: "#007B23" }} color="white">
          Submit
        </Button>
      </Flex>
    </Box>
  );
};

export default EditStaff;
