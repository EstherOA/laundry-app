import {
  Avatar,
  Badge,
  Box,
  Flex,
  Icon,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

const Settings = () => {
  return (
    <Box mx="32px" mt="48px" boxShadow="md" px={7} pt={5} pb={7}>
      <SimpleGrid columns={2}>
        <Box>
          <Flex>
            <Avatar />
            <Flex>
              <Text>Change Photo</Text>
            </Flex>
          </Flex>
          <Box>
            <Text>Files</Text>
            <Flex>
              <Text>Employment Contract</Text>
              <Icon />
            </Flex>
            <Flex>
              <Text>National ID</Text>
              <Icon />
            </Flex>
          </Box>
        </Box>
        <Box>
          <Box>
            <Box>
              <Flex>
                <Text>Ama Govenor</Text>
                <Badge>Edit Profile</Badge>
              </Flex>
              <Text>Employee</Text>
            </Box>
            <Box>
              <Text>Weekend Shift</Text>
            </Box>
            <Box>
              <Flex>
                <Text>201</Text>
                <Text>processed orders</Text>
              </Flex>
              <Flex>
                <Text>35</Text>
                <Text>Deliveries</Text>
              </Flex>
            </Box>
          </Box>
          <Box>
            <Tabs>
              <TabList>
                <Tab>About</Tab>
                <Tab>Activity</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box>
                    <Flex>
                      <Text>Phone Number</Text>
                      <Text>+233 55 123 2134</Text>
                    </Flex>
                  </Box>
                </TabPanel>
                <TabPanel></TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Settings;
