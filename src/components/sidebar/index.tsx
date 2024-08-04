import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import DashboardSvg from "../../assets/dashboard.svg";
import ServiceSvg from "../../assets/service.svg";
import OrderSvg from "../../assets/order.svg";
import CustomerSvg from "../../assets/customer.svg";
import DashboardIcon from "../../assets/dashboard_icon.svg";
import ServiceIcon from "../../assets/service_icon.svg";
import StaffIcon from "../../assets/staff_icon.svg";
import OrderIcon from "../../assets/order_icon.svg";
import InventoryIcon from "../../assets/inventory_icon.svg";
import CustomerIcon from "../../assets/customer_icon.svg";
import ReportIcon from "../../assets/report_icon.svg";

const sideItems = [
  {
    title: "Dashboard",
    href: "/",
    svg: DashboardSvg,
    icon: DashboardIcon,
  },
  {
    title: "Orders",
    href: "/orders",
    svg: OrderSvg,
    icon: OrderIcon,
  },
  {
    title: "Services",
    href: "/services",
    svg: ServiceSvg,
    icon: ServiceIcon,
  },
  {
    title: "Customers",
    href: "/customers",
    svg: CustomerSvg,
    icon: CustomerIcon,
  },
  {
    title: "Inventory",
    href: "/inventory",
    svg: OrderSvg,
    icon: InventoryIcon,
  },
  {
    title: "Staff",
    href: "/staff",
    svg: CustomerSvg,
    icon: StaffIcon,
  },
  {
    title: "Reports",
    href: "/reports",
    svg: DashboardSvg,
    icon: ReportIcon,
  },
];

const Sidebar = () => {
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const navigate = useNavigate();

  const getPageIllustration = useCallback(() => {
    return (
      sideItems.find((item) => item.title === currentPage)?.svg ?? DashboardSvg
    );
  }, [currentPage, sideItems]);

  const handleClick = (title: string, to: string) => {
    setCurrentPage(title);
    navigate(to);
  };

  return (
    <Flex
      flexDir="column"
      backgroundColor="#1A7DDB"
      justifyContent="space-between"
      paddingTop="15%"
      color="white"
      h="100%"
    >
      <Box>
        {sideItems.map((item, i) => (
          <Flex
            key={i}
            onClick={() => handleClick(item.title, item.href)}
            cursor="pointer"
            py={2}
            mb={4}
            w="100%"
            justifyContent="flex-start"
            _hover={{
              backgroundColor: "#2770B5",
              borderLeft: "5px solid #A5CCEF",
            }}
            transition="all ease-in 0.1s"
            alignItems="center"
            gap={2}
            pl={5}
          >
            <Image src={item.icon} />
            <Text fontWeight={600}>{item.title}</Text>
          </Flex>
        ))}
      </Box>
      <Flex width="300px" justifyContent="center">
        <Image src={getPageIllustration()} />
      </Flex>
    </Flex>
  );
};

export default Sidebar;
