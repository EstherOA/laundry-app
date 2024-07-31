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
import CreateService from "./CreateService";
import ViewService from "./ViewService";
import EditService from "./EditService";

type ServiceType = "washing" | "drying" | "ironing";

type Service = {
  id: string;
  itemName: string;
  serviceType: ServiceType;
  price: number;
  createdAt: string;
  duration: string;
};

const Services = () => {
  const columnHelper = createColumnHelper<Service>();
  const [data, setData] = useState<Service[]>([
    {
      id: "0",
      itemName: "Shirt",
      price: 30,
      createdAt: "12-03-2024",
      serviceType: "washing",
      duration: "2 days",
    },
    {
      id: "1",
      itemName: "Shirt",
      price: 30,
      createdAt: "12-03-2024",
      serviceType: "washing",
      duration: "2 days",
    },
    {
      id: "2",
      itemName: "Shirt",
      price: 30,
      createdAt: "12-03-2024",
      serviceType: "ironing",
      duration: "1 day",
    },
  ]);

  const columns = [
    columnHelper.accessor("id", {
      id: "id",
      cell: (info) => info.getValue(),
      header: "Service ID",
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
    columnHelper.accessor("serviceType", {
      id: "serviceType",
      cell: (info) => info.getValue(),
      header: "Service Type",
    }),
    columnHelper.accessor("duration", {
      id: "duration",
      cell: (info) => info.getValue(),
      header: "Duration",
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
          <Link to="/services/new">Create New</Link>
        </Button>
      </Box>
    </Box>
  );
};

export default Services;
export { CreateService, ViewService, EditService };
