import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";

const ViewService = () => {
  return (
    <Box mx={4} my={5} boxShadow="md" px={4} py={3} textAlign="center">
      <Flex w="100%">
        <IconButton
          aria-label="go back"
          icon={<ArrowBackIcon />}
          variant="unstyled"
        />
        <Text>Service #20</Text>
      </Flex>
      <Box>
        <Flex>
          <Flex flexDir="column">
            <Text>Item</Text>
            <Text>Shirt</Text>
          </Flex>
          <Flex flexDir="column">
            <Text>Service Type</Text>
            <Text>Washing</Text>
          </Flex>
          <Flex flexDir="column">
            <Text>Average Duration</Text>
            <Text>2 Days</Text>
          </Flex>
        </Flex>
        <Flex>
          <Flex flexDir="column">
            <Text>Price</Text>
            <Text>30</Text>
          </Flex>
          <Flex flexDir="column">
            <Text>Description</Text>
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

export default ViewService;
