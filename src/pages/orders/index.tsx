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
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link, useNavigate } from "react-router-dom";
import FilterIcon from "../../assets/filter.svg";
import { CustomBadge } from "../../components";
import { Order } from "../../utils/types";
import orders from "../../api/orders";
import { useQuery } from "@tanstack/react-query";

const Orders = () => {
  const columnHelper = createColumnHelper<Order>();
  const navigate = useNavigate();

  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  const [data, setData] = useState<Order[]>([]);

  const columns = [
    columnHelper.accessor("orderId", {
      id: "id",
      cell: (info) => info.getValue(),
      header: "Order ID",
    }),
    columnHelper.accessor("items", {
      id: "items",
      cell: (info) => info.getValue(),
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
    columnHelper.accessor("customerName", {
      id: "customerName",
      cell: (info) => info.getValue(),
      header: "Customer Name",
    }),
    columnHelper.accessor("createdBy", {
      id: "createdBy",
      cell: (info) => info.getValue(),
      header: "Created By",
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      cell: (info) => info.getValue(),
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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const allOrders = await orders.getOrders(token!);

        setData(allOrders);
      } catch (error) {
        console.error("error fetching orders:", error);
      }
    };
    fetchOrders();
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
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} onClick={() => navigate(`/orders/${row.id}`)}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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
