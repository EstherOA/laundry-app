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
import { useNavigate } from "react-router-dom";

const CreateCustomer = () => {
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
        <Text textStyle="h1">Add New Customer</Text>
      </Flex>
      <SimpleGrid columns={2} gap={10} mt={10}>
        <Flex flexDir="column">
          <Text textStyle="formLabel">First Name</Text>
          <Input />
        </Flex>
        <Flex flexDir="column">
          <Text textStyle="formLabel">Last Name</Text>
          <Input />
        </Flex>
        <Flex flexDir="column">
          <Text textStyle="formLabel">Phone Number</Text>
          <Input />
        </Flex>
        <Flex flexDir="column" justify="space-between">
          <Text textStyle="formLabel">Address</Text>
          <Input />
        </Flex>
        <Flex flexDir="column">
          <Text textStyle="formLabel">Landmark</Text>
          <Textarea />
        </Flex>
        <Flex flexDir="column">
          <Text textStyle="formLabel">Delivery Notes</Text>
          <Textarea />
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

export default CreateCustomer;
