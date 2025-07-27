import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import {
  RevenueChart,
  InventoryStatusChart,
  OrderStatusChart,
} from "../../components";
import { useEffect, useState } from "react";
import { useOrders } from "../../hooks";
import { Order } from "../../utils/types";

const Dashboard = () => {
  const { data: orders, isLoading } = useOrders();
  const [stats, setStats] = useState({
    ongoing: 0,
    done: 0,
    almostDue: 0,
    overdue: 0,
  });

  useEffect(() => {
    if (orders && Array.isArray(orders)) {
      const orderStats = {
        ongoing: 0,
        done: 0,
        almostDue: 0,
        overdue: 0,
      };

      orders.forEach((order: Order) => {
        switch (order.orderStatus) {
          case "pending":
            orderStats.ongoing += 1;
            break;
          case "complete":
            orderStats.done += 1;
            break;
          case "almost-due":
            orderStats.almostDue += 1;
            break;
          case "overdue":
            orderStats.overdue += 1;
            break;
          case "cancelled":
            // Cancelled orders are not counted in any category
            break;
          default:
            break;
        }
      });

      setStats(orderStats);
    }
  }, [orders]);

  return (
    <Box mx="32px" mt="48px" boxShadow="md" px={7} pt={5} pb={7}>
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={4}
      >
        <GridItem>
          <SimpleGrid columns={2} gap={8} textAlign="center">
            <Card bgGradient="radial(#A9FFFF, #86C4C4)">
              <CardBody>
                <Text color="#007B23" fontSize="44px">
                  {isLoading ? "..." : stats.ongoing}
                </Text>
                <Text>Ongoing</Text>
              </CardBody>
            </Card>
            <Card bgGradient="radial(#DAFFD0, #ABE49C)">
              <CardBody>
                <Text color="#001B79" fontSize="44px">
                  {isLoading ? "..." : stats.done}
                </Text>
                <Text>Done</Text>
              </CardBody>
            </Card>
            <Card bgGradient="radial(#FFFBD1, #E4DD9C)">
              <CardBody>
                <Text color="#001B79" fontSize="44px">
                  {isLoading ? "..." : stats.almostDue}
                </Text>
                <Text>Almost Due</Text>
              </CardBody>
            </Card>
            <Card bgGradient="radial(#E9BBB1, #D87D69)">
              <CardBody>
                <Text color="#8C0000" fontSize="44px">
                  {isLoading ? "..." : stats.overdue}
                </Text>
                <Text>Overdue</Text>
              </CardBody>
            </Card>
          </SimpleGrid>
        </GridItem>
        <GridItem>
          <Card h="100%">
            <CardHeader
              borderTopLeftRadius="0.375rem"
              borderTopRightRadius="0.375rem"
              textTransform="uppercase"
              color="white"
              pl={8}
              py={3}
              bgColor="#1A7DDB"
              fontSize="18px"
            >
              Order Trend
            </CardHeader>
            <CardBody>
              <OrderStatusChart />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <Card h="100%" bgColor="#FF6A54">
            <CardHeader color="white" fontWeight={600}>
              Inventory Tracking
            </CardHeader>
            <CardBody>
              <InventoryStatusChart />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <Card h="100%" bgColor="#FF6A54">
            <CardHeader color="white" fontWeight={600}>
              Revenue Insights
            </CardHeader>
            <CardBody>
              <RevenueChart />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Dashboard;
