import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

const ViewInventory = () => {
  return (
    <Box mx={4} my={5} boxShadow="md" px={4} py={3} textAlign="center">
      <Flex w="100%">
        <IconButton
          aria-label="go back"
          icon={<ArrowBackIcon />}
          variant="unstyled"
        />
        <Text>Inventory #20</Text>
      </Flex>
      <SimpleGrid columns={4}>
        <Flex flexDir="column">
          <Text>Item Name</Text>
          <Text>Shirt</Text>
        </Flex>
        <Flex flexDir="column">
          <Text>Description</Text>
          <Text>Shirt</Text>
        </Flex>
        <Flex flexDir="column">
          <Text>Price</Text>
          <Text>Shirt</Text>
        </Flex>
        <Flex flexDir="column">
          <Text>Quantity</Text>
          <Text>Shirt</Text>
        </Flex>
        <Flex flexDir="column">
          <Text>Purchased By</Text>
          <Text>Shirt</Text>
        </Flex>
        <Flex flexDir="column">
          <Text>Vendor</Text>
          <Text>Shirt</Text>
        </Flex>
        <Flex flexDir="column">
          <Text>Date Purchased</Text>
          <Text>Shirt</Text>
        </Flex>
        <Flex flexDir="column">
          <Text>Payment Mode</Text>
          <Text>Shirt</Text>
        </Flex>
        <Flex flexDir="column">
          <Text>Payment Receipt</Text>
          <Text>Shirt</Text>
        </Flex>
        <Flex flexDir="column">
          <Text>Date Recorded</Text>
          <Text>Shirt</Text>
        </Flex>
        <Flex flexDir="column">
          <Text>Last Updated</Text>
          <Text>Shirt</Text>
        </Flex>
      </SimpleGrid>
      <Flex justifyContent="flex-end">
        <Button>Edit</Button>
        <Button>Delete</Button>
      </Flex>
    </Box>
  );
};

export default ViewInventory;
