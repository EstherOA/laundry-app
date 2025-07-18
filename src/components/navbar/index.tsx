import { TriangleDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../../hooks";

const Navbar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useUser();

  const handleLogout = async () => {
    queryClient.removeQueries({ queryKey: ["userToken"] });
    navigate("/login");
  };

  return (
    <Flex
      backgroundColor="#2A3C9B"
      justifyContent="space-between"
      alignItems="center"
      paddingX="2.275rem"
      paddingY="0.875rem"
      color="white"
    >
      {/* logo */}
      <Flex>
        <Text>Laundry Management System</Text>
      </Flex>
      {/* user profile */}
      <Flex alignItems="center" gap={2}>
        <Text>{user?.firstName}</Text>
        <Avatar />
        <Menu>
          <MenuButton as={TriangleDownIcon} />
          <MenuList minW="120px" textAlign="center">
            <MenuItem
              color="black"
              w="100%"
              onClick={() => navigate("/profile")}
            >
              Profile
            </MenuItem>
            <MenuItem color="red" onClick={handleLogout}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Navbar;
