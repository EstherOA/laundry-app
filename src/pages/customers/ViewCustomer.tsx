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

const ViewCustomer = () => {
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
            navigate("/services");
          }}
          cursor="pointer"
        />
        <Text fontSize="28px" fontWeight="semibold" mb="32px">
          Customer #20
        </Text>
      </Flex>
      <Box>
        <SimpleGrid columns={3} gap={10}>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Full Name</Text>
            <Text>Shirt</Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Phone Number</Text>
            <Text>Washing</Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Address</Text>
            <Text>2 Days</Text>
          </Flex>
        </SimpleGrid>
        <SimpleGrid columns={3} gap={10} mt={10}>
          <Flex flexDir="column">
            <Text textStyle="infoTitle">Landmark</Text>
            <Text>30</Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Delivery Notes</Text>
            <Text>Adult shirt male</Text>
          </Flex>
        </SimpleGrid>
        <SimpleGrid columns={3} gap={10} mt={10}>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Created At</Text>
            <Text>13th May, 2024</Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Last Updated</Text>
            <Text>13th May, 2024</Text>
          </Flex>
        </SimpleGrid>
      </Box>
      <Flex justifyContent="flex-end" gap={4} mt={10}>
        <Button
          bgColor="#43BE57"
          _hover={{ bgColor: "#007B23" }}
          color="white"
          onClick={() => navigate("/customers/20/edit")}
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

export default ViewCustomer;
