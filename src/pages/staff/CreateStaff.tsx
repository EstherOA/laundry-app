import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

const CreateStaff = () => {
  return (
    <Box mx={4} my={5} boxShadow="md" px={4} py={3} textAlign="center">
      <Flex w="100%">
        <IconButton
          aria-label="go back"
          icon={<ArrowBackIcon />}
          variant="unstyled"
        />
        <Text>Add New Employee</Text>
      </Flex>
      <SimpleGrid columns={4}>
        <Flex flexDir="column">
          <Text>First Name</Text>
          <Input />
        </Flex>
        <Flex flexDir="column">
          <Text>Last Name</Text>
          <Input />
        </Flex>
        <Flex flexDir="column">
          <Text>Phone Number</Text>
          <Input />
        </Flex>
        <Flex flexDir="column">
          <Text>Initial Password</Text>
          <Input />
        </Flex>
        <Flex flexDir="column">
          <Text>Role</Text>
          <Input />
        </Flex>
        <Flex flexDir="column">
          <Text>Date Commenced</Text>
          <Input />
        </Flex>
        <Flex flexDir="column">
          <Text>SSNIT</Text>
          <Input />
        </Flex>
        <Flex flexDir="column">
          <Text>TIN</Text>
          <Input />
        </Flex>
        <Flex flexDir="column">
          <Text>Salary</Text>
          <Input />
        </Flex>
        <Flex flexDir="column">
          <Text>Shift Time</Text>
          <Input />
        </Flex>
        <Flex flexDir="column">
          <Text>Contract</Text>
          <Input />
        </Flex>
      </SimpleGrid>
      <Flex justifyContent="flex-end">
        <Button>Submit</Button>
      </Flex>
    </Box>
  );
};

export default CreateStaff;
