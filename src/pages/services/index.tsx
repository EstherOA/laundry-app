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
import CreateService from "./CreateService";
import ViewService from "./ViewService";
import EditService from "./EditService";
import FilterIcon from "../../assets/filter.svg";
import { Service } from "../../utils/types";
import services from "../../api/services";
import { useQuery } from "@tanstack/react-query";
import CustomTable from "../../components/table";

const Services = () => {
  const columnHelper = createColumnHelper<Service>();
  const navigate = useNavigate();
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  const [data, setData] = useState<Service[]>([]);

  const columns = [
    columnHelper.accessor("serviceId", {
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
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      header: "Date Created",
    }),
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await services.getServices(token!);
        return res;
      } catch (error) {
        console.error("error fetching services:", error);
      }
    };
    fetchServices().then((data) => {
      if (!Array.isArray(data)) throw new Error("Invalid service data!");
      setData(data);
    });
  }, [token]);

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
            navigate(`/services/${row._id}`, {
              state: {
                serviceDetails: row,
              },
            })
          }
        />
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
