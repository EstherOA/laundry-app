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
import CreateCustomer from "./CreateCustomer";
import EditCustomer from "./EditCustomer";
import ViewCustomer from "./ViewCustomer";

type Customer = {
  id: string;
  name: string;
  phoneNumber: string;
  address: string;
  createdAt: string;
};

const Customers = () => {
  const columnHelper = createColumnHelper<Customer>();
  const [data, setData] = useState<Customer[]>([
    {
      id: "0",
      name: "John Doe",
      phoneNumber: "05000101232",
      createdAt: "12-03-2024",
      address: "Kejetia main lane",
    },
    {
      id: "1",
      name: "Billy Rogan",
      phoneNumber: "05000101232",
      createdAt: "12-03-2024",
      address: "Kejetia main lane",
    },
    {
      id: "2",
      name: "Jane Doe",
      phoneNumber: "05000101232",
      createdAt: "12-03-2024",
      address: "Kejetia main lane",
    },
  ]);

  const columns = [
    columnHelper.accessor("id", {
      id: "id",
      cell: (info) => info.getValue(),
      header: "Customer ID",
    }),
    columnHelper.accessor("name", {
      id: "name",
      cell: (info) => info.getValue(),
      header: "Full Name",
    }),
    columnHelper.accessor("phoneNumber", {
      id: "phoneNumber",
      cell: (info) => info.getValue(),
      header: "Phone Number",
    }),
    columnHelper.accessor("address", {
      id: "address",
      cell: (info) => info.getValue(),
      header: "Address",
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      cell: (info) => info.getValue(),
      header: "Date Created",
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
          <Link to="/customers/new">Create New</Link>
        </Button>
      </Box>
    </Box>
  );
};

export default Customers;
export { CreateCustomer, EditCustomer, ViewCustomer };
