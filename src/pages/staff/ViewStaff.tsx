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

const ViewStaff = () => {
  return (
    <Box mx={4} my={5} boxShadow="md" px={4} py={3} textAlign="center">
      <Flex w="100%">
        <IconButton
          aria-label="go back"
          icon={<ArrowBackIcon />}
          variant="unstyled"
        />
        <Text>Staff #20</Text>
      </Flex>
      <SimpleGrid columns={4}>
        <Flex flexDir="column">
          <Text>First Name</Text>
          <Text>Shirt</Text>
        </Flex>
        <Flex flexDir="column">
          <Text>Last Name</Text>
          <Text>Washing</Text>
        </Flex>
        <Flex flexDir="column">
          <Text>Phone Number</Text>
          <Text>2 Days</Text>
        </Flex>
        <Flex flexDir="column">
          <Flex>
            <Text>Initial Password</Text>
            <Icon />
          </Flex>
          <Text>30</Text>
        </Flex>
        <Flex flexDir="column">
          <Text>Role</Text>
          <Text>Adult shirt male</Text>
        </Flex>
        <Flex flexDir="column">
          <Text>SSNIT</Text>
          <Text>1123</Text>
        </Flex>
        <Flex flexDir="column">
          <Text>TIN</Text>
          <Text>1123</Text>
        </Flex>
        <Flex flexDir="column">
          <Text>Date Commenced</Text>
          <Text>13th May, 2024</Text>
        </Flex>
        <Flex flexDir="column">
          <Text>Salary</Text>
          <Text>1123</Text>
        </Flex>
        <Flex flexDir="column">
          <Text>Shift</Text>
          <Text>1123</Text>
        </Flex>
        <Flex flexDir="column">
          <Text>Contract</Text>
          <Flex>
            <Text>kofi_contract.pdf</Text>
            <Icon />
          </Flex>
        </Flex>
        <Flex flexDir="column">
          <Text>Created At</Text>
          <Text>13th May, 2024</Text>
        </Flex>
        <Flex flexDir="column">
          <Text>Last Updated</Text>
          <Text>13th May, 2024</Text>
        </Flex>
      </SimpleGrid>
      <Flex justifyContent="flex-end">
        <Button>Edit</Button>
        <Button>Delete</Button>
      </Flex>
    </Box>
  );
};

export default ViewStaff;
