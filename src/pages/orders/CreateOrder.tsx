import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, IconButton, Input, Text } from "@chakra-ui/react";

const CreateOrder = () => {
  return (
    <Box mx={4} my={5} boxShadow="md" px={4} py={3} textAlign="center">
      <Box>
        <Flex w="100%">
          <IconButton
            aria-label="go back"
            icon={<ArrowBackIcon />}
            variant="unstyled"
          />
          <Text>Create New Order</Text>
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

export default CreateOrder;
