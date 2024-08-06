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
import CreateService from "./CreateService";
import ViewService from "./ViewService";
import EditService from "./EditService";
import FilterIcon from "../../assets/filter.svg";

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
  const navigate = useNavigate();

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
              <tr key={row.id} onClick={() => navigate(`/services/${row.id}`)}>
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
          <Link to="/services/new" style={{ color: "white" }}>
            Create New
          </Link>
        </Button>
      </Flex>
    </Box>
  );
};

export default Services;
export { CreateService, ViewService, EditService };
