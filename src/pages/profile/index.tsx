import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { format } from "date-fns";
import EditProfile from "./EditProfile";
import { useUser } from "../../hooks";
import { useNavigate } from "react-router-dom";
import React from "react";

const Profile = () => {
  const navigate = useNavigate();
  const user = useUser();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const navigateToEditProfile = () => {
    navigate("/profile/edit", {
      state: {
        profile: user,
      },
    });
  };

  const handleChangePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Placeholder: handle file upload logic here
    const file = event.target.files?.[0];
    if (file) {
      // TODO: upload file
      console.log("Selected file:", file);
    }
  };

  return (
    <Box mx="32px" mt="48px" boxShadow="md" px="5em" py={7}>
      <Grid templateColumns="1fr 2fr" gap={10}>
        <Flex position="relative" width="280px" height="225px">
          <Flex w="100%" height="100%">
            <Image maxW="100%" w="100%" border="none" />
          </Flex>
          <Button
            width="100%"
            borderRadius={0}
            backgroundColor="rgba(0, 0, 0, 0.7)"
            color="#fff"
            position="absolute"
            bottom={0}
            _hover={{}}
            h="52px"
            textTransform="uppercase"
            fontSize="12px"
            onClick={handleChangePhotoClick}
          >
            Change Photo
          </Button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </Flex>
        <Flex flexDir="column" gap={5}>
          <Box>
            <Flex justify="space-between">
              <Text textStyle="h2">{`${user.firstName} ${user.lastName}`}</Text>
              <Button
                px={2}
                borderRadius="12px"
                borderWidth="2px"
                variant="outline"
                borderColor="#1A7DDB"
                color="#1A7DDB"
                backgroundColor="#ECF4FA"
                onClick={navigateToEditProfile}
                h="28px"
              >
                Edit profile
              </Button>
            </Flex>
            <Text color="#255DEF">{user.role}</Text>
          </Box>
          <Text fontSize="1.2rem" textTransform="capitalize">
            {user.shift} Shift
          </Text>
          <Box>
            <Flex>
              <Text fontWeight="600">201</Text>
              <Text>&nbsp;processed orders</Text>
            </Flex>
          </Box>
        </Flex>
        <Box>
          <Flex h="42px" align="flex-end">
            <Text textStyle="formLabel" fontSize="14px" color="#999999">
              Files
            </Text>
          </Flex>
          <Box mt={5}>
            <Flex>
              <Text mb={2} color="#255DEF">
                Employment Contract
              </Text>
            </Flex>
            <Flex>
              <Text color="#255DEF">National ID</Text>
            </Flex>
          </Box>
        </Box>
        <Tabs>
          <TabList>
            <Tab>About</Tab>
            <Tab>Activity</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Flex flexDir="column" gap={5}>
                <Flex flexDir="row" justify="space-between">
                  <Box width="30%" color="#255DEF">
                    Address
                  </Box>
                  <Box width="60%">{user.address}</Box>
                </Flex>
                <Flex flexDir="row" justify="space-between">
                  <Box width="30%" color="#255DEF">
                    Phone Number
                  </Box>
                  <Box width="60%">{user.phoneNumber}</Box>
                </Flex>
                <Flex flexDir="row" justify="space-between">
                  <Box width="30%" color="#255DEF">
                    ID Number
                  </Box>
                  <Box width="60%">{user.idNumber}</Box>
                </Flex>
                <Flex flexDir="row" justify="space-between">
                  <Box width="30%" color="#255DEF">
                    Date Commenced
                  </Box>
                  <Box width="60%">
                    {format(new Date(user.dateCommenced), "do MMMM yyyy")}
                  </Box>
                </Flex>
                <Flex flexDir="row" justify="space-between">
                  <Box width="30%" color="#255DEF">
                    SSNIT
                  </Box>
                  <Box width="60%">{user.ssnit}</Box>
                </Flex>
                <Flex flexDir="row" justify="space-between">
                  <Box width="30%" color="#255DEF">
                    TIN
                  </Box>
                  <Box width="60%">{user.tin}</Box>
                </Flex>
                <Flex flexDir="row" justify="space-between">
                  <Box width="30%" color="#255DEF">
                    Salary
                  </Box>
                  <Box width="60%">{`GH₵${user.salary}`}</Box>
                </Flex>
              </Flex>
            </TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
      </Grid>
    </Box>
  );
};

export default Profile;
export { EditProfile };
