import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";

const ViewOrder = () => {
  return (
    <Box mx={4} my={5} boxShadow="md" px={4} py={3}>
      <Box>
        <Flex>
          <IconButton aria-label="go back" />
          <Text>Order #20</Text>
        </Flex>
        <Text>Order Details</Text>
        <Flex gap={4}>
          <Flex flexDir="column">
            <Text>Item</Text>
            <Text>Item</Text>
          </Flex>
          <Flex flexDir="column">
            <Text>Item</Text>
            <Text>Item</Text>
          </Flex>
          <Flex flexDir="column">
            <Text>Item</Text>
            <Text>Item</Text>
          </Flex>
          <Flex flexDir="column">
            <Text>Item</Text>
            <Text>Item</Text>
          </Flex>
        </Flex>
      </Box>
      <Box>
        <Text>Customer Details</Text>
        <Flex gap={10}>
          <Flex flexDir="column">
            <Text>Item</Text>
            <Text>Item</Text>
          </Flex>
          <Flex flexDir="column">
            <Text>Item</Text>
            <Text>Item</Text>
          </Flex>
          <Flex flexDir="column">
            <Text>Item</Text>
            <Text>Item</Text>
          </Flex>
        </Flex>
        <Flex gap={10}>
          <Flex flexDir="column">
            <Text>Item</Text>
            <Text>Item</Text>
          </Flex>
          <Flex flexDir="column">
            <Text>Item</Text>
            <Text>Item</Text>
          </Flex>
          <Flex flexDir="column">
            <Text>Item</Text>
            <Text>Item</Text>
          </Flex>
        </Flex>
      </Box>
      <Flex justifyContent="flex-end">
        <Button>Edit</Button>
        <Button>Delete</Button>
        <Button>View Invoice</Button>
      </Flex>
    </Box>
  );
};

export default ViewOrder;
