import { ArrowBackIcon, SmallAddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CreateOrder = () => {
  const navigate = useNavigate();

  return (
    <Box mx="32px" mt="48px" boxShadow="md" px={7} pt={5} pb={7}>
      <Box>
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
              navigate("/orders");
            }}
            cursor="pointer"
          />
          <Text textStyle="h1">Create New Order</Text>
        </Flex>
        <Text textAlign="center" textStyle="h2" mb="32px">
          Order Details
        </Text>
        <SimpleGrid columns={4} gap={10}>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="formLabel">Item Name</Text>
            <Select h="32px" fontSize="14px" placeholder="Select item">
              <option value="option1">Shirt</option>
              <option value="option2">Blouse</option>
              <option value="option3">Bedsheet</option>
            </Select>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="formLabel">Service Type</Text>
            <Select h="32px" fontSize="14px" placeholder="Select service type">
              <option value="option1">Washing</option>
              <option value="option2">Dry Cleaning</option>
              <option value="option3">Ironing</option>
            </Select>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="formLabel">Quantity</Text>
            <Input h="32px" type="number" />
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="formLabel">Price</Text>
            <Input h="32px" type="number" />
          </Flex>
        </SimpleGrid>
        <Flex justifyContent="flex-end" mt={4} mb="48px">
          <IconButton
            aria-label="Add New Item"
            boxSize="24px"
            px={0}
            minW="unset"
            borderRadius="4px"
            _hover={{ backgroundColor: "#2A3C9B" }}
            as={SmallAddIcon}
            color="white"
            backgroundColor="#1A7DDB"
          />
        </Flex>
        <SimpleGrid columns={4} gap={10}>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="formLabel">Total Price</Text>
            <Input h="32px" type="number" />
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="formLabel">Assigned To</Text>
            <Select h="32px" fontSize="14px" placeholder="Select assignee">
              <option value="option1">John Doe</option>
              <option value="option2">Jane Doe</option>
              <option value="option3">Billy Rogan</option>
            </Select>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="formLabel">Due Date</Text>
            <Input type="date" h="32px" />
          </Flex>
        </SimpleGrid>
      </Box>
      <Box>
        <Text textAlign="center" textStyle="h2" mt="56px" mb="32px">
          Customer Details
        </Text>
        <SimpleGrid columns={3} gap={10}>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="formLabel">First Name</Text>
            <Input />
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="formLabel">Last Name</Text>
            <Input />
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="formLabel">Phone Number</Text>
            <Input />
          </Flex>
        </SimpleGrid>
        <SimpleGrid columns={3} gap={10} mt={10}>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="formLabel">Area</Text>
            <Input />
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="formLabel">Landmark</Text>
            <Input />
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="formLabel">Delivery Notes</Text>
            <Input />
          </Flex>
        </SimpleGrid>
      </Box>
      <Flex justifyContent="flex-end" mt={10}>
        <Button bgColor="#43BE57" _hover={{ bgColor: "#007B23" }} color="white">
          Submit
        </Button>
      </Flex>
    </Box>
  );
};

export default CreateOrder;
