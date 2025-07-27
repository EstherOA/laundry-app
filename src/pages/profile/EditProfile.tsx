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
import { ArrowBackIcon, RepeatIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useQuery } from "@tanstack/react-query";
import staff from "../../api/staff";
import { StaffFormValues } from "../../utils/types";
import { format } from "date-fns";
import { FileUpload } from "../../components";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  phoneNumber: Yup.string()
    .min(10, "Invalid phone number")
    .required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  dateCommenced: Yup.date().required("Date commenced is required"),
  ssnit: Yup.string().required("SSNIT is required"),
  tin: Yup.string().required("TIN is required"),
  shift: Yup.string().required("Shift is required"),
});

const EditProfile = () => {
  const {
    state: { profile },
  } = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  const handleSubmit = async (values: any, actions: any) => {
    try {
      const res = await staff.editStaff(token!, profile._id, {
        ...values,
        password: profile.hasDefaultPassword ? values.password : undefined,
      });

      actions.setSubmitting(false);
      toast({
        description: "Profile edited successfully",
        position: "top-right",
        duration: 2500,
        status: "success",
        isClosable: true,
      });
      navigate(-1);
    } catch (error) {
      toast({
        description: "Failed to edit profile",
        duration: 2500,
        isClosable: true,
        status: "error",
      });
      console.error("error editing profile:", error);
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
            navigate("/profile");
          }}
          cursor="pointer"
        />
        <Text textStyle="h1">Edit Profile</Text>
      </Flex>
      <Formik
        initialValues={{
          ...(profile as StaffFormValues),
          password: profile.hasDefaultPassword ? profile.password : "N/A",
          dateCommenced: format(new Date(profile.dateCommenced), "yyyy-MM-dd"),
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
            </SimpleGrid>
            {/* <Box>
              <Field name="file">
                {({ field }: any) => (
                  <FormControl>
                    <FormLabel
                      htmlFor="file"
                      fontSize="10px"
                      textStyle="formLabel"
                    >
                      Upload Files
                    </FormLabel>
                    <FileUpload
                      {...field}
                      id="file"
                      type="file"
                      multiple={true}
                    />
                  </FormControl>
                )}
              </Field>
            </Box> */}
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

export default EditProfile;
