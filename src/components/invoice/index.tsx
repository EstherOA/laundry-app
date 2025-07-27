import {
  Box,
  Flex,
  Text,
  Heading,
  Grid,
  GridItem,
  Button,
} from "@chakra-ui/react";
import { Fragment, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Order } from "../../utils/types";
import { format } from "date-fns";
import { APP_NAME } from "../../utils/constants";

const Invoice = ({ orderDetails }: { orderDetails: Order }) => {
  const invoiceRef = useRef(null);

  const handleDownloadInvoice = async () => {
    const element = invoiceRef.current;

    if (!element) return;

    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(data, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${orderDetails.invoiceId}.pdf`);
  };

  return (
    <Box>
      <Box id="invoice" pt={8} ref={invoiceRef}>
        <Heading textAlign="center">Invoice #{orderDetails.invoiceId}</Heading>
        <Box px="3rem" pt="2.5rem">
          <Flex flexDir="row" justify="space-between">
            <Box>
              <Flex mb={2}>
                <Text fontWeight={600}>Date:&nbsp;</Text>
                <Text>
                  {format(new Date(orderDetails.createdAt), "dd MMM yyyy")}
                </Text>
              </Flex>
              <Flex>
                <Text fontWeight={600}>From:&nbsp;</Text>
                <Text>{APP_NAME}</Text>
              </Flex>
            </Box>
            <Flex flexDir="column">
              <Flex mb={2}>
                <Text fontWeight={600}>Recipient:&nbsp;</Text>
                <Text>{`${orderDetails.customer.firstName} ${orderDetails.customer.lastName}`}</Text>
              </Flex>
              <Flex>
                <Text fontWeight={600}>Address:&nbsp;</Text>
                <Text>{orderDetails.customer.address}</Text>
              </Flex>
            </Flex>
          </Flex>
          <Box mt="3.5rem">
            <Grid
              textAlign="center"
              templateColumns="repeat(4, 1fr)"
              templateRows={`repeat(${orderDetails.items.length + 2}, 1fr)`}
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
              {orderDetails.items.map((item: any) => (
                <Fragment key={item.itemId}>
                  <GridItem>
                    <Text textTransform="capitalize">{item.itemName}</Text>
                  </GridItem>
                  <GridItem>
                    <Text textTransform="capitalize">{item.serviceType}</Text>
                  </GridItem>
                  <GridItem>
                    <Text>{item.quantity}</Text>
                  </GridItem>
                  <GridItem>
                    <Text>GH₵ {item.price}</Text>
                  </GridItem>
                </Fragment>
              ))}
              <GridItem>
                <Text fontWeight={600}>Total</Text>
              </GridItem>
              <GridItem colSpan={2}></GridItem>
              <GridItem>
                <Text fontWeight={600}>GH₵ {orderDetails.totalAmount}</Text>
              </GridItem>
              <GridItem colSpan={4}>
                <Text></Text>
              </GridItem>
              <GridItem colSpan={4}>
                <Text></Text>
              </GridItem>
            </Grid>
            <Flex justify="space-between" align="flex-end" px="1rem">
              <Box fontSize="14px">
                <Text fontWeight={700} mb={2}>
                  Payment Details
                </Text>
                <Flex>
                  <Text fontWeight={600}>Momo:&nbsp;</Text>
                  <Text>0556512345</Text>
                </Flex>
              </Box>
              <Box mt="4rem" borderBottom="2px dashed">
                <Text mb={8} fontSize="0.8rem" fontWeight={600}>
                  Signature
                </Text>
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
              fontSize="2rem"
            >
              Thank you!
            </Text>
          </Box>
        </Box>
      </Box>
      <Flex mb={10} mt={4} justifyContent="flex-end" mr="3rem">
        <Button
          bgColor="#43BE57"
          _hover={{ bgColor: "#007B23" }}
          color="white"
          onClick={handleDownloadInvoice}
        >
          Download Invoice
        </Button>
      </Flex>
    </Box>
  );
};

export default Invoice;
