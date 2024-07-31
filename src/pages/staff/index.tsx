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
import CreateStaff from "./CreateStaff";
import ViewStaff from "./ViewStaff";
import EditStaff from "./EditStaff";

type Shift = "odd" | "even";

type Staff = {
  id: string;
  name: string;
  role: string;
  phoneNumber: string;
  shift: Shift;
  dateCommenced: string;
  salary: number;
  createdAt: string;
};

const Staff = () => {
  const columnHelper = createColumnHelper<Staff>();
  const [data, setData] = useState<Staff[]>([
    {
      id: "0",
      name: "John Doe",
      phoneNumber: "0551234567",
      createdAt: "12-03-2024",
      shift: "even",
      dateCommenced: "21-09-2012",
      salary: 1500,
      role: "washing",
    },
    {
      id: "1",
      name: "John Doe",
      phoneNumber: "0551234567",
      createdAt: "12-03-2024",
      shift: "even",
      dateCommenced: "21-09-2012",
      salary: 1500,
      role: "washing",
    },
    {
      id: "2",
      name: "Jane Doe",
      phoneNumber: "0551234567",
      createdAt: "12-03-2024",
      shift: "odd",
      dateCommenced: "21-09-2012",
      salary: 1500,
      role: "ironing",
    },
  ]);

  const columns = [
    columnHelper.accessor("id", {
      id: "id",
      cell: (info) => info.getValue(),
      header: "Staff ID",
    }),
    columnHelper.accessor("name", {
      id: "name",
      cell: (info) => info.getValue(),
      header: "Full Name",
    }),
    columnHelper.accessor("role", {
      id: "role",
      cell: (info) => info.getValue(),
      header: "Role",
    }),
    columnHelper.accessor("phoneNumber", {
      id: "phoneNumber",
      cell: (info) => info.getValue(),
      header: "Phone Number",
    }),
    columnHelper.accessor("shift", {
      id: "shift",
      cell: (info) => info.getValue(),
      header: "Shift",
    }),
    columnHelper.accessor("dateCommenced", {
      id: "dateCommenced",
      cell: (info) => info.getValue(),
      header: "Date Commenced",
    }),
    columnHelper.accessor("salary", {
      id: "salary",
      cell: (info) => info.getValue(),
      header: "Salary",
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
          <Link to="/staff/new">Create New</Link>
        </Button>
      </Box>
    </Box>
  );
};

export default Staff;
export { CreateStaff, ViewStaff, EditStaff };
