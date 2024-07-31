import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import DashboardIcon from "../../assets/dashboard.svg";
import ServiceIcon from "../../assets/service.svg";
import OrderIcon from "../../assets/order.svg";
import CustomerIcon from "../../assets/customer.svg";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const sideItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: DashboardIcon,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: OrderIcon,
  },
  {
    title: "Services",
    href: "/services",
    icon: ServiceIcon,
  },
  {
    title: "Customers",
    href: "/customers",
    icon: CustomerIcon,
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: OrderIcon,
  },
  {
    title: "Staff",
    href: "/staff",
    icon: CustomerIcon,
  },
  {
    title: "Report",
    href: "/reports",
    icon: DashboardIcon,
  },
];

const Sidebar = () => {
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const navigate = useNavigate();

  const getPageIllustration = useCallback(() => {
    return (
      sideItems.find((item) => item.title === currentPage)?.icon ??
      DashboardIcon
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
            _active={{}}
            _hover={{ backgroundColor: "#2770B5" }}
            transition="background-color ease 0.25s"
            alignItems="center"
            gap={2}
            pl={5}
          >
            <Icon />
            <Text>{item.title}</Text>
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
