import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Icon,
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
import { Link } from "react-router-dom";
import CreateInventory from "./CreateInventory";
import ViewInventory from "./ViewInventory";
import EditInventory from "./EditInventory";

type PaymentMode = "momo" | "cash";
type ItemStatus = "InStock" | "LowStock" | "OutOfStock";

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
      status: "InStock",
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
      status: "LowStock",
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
      status: "OutOfStock",
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
      cell: (info) => info.getValue(),
      header: "Status",
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Box mx={4} my={5} boxShadow="md" px={4} py={3}>
      <Flex justifyContent="space-between">
        <Flex>
          <Text>Filter</Text>
          <Icon />
        </Flex>
        <InputGroup maxW="240px" h="48px">
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
          <Input placeholder="Search" />
        </InputGroup>
      </Flex>
      <Box>
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
              <tr key={row.id}>
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
      <Box>
        <Button>
          <Link to="/inventory/new">Create New</Link>
        </Button>
      </Box>
    </Box>
  );
};

export default Inventory;
export { CreateInventory, ViewInventory, EditInventory };
