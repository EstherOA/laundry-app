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
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreateCustomer from "./CreateCustomer";
import EditCustomer from "./EditCustomer";
import ViewCustomer from "./ViewCustomer";
import FilterIcon from "../../assets/filter.svg";
import { useQuery } from "@tanstack/react-query";
import customers from "../../api/customers";
import CustomTable from "../../components/table";
import { Customer } from "../../utils/types";

const Customers = () => {
  const columnHelper = createColumnHelper<Customer>();
  const navigate = useNavigate();
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  const [data, setData] = useState<Customer[]>([]);

  const columns = [
    columnHelper.accessor("customerId", {
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
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      header: "Date Created",
    }),
  ];

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await customers.getCustomers(token!);
        return res;
      } catch (error) {
        console.error("error fetching services:", error);
      }
    };
    fetchCustomers()
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Invalid customer data!");
        const transformed = data.map(
          ({ firstName, lastName, __v, ...rest }: any) => ({
            name: `${firstName} ${lastName}`,
            firstName,
            lastName,
            ...rest,
          })
        );
        setData(transformed);
      })
      .catch((err) => console.error("error fetching customers:", err));
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
            navigate(`/customers/${row._id}`, {
              state: {
                customerDetails: row,
              },
            })
          }
        />
      </Box>
      <Flex justify="flex-end">
        <Button bgColor="#43BE57" _hover={{ bgColor: "#007B23" }}>
          <Link to="/customers/new" style={{ color: "white" }}>
            Create New
          </Link>
        </Button>
      </Flex>
    </Box>
  );
};

export default Customers;
export { CreateCustomer, EditCustomer, ViewCustomer };
