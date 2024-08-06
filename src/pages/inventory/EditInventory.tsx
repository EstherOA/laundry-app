import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Select,
  SimpleGrid,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const EditInventory = () => {
  const navigate = useNavigate();

  return (
    <Box mx="32px" mt="48px" boxShadow="md" px={7} pt={5} pb={7}>
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
            navigate("/inventory");
          }}
          cursor="pointer"
        />
        <Text textStyle="h1">Edit Item #20</Text>
      </Flex>
      <SimpleGrid columns={3} gap={10} mt={10}>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="formLabel">Item Name</Text>
          <Input />
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="formLabel">Price</Text>
          <Input type="number" />
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="formLabel">Quantity</Text>
          <Input type="number" />
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="formLabel">Purchased By</Text>
          <Select h="32px" fontSize="14px" placeholder="Select assignee">
            <option value="option1">John Doe</option>
            <option value="option2">Jane Doe</option>
            <option value="option3">Billy Rogan</option>
          </Select>
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="formLabel">Vendor</Text>
          <Input />
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="formLabel">Date Purchased</Text>
          <Input type="date" />
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="formLabel">Payment Mode</Text>
          <Select h="32px" fontSize="14px" placeholder="Select payment mode">
            <option value="option1">Momo</option>
            <option value="option2">Cash</option>
          </Select>
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="formLabel">Description</Text>
          <Textarea />
        </Flex>
        <Flex flexDir="column" gap={1}>
          <Text textStyle="formLabel">Receipt</Text>
          <Input type="file" />
        </Flex>
      </SimpleGrid>
      <Flex justifyContent="flex-end" mt={10}>
        <Button bgColor="#43BE57" _hover={{ bgColor: "#007B23" }} color="white">
          Submit
        </Button>
      </Flex>
    </Box>
  );
};

export default EditInventory;
