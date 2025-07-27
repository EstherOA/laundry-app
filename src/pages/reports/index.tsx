import {
  Box,
  Center,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import {
  CustomerChart,
  InventoryMonthlyChart,
  InventoryStatusChart,
  OrderStatusChart,
  RevenueChart,
  StaffChart,
} from "../../components";

const Reports = () => {
  return (
    <Box mx="32px" mt="48px" h="80%" boxShadow="md" px={7} pt={5} pb={7}>
      <Heading textAlign="center" mb={8}>
        Reports
      </Heading>
      <Tabs isFitted variant="soft-rounded">
        <TabList mb="1em">
          <Tab>Orders</Tab>
          <Tab>Customers</Tab>
          <Tab>Staff</Tab>
          <Tab>Inventory</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex gap={10}>
              <Box height="450px" w="full">
                <Text fontWeight="bold" mb={4} fontSize="lg">
                  Orders statistics (Last 6 months)
                </Text>
                <OrderStatusChart />
              </Box>
              <Box height="450px" w="full">
                <Text fontWeight="bold" mb={4} fontSize="lg">
                  Total Monthly Revenue (Last 6 months)
                </Text>
                <RevenueChart />
              </Box>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex flexDir="column" gap={10}>
              <Box height="450px" w="full">
                <Text fontWeight="bold" mb={4} fontSize="lg">
                  New vs Total Customers (Last 6 Months)
                </Text>
                <CustomerChart />
              </Box>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex flexDir="column" gap={10}>
              <Box height="450px" w="full">
                <Text fontWeight="bold" mb={4} fontSize="lg">
                  New vs Total Staff (Last 6 Months)
                </Text>
                <StaffChart />
              </Box>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex gap={10}>
              <Box height="450px" w="full">
                <Text fontWeight="bold" mb={4} fontSize="lg">
                  Current Inventory statistics
                </Text>
                <InventoryStatusChart />
              </Box>
              <Box height="450px" w="full">
                <Text fontWeight="bold" mb={4} fontSize="lg">
                  Monthly Expenses (Last 6 months)
                </Text>
                <InventoryMonthlyChart />
              </Box>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Reports;
