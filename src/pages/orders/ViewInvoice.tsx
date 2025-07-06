import { Box, Flex, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import Invoice from "../../components/invoice";

const ViewInvoice = () => {
  const {
    state: { orderDetails },
  } = useLocation();
  const navigate = useNavigate();

  return (
    <Box mx="32px" mt="48px" boxShadow="md" px={7} pt={5} pb={7}>
      <Box>
        <Flex
          w="100%"
          justify="center"
          alignItems="center"
          mb="20px"
          position="relative"
        >
          <IconButton
            aria-label="go back"
            as={ArrowBackIcon}
            w="36px"
            position="absolute"
            h="28px"
            left="150px"
            variant="ghost"
            onClick={() => {
              navigate(-1);
            }}
            cursor="pointer"
          />
          <Text fontSize="28px" fontWeight="semibold">
            Invoice #{orderDetails.invoiceId}
          </Text>
        </Flex>
        <Invoice orderDetails={orderDetails} />
      </Box>
    </Box>
  );
};

export default ViewInvoice;
