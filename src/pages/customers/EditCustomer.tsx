import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useQuery } from "@tanstack/react-query";
import customers from "../../api/customers";

interface CustomerFormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  landmark: string;
  deliveryNotes: string;
}

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  phoneNumber: Yup.string()
    .min(10, "Invalid phone number")
    .required("Phone number is required"),
  address: Yup.string().required("Address is required"),
});

const EditCustomer = () => {
  const {
    state: { customerDetails },
  } = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  const handleSubmit = async (values: any, actions: any) => {
    try {
      const res = await customers.editCustomer(token!, "", values);

      actions.setSubmitting(false);
      toast({
        description: "Customer edited successfully",
        position: "top-right",
        duration: 2500,
        status: "success",
        isClosable: true,
      });
      navigate("/customers");
    } catch (error) {
      toast({
        description: "Failed to edit customer",
        duration: 2500,
        isClosable: true,
        status: "error",
      });
      console.error("error editing customer:", error);
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
        <Text textStyle="h1">Edit Customer #20</Text>
      </Flex>
      <Formik
        initialValues={customerDetails as CustomerFormValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <SimpleGrid columns={2} gap={10} mt={10}>
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
                    <FormLabel
                      htmlFor="phoneNumber"
                      fontSize="10px"
                      textStyle="formLabel"
                    >
                      Phone Number
                    </FormLabel>
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
              <Field name="landmark">
                {({ field }: any) => (
                  <FormControl
                    isInvalid={!!(errors.landmark && touched.landmark)}
                  >
                    <FormLabel
                      htmlFor="landmark"
                      fontSize="10px"
                      textStyle="formLabel"
                    >
                      Landmark
                    </FormLabel>
                    <Textarea {...field} id="landmark" />
                    <FormErrorMessage>{errors.landmark}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="deliveryNotes">
                {({ field }: any) => (
                  <FormControl
                    isInvalid={
                      !!(errors.deliveryNotes && touched.deliveryNotes)
                    }
                  >
                    <FormLabel
                      htmlFor="deliveryNotes"
                      fontSize="10px"
                      textStyle="formLabel"
                    >
                      Delivery Notes
                    </FormLabel>
                    <Textarea {...field} id="deliveryNotes" />
                    <FormErrorMessage>{errors.deliveryNotes}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </SimpleGrid>
            <Flex justifyContent="flex-end" mt={10}>
              <Button
                bgColor="#43BE57"
                type="submit"
                isLoading={isSubmitting}
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

export default EditCustomer;
