import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";

const CreateService = () => {
  return (
    <Box mx={4} my={5} boxShadow="md" px={4} py={3} textAlign="center">
      <Flex w="100%">
        <IconButton
          aria-label="go back"
          icon={<ArrowBackIcon />}
          variant="unstyled"
        />
        <Text>Add New Service</Text>
      </Flex>
      <Box>
        <Flex flexDir="column">
          <Text>Item</Text>
          <Input />
        </Flex>
        <Flex flexDir="column">
          <Text>Service Type</Text>
          <Input />
        </Flex>
        <Flex>
          <Flex flexDir="column" justify="space-between">
            <Text>Average Duration</Text>
            <Input />
          </Flex>
          <Flex flexDir="column">
            <Text>Price</Text>
            <Input />
          </Flex>
        </Flex>
        <Flex flexDir="column">
          <Text>Description</Text>
          <Textarea />
        </Flex>
      </Box>
      <Flex justifyContent="flex-end">
        <Button>Submit</Button>
      </Flex>
    </Box>
  );
};

export default CreateService;
