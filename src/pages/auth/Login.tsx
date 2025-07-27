import { useState, useEffect } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { useLogin, useUser } from "../../hooks";
import { APP_NAME } from "../../utils/constants";
import { useSendOtp } from "../../hooks/useSendOtp";

interface LoginFormValues {
  phoneNumber: string;
  password: string;
  otp: string;
}

const validationSchema = Yup.object({
  phoneNumber: Yup.string()
    .min(10, "Invalid phone number")
    .required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const user = useUser();
  const { sendOtp, loading: otpLoading } = useSendOtp();

  useEffect(() => {
    if (user) {
      if (user.hasDefaultPassword) {
        navigate("/reset-password", {
          state: {
            phoneNumber: user.phoneNumber,
          },
        });
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  const initialValues: LoginFormValues = {
    phoneNumber: "",
    password: "",
    otp: "",
  };

  const handleSubmit = async (values: any, actions: any) => {
    try {
      await loginMutation.mutateAsync(values);
      actions.setSubmitting(false);
      toast({
        description: "Login Successful",
        position: "top-right",
        duration: 2500,
        status: "success",
        isClosable: true,
      });
      // Navigation will be handled by useEffect when user is updated
    } catch (error) {
      toast({
        description: "Login Failed",
        position: "top-right",
        duration: 2500,
        status: "error",
        isClosable: true,
      });
    }
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
            <Heading textAlign="center" mb="1.5em">
              Login
            </Heading>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched, values }) => (
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
                          placeholder="020 123 4567"
                        />
                        <FormErrorMessage>
                          {errors.phoneNumber}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field }: any) => (
                      <FormControl
                        isInvalid={!!(errors.password && touched.password)}
                        mb={2}
                      >
                        <FormLabel
                          textStyle="formLabel"
                          htmlFor="password"
                          fontSize="10px"
                        >
                          Password
                        </FormLabel>
                        <InputGroup>
                          <Input
                            {...field}
                            id="password"
                            placeholder="******"
                            type={showPassword ? "text" : "password"}
                          />
                          <InputRightElement
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            <Icon as={showPassword ? ViewOffIcon : ViewIcon} />
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Flex justify="flex-end" mb="1.5em">
                    <Button
                      variant="link"
                      color="#118524"
                      fontSize="small"
                      textDecoration="underline"
                      isLoading={otpLoading}
                      onClick={() => sendOtp(values.phoneNumber)}
                    >
                      Send OTP
                    </Button>
                  </Flex>
                  <Field name="otp">
                    {({ field }: any) => (
                      <FormControl mb="2.5em">
                        <FormLabel textStyle="formLabel" fontSize="10px">
                          Enter OTP
                        </FormLabel>
                        <Input {...field} id="otp" />
                        <FormErrorMessage>{errors.otp}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Flex align="center">
                    <Button
                      type="submit"
                      color="white"
                      bgColor="#F3705A"
                      isLoading={isSubmitting}
                      w="150px"
                      _hover={{ bgColor: "#EC4A2F" }}
                    >
                      Login
                    </Button>
                    <Link to="/send-otp" style={{ textDecoration: "none" }}>
                      <Text color="#118524" fontSize="14px" ml="1em">
                        Forgot Password?
                      </Text>
                    </Link>
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

export default Login;
