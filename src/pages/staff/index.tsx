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
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
    <Box mx="32px" mt="48px" boxShadow="md" px={7} pt={5} pb={7}>
      <Flex justifyContent="space-between">
        <Flex>
          <Text>Filter</Text>
          <Icon />
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
              <tr key={row.id} onClick={() => navigate(`/staff/${row.id}`)}>
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
          <Link to="/staff/new" style={{ color: "white" }}>
            Create New
          </Link>
        </Button>
      </Flex>
    </Box>
  );
};

export default Staff;
export { CreateStaff, ViewStaff, EditStaff };
