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

const CreateInventory = () => {
  return (
    <Box mx={4} my={5} boxShadow="md" px={4} py={3} textAlign="center">
      <Flex w="100%">
        <IconButton
          aria-label="go back"
          icon={<ArrowBackIcon />}
          variant="unstyled"
        />
        <Text>Add New Item</Text>
      </Flex>
      <SimpleGrid columns={3}>
        <Flex flexDir="column">
          <Text>Item Name</Text>
          <Input />
        </Flex>
        <Flex flexDir="column">
          <Text>Price</Text>
          <Input />
        </Flex>
        <Flex flexDir="column">
          <Text>Quantity</Text>
          <Input />
        </Flex>
        <Flex flexDir="column">
          <Text>Purchased By</Text>
          <Input />
        </Flex>
        <Flex flexDir="column">
          <Text>Vendor</Text>
          <Input />
        </Flex>
        <Flex flexDir="column">
          <Text>Date Purchased</Text>
          <Input />
        </Flex>
        <Flex flexDir="column">
          <Text>Payment Mode</Text>
          <Input />
        </Flex>
        <Flex flexDir="column">
          <Text>Description</Text>
          <Textarea />
        </Flex>
        <Flex flexDir="column">
          <Text>Receipt</Text>
          <Input />
        </Flex>
      </SimpleGrid>
      <Flex justifyContent="flex-end">
        <Button>Submit</Button>
      </Flex>
    </Box>
  );
};

export default CreateInventory;
