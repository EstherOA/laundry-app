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
import CreateStaff from "./CreateStaff";
import ViewStaff from "./ViewStaff";
import EditStaff from "./EditStaff";
import FilterIcon from "../../assets/filter.svg";
import CustomTable from "../../components/table";
import staff from "../../api/staff";
import { Staff as StaffType } from "../../utils/types";
import { useToken } from "../../hooks";

const Staff = () => {
  const columnHelper = createColumnHelper<StaffType>();
  const navigate = useNavigate();
  const token = useToken();

  const [data, setData] = useState<StaffType[]>([]);

  const columns = [
    columnHelper.accessor("staffId", {
      id: "id",
      cell: (info) => `#${info.getValue()}`,
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
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      header: "Date Commenced",
    }),
    columnHelper.accessor("salary", {
      id: "salary",
      cell: (info) => info.getValue(),
      header: "Salary",
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      header: "Date Created",
    }),
  ];

  useEffect(() => {
    const fetchStaff = async () => {
      const res = await staff.getStaff(token!);
      return res;
    };

    fetchStaff()
      .then((staff) => {
        if (!Array.isArray(staff)) throw new Error("Invalid staff data!");
        const transformed = staff.map(
          ({ firstName, lastName, password, __v, ...rest }: any) => ({
            name: `${firstName} ${lastName}`,
            firstName,
            lastName,
            ...rest,
          })
        );

        setData(transformed);
      })
      .catch((err) => console.error("error fetching staff:", err));
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
            navigate(`/staff/${row._id}`, {
              state: {
                staffDetails: row,
              },
            })
          }
        />
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
