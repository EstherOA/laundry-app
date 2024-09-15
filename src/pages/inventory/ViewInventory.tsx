import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Flex,
  IconButton,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomBadge } from "../../components";

const ViewInventory = () => {
  const {
    state: { inventoryDetails },
  } = useLocation();
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
            navigate("/inventory");
          }}
          cursor="pointer"
        />
        <Text fontSize="28px" fontWeight="semibold">
          Item #{inventoryDetails._id}
        </Text>
        <CustomBadge
          title={inventoryDetails.status}
          withDot
          badgeStyle={{ marginLeft: 4 }}
        />
      </Flex>
      <SimpleGrid columns={4} gap={10}>
        <Flex flexDir="column">
          <Text textStyle="infoTitle">Item Name</Text>
          <Text>{inventoryDetails.itemName}</Text>
        </Flex>
        <Flex flexDir="column">
          <Text textStyle="infoTitle">Description</Text>
          <Text>{inventoryDetails.description}</Text>
        </Flex>
        <Flex flexDir="column">
          <Text textStyle="infoTitle">Price</Text>
          <Text>{inventoryDetails.price}</Text>
        </Flex>
        <Flex flexDir="column">
          <Text textStyle="infoTitle">Quantity</Text>
          <Text>{inventoryDetails.quantity}</Text>
        </Flex>
        <Flex flexDir="column">
          <Text textStyle="infoTitle">Purchased By</Text>
          <Text>{inventoryDetails.purchasedBy}</Text>
        </Flex>
        <Flex flexDir="column">
          <Text textStyle="infoTitle">Vendor</Text>
          <Text>{inventoryDetails.vendor}</Text>
        </Flex>
        <Flex flexDir="column">
          <Text textStyle="infoTitle">Date Purchased</Text>
          <Text>
            {new Date(inventoryDetails.datePurchased).toLocaleDateString()}
          </Text>
        </Flex>
        <Flex flexDir="column">
          <Text textStyle="infoTitle">Payment Mode</Text>
          <Text>{inventoryDetails.paymentMode}</Text>
        </Flex>
        <Flex flexDir="column">
          <Text textStyle="infoTitle">Payment Receipt</Text>
          <Text>{inventoryDetails.paymentReceipt}</Text>
        </Flex>
        <Flex flexDir="column">
          <Text textStyle="infoTitle">Date Recorded</Text>
          <Text>
            {new Date(inventoryDetails.createdAt).toLocaleDateString()}
          </Text>
        </Flex>
        <Flex flexDir="column">
          <Text textStyle="infoTitle">Last Updated</Text>
          <Text>
            {new Date(inventoryDetails.updatedAt).toLocaleDateString()}
          </Text>
        </Flex>
      </SimpleGrid>
      <Flex justifyContent="flex-end" gap={4}>
        <Button
          bgColor="#43BE57"
          _hover={{ bgColor: "#007B23" }}
          color="white"
          onClick={() =>
            navigate(`/inventory/${inventoryDetails._id}/edit`, {
              state: { inventoryDetails },
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

export default ViewInventory;
