import { useState } from "react";
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
import { useLogin } from "../../hooks";
import { useQueryClient } from "@tanstack/react-query";

interface FormValues {
  phoneNumber: string;
  password: string;
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
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values: any, actions: any) => {
    try {
      const token = await loginMutation.mutateAsync(values);
      queryClient.setQueryData(["userToken"], token);

      actions.setSubmitting(false);
      toast({
        description: "Login Successful",
        position: "top-right",
        duration: 2500,
        status: "success",
        isClosable: true,
      });
      navigate("/");
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
            <Heading textAlign="center" mb="1.5em">
              Login
            </Heading>
            <Formik
              initialValues={{
                phoneNumber: "",
                password: "",
                otp: "",
              }}
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
                  <Flex>
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
