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
import { CustomBadge } from "../../components";
import CustomTable from "../../components/table";
import { Payment } from "../../utils/types";
import { createColumnHelper } from "@tanstack/react-table";

const ViewOrder = () => {
  const {
    state: { orderDetails },
  } = useLocation();
  const navigate = useNavigate();
  const columnHelper = createColumnHelper<Payment>();

  const paymentColumns = [
    columnHelper.accessor("paymentId", {
      id: "id",
      cell: (info) => info.getValue(),
      header: "Payment ID",
    }),
    columnHelper.accessor("mode", {
      id: "mode",
      cell: (info) => info.getValue(),
      header: "Mode",
    }),
    columnHelper.accessor("amount", {
      id: "amount",
      cell: (info) => info.getValue(),
      header: "Amount",
    }),
    columnHelper.accessor("sender", {
      id: "sender",
      cell: (info) => info.getValue(),
      header: "Sender",
    }),
    columnHelper.accessor("processedBy", {
      id: "processedBy",
      cell: (info) => info.getValue().name,
      header: "Processed By",
    }),
    columnHelper.accessor("receipt", {
      id: "receiptf",
      cell: (info) => info.getValue(),
      header: "Receipt",
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      header: "Date Created",
    }),
  ];

  const handleViewInvoice = () => {
    navigate(`invoice/${orderDetails.invoiceId}`, {
      state: { orderDetails },
    });
  };

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
            Order #{orderDetails._id}
          </Text>
          <CustomBadge title="pending" withDot badgeStyle={{ ml: 4 }} />
        </Flex>
        <Text
          textAlign="center"
          fontSize="20px"
          fontWeight="semibold"
          mb="32px"
        >
          Order Details
        </Text>
        {orderDetails.items.map((item: any) => (
          <SimpleGrid columns={4} gap={10} key={item._id} mb={4}>
            <Flex flexDir="column" gap={1}>
              <Text textStyle="infoTitle">Item Name</Text>
              <Text>{item.itemName}</Text>
            </Flex>
            <Flex flexDir="column" gap={1}>
              <Text textStyle="infoTitle">Service</Text>
              <Text>{item.serviceType}</Text>
            </Flex>
            <Flex flexDir="column" gap={1}>
              <Text textStyle="infoTitle">Quantity</Text>
              <Text>{item.quantity}</Text>
            </Flex>
            <Flex flexDir="column" gap={1}>
              <Text textStyle="infoTitle">Price</Text>
              <Text>{item.price}</Text>
            </Flex>
          </SimpleGrid>
        ))}
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
            <Text>{orderDetails.customer.customerId}</Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Full Name</Text>
            <Text>{`${orderDetails.customer.firstName} ${orderDetails.customer.lastName}`}</Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Phone Number</Text>
            <Text>{orderDetails.customer.phoneNumber}</Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Address</Text>
            <Text>{orderDetails.customer.address}</Text>
          </Flex>
        </SimpleGrid>
        <SimpleGrid columns={4} gap={10} mt={10}>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Landmark</Text>
            <Text>{orderDetails.customer.landmark}</Text>
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text textStyle="infoTitle">Delivery notes</Text>
            <Text>{orderDetails.customer.deliveryNotes}</Text>
          </Flex>
        </SimpleGrid>
      </Box>
      <Box mt={5}>
        <Text textAlign="center" textStyle="h2" mt="56px" mb="32px">
          Payment History
        </Text>
        <CustomTable
          columns={paymentColumns}
          initialData={orderDetails.payments}
          onRowClick={() => {}}
        />
      </Box>
      <Flex mt={10} justifyContent="flex-end" gap={4} position="relative">
        <Button
          bgColor="#43BE57"
          _hover={{ bgColor: "#007B23" }}
          color="white"
          onClick={() =>
            navigate(`/orders/${orderDetails._id}/edit`, {
              state: { orderDetails },
            })
          }
        >
          Edit
        </Button>
        <Button bgColor="#FF0000" _hover={{ bgColor: "#8C0000" }} color="white">
          Delete
        </Button>
        <Button
          bgColor="#43BE57"
          _hover={{ bgColor: "#007B23" }}
          color="white"
          onClick={handleViewInvoice}
        >
          View Invoice
        </Button>
      </Flex>
    </Box>
  );
};

export default ViewOrder;
