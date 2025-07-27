import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import CustomerSvg from "../../assets/customer.svg";
import { APP_NAME } from "../../utils/constants";

interface SendOtpFormValues {
  phoneNumber: string;
}

const validationSchema = Yup.object({
  phoneNumber: Yup.string().required("Phone number is required"),
});

const SendOtp = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (values: any, actions: any) => {
    toast({
      description: "OTP sent successfully",
      position: "top-right",
      duration: 2500,
      status: "success",
      isClosable: true,
    });
    navigate("/reset-password");
    actions.setSubmitting(false);
  };

  const initialValues: SendOtpFormValues = {
    phoneNumber: "",
  };

  return (
    <Box minH="100vh">
      <Grid templateColumns="repeat(2, 1fr)">
        <Flex
          bgColor="#1A7DDB"
          minH="100vh"
          pt="12em"
          flexDir="column"
          color="white"
          alignItems="center"
          gap="2.5em"
        >
          <Text>{APP_NAME}</Text>
          <Text textStyle="h1" fontWeight={500}>
            Laundry Management System
          </Text>
          <Flex w="340px" h="230px">
            <Image src={CustomerSvg} w="100%" objectFit="cover" />
          </Flex>
        </Flex>
        <Box minH="100vh" pl="5em" pt="12em">
          <Box w="60%">
            <Heading textAlign="center" pb={4}>
              Send OTP
            </Heading>
            <Flex mb="1.5em" justify="center">
              <Text>Enter your phone number to receive an OTP</Text>
            </Flex>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form>
                  <Field name="phoneNumber">
                    {({ field }: any) => (
                      <FormControl
                        isInvalid={
                          !!(errors.phoneNumber && touched.phoneNumber)
                        }
                        mb="1.5em"
                      >
                        <FormLabel
                          htmlFor="phoneNumber"
                          textStyle="formLabel"
                          fontSize="10px"
                        >
                          Phone Number
                        </FormLabel>
                        <Input
                          {...field}
                          id="phoneNumber"
                          placeholder="0551234567"
                        />
                        <FormErrorMessage>
                          {errors.phoneNumber}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Flex align="center">
                    <Button
                      onClick={() => navigate(-1)}
                      color="white"
                      bgColor="#1A7DDB"
                      isLoading={isSubmitting}
                      w="150px"
                      mr="1em"
                      _hover={{ bgColor: "#255DEF" }}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      color="white"
                      bgColor="#F3705A"
                      isLoading={isSubmitting}
                      w="150px"
                      _hover={{ bgColor: "#EC4A2F" }}
                    >
                      Send OTP
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default SendOtp;
