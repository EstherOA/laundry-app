import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useUser } from "../../hooks";

const Profile = () => {
  const user = useUser();

  return (
    <Box mx="32px" mt="48px" boxShadow="md" px="5em" py={7}>
      <Grid templateColumns="1fr 2fr" templateRows="repeat(2, 1fr)" gap={10}>
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
          >
            Change Photo
          </Button>
        </Flex>
        <Flex flexDir="column" justify="space-between">
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
                disabled
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
            <Flex>
              <Text fontWeight="600">35</Text>
              <Text>&nbsp;deliveries</Text>
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
              <SimpleGrid></SimpleGrid>
            </TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
      </Grid>
    </Box>
  );
};

export default Profile;
