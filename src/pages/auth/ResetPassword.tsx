import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import CustomerSvg from "../../assets/customer.svg";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface ResetPasswordFormValues {
  newPassword: string;
  confirmNewPassword: string;
  otp: string;
}

const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
    .required("Password is required"),
  otp: Yup.string().required("OTP is required"),
});

const ResetPassword = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues: ResetPasswordFormValues = {
    otp: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const handleSubmit = async (values: any, actions: any) => {
    console.log("values:", values);
    toast({
      description: "Password Updated Successfully",
      position: "top-right",
      duration: 2500,
      status: "success",
      isClosable: true,
    });
    navigate("/");
    actions.setSubmitting(false);
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
          <Text>Laundry Logo</Text>
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
              Reset Password
            </Heading>
            <Flex mb="1.5em" justify="center">
              <Text>A code has been sent to&nbsp;</Text>
              <Text fontWeight={600}>0551234567</Text>
            </Flex>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form>
                  <Field name="otp">
                    {({ field }: any) => (
                      <FormControl
                        isInvalid={!!(errors.otp && touched.otp)}
                        mb="1.5em"
                      >
                        <FormLabel
                          htmlFor="otp"
                          textStyle="formLabel"
                          fontSize="10px"
                        >
                          Enter OTP
                        </FormLabel>
                        <Input {...field} id="otp" placeholder="020 123 4567" />
                        <FormErrorMessage>{errors.otp}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="newPassword">
                    {({ field }: any) => (
                      <FormControl
                        isInvalid={
                          !!(errors.newPassword && touched.newPassword)
                        }
                        mb="1.5em"
                      >
                        <FormLabel
                          textStyle="formLabel"
                          htmlFor="newPassword"
                          fontSize="10px"
                        >
                          New Password
                        </FormLabel>
                        <InputGroup>
                          <Input
                            {...field}
                            id="newPassword"
                            placeholder="******"
                            type={showPassword ? "text" : "password"}
                          />
                          <InputRightElement
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            <Icon as={showPassword ? ViewOffIcon : ViewIcon} />
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {errors.newPassword}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="confirmNewPassword">
                    {({ field }: any) => (
                      <FormControl
                        isInvalid={
                          !!(
                            errors.confirmNewPassword &&
                            touched.confirmNewPassword
                          )
                        }
                        mb="2.5em"
                      >
                        <FormLabel
                          textStyle="formLabel"
                          htmlFor="confirmNewPassword"
                          fontSize="10px"
                        >
                          Confirm New Password
                        </FormLabel>
                        <InputGroup>
                          <Input
                            {...field}
                            id="confirmNewPassword"
                            placeholder="******"
                            type={showPassword ? "text" : "password"}
                          />
                          <InputRightElement
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            <Icon as={showPassword ? ViewOffIcon : ViewIcon} />
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {errors.confirmNewPassword}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Flex>
                    <Button
                      type="submit"
                      color="white"
                      bgColor="#F3705A"
                      isLoading={isSubmitting}
                      w="150px"
                      _hover={{ bgColor: "#EC4A2F" }}
                    >
                      Submit
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

export default ResetPassword;
