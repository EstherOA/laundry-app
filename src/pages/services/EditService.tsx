import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const EditService = () => {
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
            navigate("/services");
          }}
          cursor="pointer"
        />
        <Text textStyle="h1">Edit Service #20</Text>
      </Flex>
      <Box>
        <Flex flexDir="column">
          <Text textStyle="formLabel">Item Name</Text>
          <Input />
        </Flex>
        <Flex flexDir="column" mt={10}>
          <Text textStyle="formLabel">Service Type</Text>
          <Select h="32px" fontSize="14px" placeholder="Select service type">
            <option value="option1">Washing</option>
            <option value="option2">Dry Cleaning</option>
            <option value="option3">Ironing</option>
          </Select>
        </Flex>
        <Flex mt={10} justify="space-between" gap={10}>
          <Flex flexDir="column" w="100%">
            <Text textStyle="formLabel">Average Duration</Text>
            <InputGroup>
              <Input />
              <InputRightElement mr={4}>Days</InputRightElement>
            </InputGroup>
          </Flex>
          <Flex flexDir="column" w="100%">
            <Text textStyle="formLabel">Price</Text>
            <Input type="number" />
          </Flex>
        </Flex>
        <Flex flexDir="column" mt={10}>
          <Text textStyle="formLabel">Description</Text>
          <Textarea />
        </Flex>
      </Box>
      <Flex justifyContent="flex-end" mt={10}>
        <Button bgColor="#43BE57" _hover={{ bgColor: "#007B23" }} color="white">
          Submit
        </Button>
      </Flex>
    </Box>
  );
};

export default EditService;
