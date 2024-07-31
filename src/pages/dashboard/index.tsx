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
import { DemoChart } from "../../components";

const Dashboard = () => {
  return (
    <Box mx={4} my={5}>
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={4}
      >
        <GridItem px={4}>
          <SimpleGrid columns={2} gap={8} textAlign="center">
            <Card bgGradient="radial(#A9FFFF, #86C4C4)">
              <CardBody>
                <Text color="#007B23" fontSize="44px">
                  5
                </Text>
                <Text>Ongoing</Text>
              </CardBody>
            </Card>
            <Card bgGradient="radial(#DAFFD0, #ABE49C)">
              <CardBody>
                <Text color="#001B79" fontSize="44px">
                  7
                </Text>
                <Text>Done</Text>
              </CardBody>
            </Card>
            <Card bgGradient="radial(#FFFBD1, #E4DD9C)">
              <CardBody>
                <Text color="#001B79" fontSize="44px">
                  1
                </Text>
                <Text>Almost Due</Text>
              </CardBody>
            </Card>
            <Card bgGradient="radial(#E9BBB1, #D87D69)">
              <CardBody>
                <Text color="#8C0000" fontSize="44px">
                  2
                </Text>
                <Text>Overdue</Text>
              </CardBody>
            </Card>
          </SimpleGrid>
        </GridItem>
        <GridItem>
          <Card>
            <CardHeader
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
              <DemoChart />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <Card bgColor="#FF6A54" minH="300px">
            <CardHeader color="white" fontWeight={600}>
              Inventory Tracking
            </CardHeader>
            <CardBody>
              <DemoChart />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <Card bgColor="#FF6A54">
            <CardHeader color="white" fontWeight={600}>
              Activity Summary
            </CardHeader>
            <CardBody>
              <DemoChart />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Dashboard;
