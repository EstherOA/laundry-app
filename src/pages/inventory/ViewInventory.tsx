import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ViewInventory = () => {
  const navigate = useNavigate();

  return (
    <Box mx="32px" mt="48px" boxShadow="md" px={7} pt={5} pb={7}>
      <Flex
        w="100%"
        justify="center"
        alignItems="center"
        mb="52px"
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
            navigate("/services");
          }}
          cursor="pointer"
        />
        <Text fontSize="28px" fontWeight="semibold">
          Item #20
        </Text>
        <Badge ml={4}>Out of Stock</Badge>
      </Flex>
      <SimpleGrid columns={4} gap={10}>
        <Flex flexDir="column">
          <Text textStyle="infoTitle">Item Name</Text>
          <Text>Shirt</Text>
        </Flex>
        <Flex flexDir="column">
          <Text textStyle="infoTitle">Description</Text>
          <Text>Shirt</Text>
        </Flex>
        <Flex flexDir="column">
          <Text textStyle="infoTitle">Price</Text>
          <Text>Shirt</Text>
        </Flex>
        <Flex flexDir="column">
          <Text textStyle="infoTitle">Quantity</Text>
          <Text>Shirt</Text>
        </Flex>
        <Flex flexDir="column">
          <Text textStyle="infoTitle">Purchased By</Text>
          <Text>Shirt</Text>
        </Flex>
        <Flex flexDir="column">
          <Text textStyle="infoTitle">Vendor</Text>
          <Text>Shirt</Text>
        </Flex>
        <Flex flexDir="column">
          <Text textStyle="infoTitle">Date Purchased</Text>
          <Text>13th May, 2024</Text>
        </Flex>
        <Flex flexDir="column">
          <Text textStyle="infoTitle">Payment Mode</Text>
          <Text>Momo</Text>
        </Flex>
        <Flex flexDir="column">
          <Text textStyle="infoTitle">Payment Receipt</Text>
          <Text>Shirt</Text>
        </Flex>
        <Flex flexDir="column">
          <Text textStyle="infoTitle">Date Recorded</Text>
          <Text>13th May, 2024</Text>
        </Flex>
        <Flex flexDir="column">
          <Text textStyle="infoTitle">Last Updated</Text>
          <Text>13th May, 2024</Text>
        </Flex>
      </SimpleGrid>
      <Flex justifyContent="flex-end" gap={4}>
        <Button
          bgColor="#43BE57"
          _hover={{ bgColor: "#007B23" }}
          color="white"
          onClick={() => navigate("/inventory/20/edit")}
        >
          Edit
        </Button>
        <Button bgColor="#FF0000" _hover={{ bgColor: "#8C0000" }} color="white">
          Delete
        </Button>
      </Flex>
    </Box>
  );
};

export default ViewInventory;
