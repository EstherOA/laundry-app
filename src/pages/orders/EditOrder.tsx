import { Box, Button, Flex, IconButton, Input, Text } from "@chakra-ui/react";

const EditOrder = () => {
  return (
    <Box mx={4} my={5} boxShadow="md" px={4} py={3}>
      <Box>
        <Flex>
          <IconButton aria-label="go back" />
          <Text>Edit Order #20</Text>
        </Flex>
        <Text>Order Details</Text>
        <Flex gap={4}>
          <Flex flexDir="column">
            <Text>Item</Text>
            <Input />
          </Flex>
          <Flex flexDir="column">
            <Text>Item</Text>
            <Input />
          </Flex>
          <Flex flexDir="column">
            <Text>Item</Text>
            <Input />
          </Flex>
          <Flex flexDir="column">
            <Text>Item</Text>
            <Input />
          </Flex>
        </Flex>
        <Flex justifyContent="flex-end">
          <IconButton aria-label="Add New Item" />
        </Flex>
      </Box>
      <Box>
        <Text>Customer Details</Text>
        <Flex gap={10}>
          <Flex flexDir="column">
            <Text>Item</Text>
            <Input />
          </Flex>
          <Flex flexDir="column">
            <Text>Item</Text>
            <Input />
          </Flex>
          <Flex flexDir="column">
            <Text>Item</Text>
            <Input />
          </Flex>
        </Flex>
        <Flex gap={10}>
          <Flex flexDir="column">
            <Text>Item</Text>
            <Input />
          </Flex>
          <Flex flexDir="column">
            <Text>Item</Text>
            <Input />
          </Flex>
          <Flex flexDir="column">
            <Text>Item</Text>
            <Input />
          </Flex>
        </Flex>
      </Box>
      <Flex justifyContent="flex-end">
        <Button>Submit</Button>
      </Flex>
    </Box>
  );
};

export default EditOrder;
