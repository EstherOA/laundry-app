import { SearchIcon } from "@chakra-ui/icons";
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
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreateInventory from "./CreateInventory";
import ViewInventory from "./ViewInventory";
import EditInventory from "./EditInventory";
import FilterIcon from "../../assets/filter.svg";
import { CustomBadge } from "../../components";

type PaymentMode = "momo" | "cash";
type ItemStatus = "in-stock" | "low-stock" | "out-of-stock";

type Inventory = {
  id: string;
  itemName: string;
  price: number;
  quantity: number;
  purchasedBy: string;
  vendor: string;
  paymentMode: PaymentMode;
  datePurchased: string;
  status: ItemStatus;
};

const Inventory = () => {
  const columnHelper = createColumnHelper<Inventory>();
  const navigate = useNavigate();

  const [data, setData] = useState<Inventory[]>([
    {
      id: "0",
      itemName: "John Doe",
      quantity: 5,
      price: 100,
      vendor: "Melcom",
      paymentMode: "cash",
      purchasedBy: "John Doe",
      datePurchased: "12-03-2024",
      status: "in-stock",
    },
    {
      id: "2",
      itemName: "John Doe",
      quantity: 5,
      price: 100,
      vendor: "Melcom",
      paymentMode: "cash",
      purchasedBy: "Billy Rogan",
      datePurchased: "12-03-2024",
      status: "low-stock",
    },
    {
      id: "2",
      itemName: "John Doe",
      quantity: 5,
      price: 100,
      vendor: "Melcom",
      paymentMode: "momo",
      purchasedBy: "Jane Doe",
      datePurchased: "12-03-2024",
      status: "out-of-stock",
    },
  ]);

  const columns = [
    columnHelper.accessor("id", {
      id: "id",
      cell: (info) => info.getValue(),
      header: "Item ID",
    }),
    columnHelper.accessor("itemName", {
      id: "itemName",
      cell: (info) => info.getValue(),
      header: "Item Name",
    }),
    columnHelper.accessor("price", {
      id: "price",
      cell: (info) => info.getValue(),
      header: "Price",
    }),
    columnHelper.accessor("quantity", {
      id: "quantity",
      cell: (info) => info.getValue(),
      header: "Quantity",
    }),
    columnHelper.accessor("purchasedBy", {
      id: "purchasedBy",
      cell: (info) => info.getValue(),
      header: "Purchased By",
    }),
    columnHelper.accessor("vendor", {
      id: "vendor",
      cell: (info) => info.getValue(),
      header: "Vendor",
    }),
    columnHelper.accessor("paymentMode", {
      id: "paymentMode",
      cell: (info) => info.getValue(),
      header: "Payment Mode",
    }),
    columnHelper.accessor("datePurchased", {
      id: "datePurchased",
      cell: (info) => info.getValue(),
      header: "Date Purchased",
    }),
    columnHelper.accessor("status", {
      id: "status",
      cell: (info) => (
        <CustomBadge
          title={info.getValue()}
          withDot
          badgeStyle={{ margin: "0 auto" }}
        />
      ),
      header: "Status",
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
              <tr key={row.id} onClick={() => navigate(`/inventory/${row.id}`)}>
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
          <Link to="/inventory/new" style={{ color: "white" }}>
            Create New
          </Link>
        </Button>
      </Flex>
    </Box>
  );
};

export default Inventory;
export { CreateInventory, ViewInventory, EditInventory };
