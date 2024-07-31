import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  SimpleGrid,
  Text,
  Textarea,
} from "@chakra-ui/react";

const CreateCustomer = () => {
  return (
    <Box mx={4} my={5} boxShadow="md" px={4} py={3} textAlign="center">
      <Flex w="100%">
        <IconButton
          aria-label="go back"
          icon={<ArrowBackIcon />}
          variant="unstyled"
        />
        <Text>Add New Customer</Text>
      </Flex>
      <SimpleGrid columns={2}>
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
        <Flex flexDir="column" justify="space-between">
          <Text>Address</Text>
          <Input />
        </Flex>
        <Flex flexDir="column">
          <Text>Landmark</Text>
          <Textarea />
        </Flex>
        <Flex flexDir="column">
          <Text>Delivery Notes</Text>
          <Textarea />
        </Flex>
      </SimpleGrid>
      <Flex justifyContent="flex-end">
        <Button>Submit</Button>
      </Flex>
    </Box>
  );
};

export default CreateCustomer;
