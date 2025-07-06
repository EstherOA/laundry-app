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
import CreateInventory from "./CreateInventory";
import ViewInventory from "./ViewInventory";
import EditInventory from "./EditInventory";
import FilterIcon from "../../assets/filter.svg";
import { CustomBadge } from "../../components";
import { useQuery } from "@tanstack/react-query";
import inventory from "../../api/inventory";
import CustomTable from "../../components/table";
import { Inventory as InventoryType } from "../../utils/types";

const Inventory = () => {
  const columnHelper = createColumnHelper<InventoryType>();
  const navigate = useNavigate();
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  const [data, setData] = useState<InventoryType[]>([]);

  const columns = [
    columnHelper.accessor("itemId", {
      id: "id",
      cell: (info) => `#${info.getValue()}`,
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
      cell: (info) => info.getValue().name,
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
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
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

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        return await inventory.getInventory(token!);
      } catch (error) {
        console.error("error fetching services:", error);
      }
    };
    fetchInventory()
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Invalid inventory data!");
        setData(data);
      })
      .catch((error) => console.error("error fetching staff:", error));
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
            navigate(`/inventory/${row._id}`, {
              state: {
                inventoryDetails: row,
              },
            })
          }
        />
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
