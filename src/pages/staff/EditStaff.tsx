import { ArrowBackIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Select,
  SimpleGrid,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useQuery } from "@tanstack/react-query";
import staff from "../../api/staff";
import { FileUpload } from "../../components";
import { StaffFormValues } from "../../utils/types";
import { format } from "date-fns";
import { generateDefaultPassword } from "../../utils";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  phoneNumber: Yup.string()
    .min(10, "Invalid phone number")
    .required("Phone number is required"),
  password: Yup.string()
    .required("Password is required")
    .test(
      "password-validation",
      "Password must be at least 6 characters",
      (value) => value === "N/A" || value.length >= 6
    ),
  idNumber: Yup.string().required("ID Number is required"),
  address: Yup.string().required("Address is required"),
  role: Yup.string().required("Role is required"),
  dateCommenced: Yup.date().required("Date commenced is required"),
  ssnit: Yup.string().required("SSNIT is required"),
  tin: Yup.string().required("TIN is required"),
  salary: Yup.number().required("Salary is required"),
  shift: Yup.string().required("Shift is required"),
});

const EditStaff = () => {
  const {
    state: { staffDetails },
  } = useLocation();
  const navigate = useNavigate();

  const toast = useToast();
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  const handleSubmit = async (values: any, actions: any) => {
    try {
      const res = await staff.editStaff(token!, staffDetails._id, {
        ...values,
        password: staffDetails.hasDefaultPassword ? values.password : undefined,
      });

      actions.setSubmitting(false);
      toast({
        description: "Employee edited successfully",
        position: "top-right",
        duration: 2500,
        status: "success",
        isClosable: true,
      });
      navigate("/staff");
    } catch (error) {
      toast({
        description: "Failed to edit employee",
        duration: 2500,
        isClosable: true,
        status: "error",
      });
      console.error("error editing employee:", error);
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
            navigate("/staff");
          }}
          cursor="pointer"
        />
        <Text textStyle="h1">Edit Employee #{staffDetails.staffId}</Text>
      </Flex>
      <Formik
        initialValues={{
          ...(staffDetails as StaffFormValues),
          password: staffDetails.hasDefaultPassword
            ? staffDetails.password
            : "N/A",
          dateCommenced: format(
            new Date(staffDetails.dateCommenced),
            "yyyy-MM-dd"
          ),
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched, setFieldValue }) => (
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
                    <Flex align="center">
                      <FormLabel
                        mr={1}
                        htmlFor="password"
                        fontSize="10px"
                        textStyle="formLabel"
                      >
                        Initial Password
                      </FormLabel>
                      <IconButton
                        isDisabled={!staffDetails.hasDefaultPassword}
                        onClick={() =>
                          setFieldValue("password", generateDefaultPassword())
                        }
                        mb={2}
                        size="24px"
                        variant="ghost"
                        aria-label="reset password"
                      >
                        <RepeatIcon />
                      </IconButton>
                    </Flex>
                    <Input
                      {...field}
                      id="password"
                      readOnly={!staffDetails.hasDefaultPassword}
                    />
                    {typeof errors.password === "string" ? (
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    ) : Array.isArray(errors.password) ? (
                      errors.password.map((err, i) => (
                        <FormErrorMessage key={i}>
                          {err.toString()}
                        </FormErrorMessage>
                      ))
                    ) : null}
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
              <Field name="idNumber">
                {({ field }: any) => (
                  <FormControl
                    isInvalid={!!(errors.idNumber && touched.idNumber)}
                  >
                    <FormLabel
                      htmlFor="idNumber"
                      fontSize="10px"
                      textStyle="formLabel"
                    >
                      ID Number
                    </FormLabel>
                    <Input {...field} id="idNumber" />
                    <FormErrorMessage>{errors.idNumber}</FormErrorMessage>
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
                      <option value="admin">Admin</option>
                      <option value="employee">Employee</option>
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
                    <Textarea
                      {...field}
                      id="shift"
                      placeholder="Enter shift details"
                    />
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
                    <FileUpload
                      {...field}
                      id="contract"
                      type="file"
                      multiple={false}
                    />
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

export default EditStaff;
