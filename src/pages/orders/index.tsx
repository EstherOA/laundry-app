import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import CreateOrder from "./CreateOrder";
import ViewOrder from "./ViewOrder";
import EditOrder from "./EditOrder";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { Link, useNavigate } from "react-router-dom";
import FilterIcon from "../../assets/filter.svg";
import { CustomBadge } from "../../components";
import { Order } from "../../utils/types";
import orders from "../../api/orders";
import { useQuery } from "@tanstack/react-query";
import CustomTable from "../../components/table";

const Orders = () => {
  const columnHelper = createColumnHelper<Order>();
  const navigate = useNavigate();

  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  const [data, setData] = useState<Order[]>([]);

  const getItemString = (data: any) => {
    const itemString = data
      .map((item: any) => `${item.itemName} x ${item.quantity}`)
      .join(", ");
    return itemString;
  };
  const columns = [
    columnHelper.accessor("orderId", {
      id: "id",
      cell: (info) => info.getValue(),
      header: "Order ID",
    }),
    columnHelper.accessor("items", {
      id: "items",
      cell: (info) => getItemString(info.getValue()),
      header: "Items",
    }),
    columnHelper.accessor("totalAmount", {
      id: "total",
      cell: (info) => info.getValue(),
      header: "Total Amount",
    }),
    columnHelper.accessor("orderStatus", {
      id: "orderStatus",
      cell: (info) => (
        <CustomBadge
          title={info.getValue()}
          withDot
          badgeStyle={{ margin: "0 auto" }}
        />
      ),
      header: "Order Status",
    }),
    columnHelper.accessor("customer", {
      id: "customerName",
      cell: (info) =>
        `${info.getValue().firstName} ${info.getValue().lastName}`,
      header: "Customer Name",
    }),
    columnHelper.accessor("processedBy", {
      id: "processedBy",
      cell: (info) => info.getValue().name,
      header: "Processed By",
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      header: "Date Created",
    }),
    columnHelper.accessor("paymentStatus", {
      id: "paymentStatus",
      cell: (info) => (
        <CustomBadge
          title={info.getValue()}
          withDot
          badgeStyle={{ margin: "0 auto" }}
        />
      ),
      header: "Payment Status",
    }),
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        return await orders.getOrders(token!);
      } catch (error) {
        console.error("error fetching orders:", error);
      }
    };
    fetchOrders().then((orders) => {
      if (!Array.isArray(orders)) throw new Error("Invalid order data!");
      setData(orders);
    });
  }, []);

  return (
    <Box mx="32px" mt="48px" boxShadow="md" px={7} pt={5} pb={7}>
      <Flex justifyContent="space-between">
        <Flex justify="center" align="center">
          <Text mr={1}>Filter</Text>
          <Image src={FilterIcon} boxSize="20px" />
        </Flex>
        <InputGroup maxW="240px" h="56px">
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
          <Input placeholder="Search" />
        </InputGroup>
      </Flex>
      <Box mb="70px" mt="48px">
        <CustomTable
          columns={columns}
          initialData={data}
          onRowClick={(row) =>
            navigate(`/orders/${row._id}`, {
              state: {
                orderDetails: row,
              },
            })
          }
        />
      </Box>
      <Flex justify="flex-end">
        <Button bgColor="#43BE57" _hover={{ bgColor: "#007B23" }}>
          <Link to="/orders/new" style={{ color: "white" }}>
            Create New
          </Link>
        </Button>
      </Flex>
    </Box>
  );
};

export default Orders;
export { ViewOrder, CreateOrder, EditOrder };
