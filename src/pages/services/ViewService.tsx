import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

const ViewService = () => {
  const {
    state: { serviceDetails },
  } = useLocation();
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
          Service #{serviceDetails._id}
        </Text>
      </Flex>
      <Box>
        <SimpleGrid columns={3} gap={10}>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Item Name</Text>
            <Text>{serviceDetails.itemName}</Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Service Type</Text>
            <Text>{serviceDetails.serviceType}</Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Average Duration</Text>
            <Text>{serviceDetails.duration}</Text>
          </Flex>
        </SimpleGrid>
        <SimpleGrid columns={3} gap={10} mt={10}>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Price</Text>
            <Text>GHS {serviceDetails.price}</Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Description</Text>
            <Text>{serviceDetails.description}</Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Created At</Text>
            <Text>
              {new Date(serviceDetails.createdAt).toLocaleDateString()}
            </Text>
          </Flex>
        </SimpleGrid>
        <SimpleGrid columns={3} gap={10} mt={10}>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Last Updated</Text>
            <Text>
              {new Date(serviceDetails.updatedAt).toLocaleDateString()}
            </Text>
          </Flex>
        </SimpleGrid>
      </Box>
      <Flex justifyContent="flex-end" gap={4}>
        <Button
          bgColor="#43BE57"
          _hover={{ bgColor: "#007B23" }}
          color="white"
          onClick={() =>
            navigate(`/services/${serviceDetails._id}/edit`, {
              state: {
                serviceDetails,
              },
            })
          }
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

export default ViewService;
