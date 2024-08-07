import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ViewOrder = () => {
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
          <Text fontSize="28px" fontWeight="semibold">
            Order #20
          </Text>
        </Flex>
        <Text
          textAlign="center"
          fontSize="20px"
          fontWeight="semibold"
          mb="32px"
        >
          Order Details
        </Text>
        <SimpleGrid columns={4} gap={10}>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Item Name</Text>
            <Text>Shirt</Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Service</Text>
            <Text>Washing</Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Quantity</Text>
            <Text>2</Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Price</Text>
            <Text>20.00</Text>
          </Flex>
        </SimpleGrid>
      </Box>
      <Box>
        <Text
          textAlign="center"
          fontSize="20px"
          fontWeight="semibold"
          mt="56px"
          mb="32px"
        >
          Customer Details
        </Text>
        <SimpleGrid columns={4} gap={10}>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Customer ID</Text>
            <Text>000123</Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Full Name</Text>
            <Text>Jane Doe</Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Phone Number</Text>
            <Text>0552342348</Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Address</Text>
            <Text>Kejetia</Text>
          </Flex>
        </SimpleGrid>
        <SimpleGrid columns={4} gap={10} mt={10}>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Landmark</Text>
            <Text>Old Presbyterian Church</Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Delivery notes</Text>
            <Text>The blue house beside the momo vendor</Text>
          </Flex>
        </SimpleGrid>
      </Box>
      <Box mt={5}>
        <Text textAlign="center" textStyle="h2" mt="56px" mb="32px">
          Payment History
        </Text>
        {/*TODO: add table for payment history */}
      </Box>
      <Flex mt={10} justifyContent="flex-end" gap={4}>
        <Button
          bgColor="#43BE57"
          _hover={{ bgColor: "#007B23" }}
          color="white"
          onClick={() => navigate("/orders/20/edit")}
        >
          Edit
        </Button>
        <Button bgColor="#FF0000" _hover={{ bgColor: "#8C0000" }} color="white">
          Delete
        </Button>
        <Button bgColor="#43BE57" _hover={{ bgColor: "#007B23" }} color="white">
          View Invoice
        </Button>
      </Flex>
    </Box>
  );
};

export default ViewOrder;
