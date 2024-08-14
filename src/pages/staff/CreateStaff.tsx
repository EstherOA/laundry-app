import { ArrowBackIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  IconButton,
  Input,
  Select,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useQuery } from "@tanstack/react-query";
import staff from "../../api/staff";

interface StaffFormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  password: string;
  role: string;
  dateCommenced: Date;
  ssnit: string;
  tin: string;
  salary: number;
  shift: string;
  contract: string;
}

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  phoneNumber: Yup.string()
    .min(10, "Invalid phone number")
    .required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .required("Password is required"),
  address: Yup.string().required("Address is required"),
  role: Yup.string().required("Role is required"),
  dateCommenced: Yup.date().required("Date commenced is required"),
  ssnit: Yup.string().required("SSNIT is required"),
  tin: Yup.string().required("TIN is required"),
  salary: Yup.number().required("Salary is required"),
  shift: Yup.string().required("Shift is required"),
});

const CreateStaff = () => {
  const navigate = useNavigate();

  const toast = useToast();
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  const initialValues: StaffFormValues = {
    firstName: "",
    lastName: "",
    address: "",
    password: "",
    phoneNumber: "",
    role: "",
    ssnit: "",
    tin: "",
    shift: "",
    salary: 0,
    dateCommenced: new Date(),
    contract: "",
  };

  const handleSubmit = async (values: any, actions: any) => {
    try {
      const res = await staff.addStaff(token!, values);
      console.log("added employee:", res);

      actions.setSubmitting(false);
      toast({
        description: "Employee added successfully",
        position: "top-right",
        duration: 2500,
        status: "success",
        isClosable: true,
      });
      navigate("/staff");
    } catch (error) {
      toast({
        description: "Failed to add employee",
        duration: 2500,
        isClosable: true,
        status: "error",
      });
      console.error("error adding employee:", error);
    }
  };

  return (
    <Box mx="32px" mt="48px" boxShadow="md" px={7} pt={5} pb={7}>
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
            navigate("/customers");
          }}
          cursor="pointer"
        />
        <Text textStyle="h1">Add New Employee</Text>
      </Flex>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <SimpleGrid columns={4} gap={10} mt={10}>
              <Field name="firstName">
                {({ field }: any) => (
                  <FormControl
                    isInvalid={!!(errors.firstName && touched.firstName)}
                  >
                    <FormLabel
                      htmlFor="firstName"
                      fontSize="10px"
                      textStyle="formLabel"
                    >
                      First Name
                    </FormLabel>
                    <Input {...field} id="firstName" />
                    <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="lastName">
                {({ field }: any) => (
                  <FormControl
                    isInvalid={!!(errors.lastName && touched.lastName)}
                  >
                    <FormLabel
                      htmlFor="lastName"
                      fontSize="10px"
                      textStyle="formLabel"
                    >
                      Last Name
                    </FormLabel>
                    <Input {...field} id="lastName" />
                    <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="phoneNumber">
                {({ field }: any) => (
                  <FormControl
                    isInvalid={!!(errors.phoneNumber && touched.phoneNumber)}
                  >
                    <Flex>
                      <FormLabel
                        htmlFor="phoneNumber"
                        fontSize="10px"
                        textStyle="formLabel"
                      >
                        Phone Number
                      </FormLabel>
                    </Flex>
                    <Input {...field} id="phoneNumber" />
                    <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field }: any) => (
                  <FormControl
                    isInvalid={!!(errors.password && touched.password)}
                  >
                    <Flex>
                      <FormLabel
                        htmlFor="password"
                        fontSize="10px"
                        textStyle="formLabel"
                      >
                        Password
                      </FormLabel>
                      <RepeatIcon />
                    </Flex>
                    <Input {...field} id="password" />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="address">
                {({ field }: any) => (
                  <FormControl
                    isInvalid={!!(errors.address && touched.address)}
                  >
                    <FormLabel
                      htmlFor="address"
                      fontSize="10px"
                      textStyle="formLabel"
                    >
                      Address
                    </FormLabel>
                    <Input {...field} id="address" />
                    <FormErrorMessage>{errors.address}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="role">
                {({ field }: any) => (
                  <FormControl isInvalid={!!(errors.role && touched.role)}>
                    <FormLabel
                      htmlFor="role"
                      fontSize="10px"
                      textStyle="formLabel"
                    >
                      Role
                    </FormLabel>
                    <Select
                      h="40px"
                      {...field}
                      id="role"
                      fontSize="14px"
                      placeholder="Select role"
                    >
                      <option value="option1">Admin</option>
                      <option value="option2">Employee</option>
                    </Select>
                    <FormErrorMessage>{errors.role}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="dateCommenced">
                {({ field }: any) => (
                  <FormControl
                    isInvalid={
                      !!(errors.dateCommenced && touched.dateCommenced)
                    }
                  >
                    <FormLabel
                      htmlFor="dateCommenced"
                      fontSize="10px"
                      textStyle="formLabel"
                    >
                      Date Commenced
                    </FormLabel>
                    <Input {...field} id="dateCommenced" type="date" />
                  </FormControl>
                )}
              </Field>
              <Field name="ssnit">
                {({ field }: any) => (
                  <FormControl isInvalid={!!(errors.ssnit && touched.ssnit)}>
                    <FormLabel
                      htmlFor="ssnit"
                      fontSize="10px"
                      textStyle="formLabel"
                    >
                      SSNIT
                    </FormLabel>
                    <Input {...field} id="ssnit" />
                    <FormErrorMessage>{errors.ssnit}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="tin">
                {({ field }: any) => (
                  <FormControl isInvalid={!!(errors.tin && touched.tin)}>
                    <FormLabel
                      htmlFor="tin"
                      fontSize="10px"
                      textStyle="formLabel"
                    >
                      TIN
                    </FormLabel>
                    <Input {...field} id="tin" />
                    <FormErrorMessage>{errors.tin}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="salary">
                {({ field }: any) => (
                  <FormControl isInvalid={!!(errors.salary && touched.salary)}>
                    <FormLabel
                      htmlFor="salary"
                      fontSize="10px"
                      textStyle="formLabel"
                    >
                      Salary
                    </FormLabel>
                    <Input {...field} id="salary" />
                    <FormErrorMessage>{errors.salary}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="shift">
                {({ field }: any) => (
                  <FormControl isInvalid={!!(errors.shift && touched.shift)}>
                    <FormLabel
                      htmlFor="shift"
                      fontSize="10px"
                      textStyle="formLabel"
                    >
                      Shift Time
                    </FormLabel>
                    <Select
                      h="40px"
                      {...field}
                      id="shift"
                      fontSize="14px"
                      placeholder="Select shift"
                    >
                      <option value="option1">Even Days</option>
                      <option value="option2">Odd Days</option>
                    </Select>
                    <FormErrorMessage>{errors.shift}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="contract">
                {({ field }: any) => (
                  <FormControl>
                    <FormLabel
                      htmlFor="contract"
                      fontSize="10px"
                      textStyle="formLabel"
                    >
                      Contract
                    </FormLabel>
                    <Input {...field} id="contract" type="file" />
                  </FormControl>
                )}
              </Field>
            </SimpleGrid>
            <Flex justifyContent="flex-end" mt={10}>
              <Button
                bgColor="#43BE57"
                isLoading={isSubmitting}
                type="submit"
                _hover={{ bgColor: "#007B23" }}
                color="white"
              >
                Submit
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateStaff;
