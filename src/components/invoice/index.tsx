import { Box, Flex, Text, Heading, Grid, GridItem } from "@chakra-ui/react";

const Invoice = () => {
  return (
    <Box id="invoice" position="absolute" left="-99999px">
      <Flex bgColor="#2A3C9B" py={10} justify="center" color="white">
        <Heading>Invoice</Heading>
      </Flex>
      <Box px="3rem" pt={8} pb={3}>
        <Flex flexDir="column" justify="space-between" h="10rem">
          <Box>
            <Flex mb={2}>
              <Text fontWeight={600}>Date:&nbsp;</Text>
              <Text>05/06/2024</Text>
            </Flex>
            <Flex>
              <Text fontWeight={600}>Invoice Number:&nbsp;</Text>
              <Text>INV-001-24</Text>
            </Flex>
          </Box>
          <Flex>
            <Text fontWeight={600}>From:&nbsp;</Text>
            <Text>Chapman Laundry Service</Text>
          </Flex>
          <Flex justify="space-between">
            <Flex>
              <Text fontWeight={600}>Recipient:&nbsp;</Text>
              <Text>John Doe</Text>
            </Flex>
            <Flex>
              <Text fontWeight={600}>Address:&nbsp;</Text>
              <Text>Kejetia Main Road</Text>
            </Flex>
          </Flex>
        </Flex>
        <Box mt={8}>
          <Grid
            textAlign="center"
            templateColumns="repeat(4, 1fr)"
            templateRows="repeat(7, 1fr)"
          >
            <GridItem
              bgColor="#2A923B"
              mb={3}
              py={3}
              color="white"
              textTransform="uppercase"
              fontSize="14px"
              fontWeight={600}
            >
              <Text>Item</Text>
            </GridItem>
            <GridItem
              bgColor="#2A923B"
              mb={3}
              py={3}
              color="white"
              textTransform="uppercase"
              fontSize="14px"
              fontWeight={600}
            >
              <Text>Service</Text>
            </GridItem>
            <GridItem
              bgColor="#2A923B"
              mb={3}
              py={3}
              color="white"
              textTransform="uppercase"
              fontSize="14px"
              fontWeight={600}
            >
              <Text>Quantity</Text>
            </GridItem>
            <GridItem
              bgColor="#2A923B"
              mb={3}
              py={3}
              color="white"
              textTransform="uppercase"
              fontSize="14px"
              fontWeight={600}
            >
              <Text>Price</Text>
            </GridItem>
            <GridItem>
              <Text>Shirt</Text>
            </GridItem>
            <GridItem>
              <Text>Washing & Ironing</Text>
            </GridItem>
            <GridItem>
              <Text>1</Text>
            </GridItem>
            <GridItem>
              <Text>GHS 1.00</Text>
            </GridItem>
            <GridItem>
              <Text>Shirt</Text>
            </GridItem>
            <GridItem>
              <Text>Washing & Ironing</Text>
            </GridItem>
            <GridItem>
              <Text>1</Text>
            </GridItem>
            <GridItem>
              <Text>GHS 1.00</Text>
            </GridItem>
            <GridItem>
              <Text>Shirt</Text>
            </GridItem>
            <GridItem>
              <Text>Washing & Ironing</Text>
            </GridItem>
            <GridItem>
              <Text>1</Text>
            </GridItem>
            <GridItem>
              <Text>GHS 1.00</Text>
            </GridItem>
            <GridItem>
              <Text>Shirt</Text>
            </GridItem>
            <GridItem>
              <Text>Washing & Ironing</Text>
            </GridItem>
            <GridItem>
              <Text>1</Text>
            </GridItem>
            <GridItem>
              <Text>GHS 1.00</Text>
            </GridItem>
            <GridItem>
              <Text>Shirt</Text>
            </GridItem>
            <GridItem>
              <Text>Washing & Ironing</Text>
            </GridItem>
            <GridItem>
              <Text>1</Text>
            </GridItem>
            <GridItem>
              <Text>GHS 1.00</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight={600}>Total</Text>
            </GridItem>
            <GridItem colSpan={2}></GridItem>
            <GridItem>
              <Text fontWeight={600}>GHS 3,500.00</Text>
            </GridItem>
          </Grid>
          <Flex justify="space-between" px="1rem">
            <Box fontSize="14px">
              <Text fontWeight={700} mb={2}>
                Payment Details
              </Text>
              <Flex>
                <Text fontWeight={600}>Momo:&nbsp;</Text>
                <Text>0556512345</Text>
              </Flex>
              <Flex>
                <Text fontWeight={600}>Bank:&nbsp;</Text>
                <Text>Fidelity Bank</Text>
              </Flex>
              <Flex>
                <Text fontWeight={600}>Branch:&nbsp;</Text>
                <Text>Kejetia</Text>
              </Flex>
              <Flex>
                <Text fontWeight={600}>Account Name:&nbsp;</Text>
                <Text>Chapman Prestige Limited</Text>
              </Flex>
              <Flex>
                <Text fontWeight={600}>Account Number:&nbsp;</Text>
                <Text>001590412345</Text>
              </Flex>
            </Box>
            <Box mt="4rem" borderBottom="2px dashed">
              <Text>Signature</Text>
            </Box>
          </Flex>
        </Box>
        <Box
          textAlign="center"
          position="relative"
          bgColor="#2A923B"
          mt={10}
          py={3}
          color="white"
        >
          <Text mr="2.5rem">chapmanprestige@gmail.com</Text>
          <Text
            position="absolute"
            right="1rem"
            bottom={0}
            fontStyle="italic"
            fontSize="2.5rem"
          >
            Thank you!
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Invoice;
