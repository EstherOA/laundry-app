import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";

const ViewCustomer = () => {
  return (
    <Box mx={4} my={5} boxShadow="md" px={4} py={3} textAlign="center">
      <Flex w="100%">
        <IconButton
          aria-label="go back"
          icon={<ArrowBackIcon />}
          variant="unstyled"
        />
        <Text>Customer #20</Text>
      </Flex>
      <Box>
        <Flex>
          <Flex flexDir="column">
            <Text>Name</Text>
            <Text>Shirt</Text>
          </Flex>
          <Flex flexDir="column">
            <Text>Phone Number</Text>
            <Text>Washing</Text>
          </Flex>
          <Flex flexDir="column">
            <Text>Address</Text>
            <Text>2 Days</Text>
          </Flex>
        </Flex>
        <Flex>
          <Flex flexDir="column">
            <Text>Landmark</Text>
            <Text>30</Text>
          </Flex>
          <Flex flexDir="column">
            <Text>Delivery Notes</Text>
            <Text>Adult shirt male</Text>
          </Flex>
        </Flex>
        <Flex>
          <Flex flexDir="column">
            <Text>Created At</Text>
            <Text>13th May, 2024</Text>
          </Flex>
          <Flex flexDir="column">
            <Text>Last Updated</Text>
            <Text>13th May, 2024</Text>
          </Flex>
        </Flex>
      </Box>
      <Flex justifyContent="flex-end">
        <Button>Edit</Button>
        <Button>Delete</Button>
      </Flex>
    </Box>
  );
};

export default ViewCustomer;
