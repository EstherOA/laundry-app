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
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import services from "../../api/services";
import { useQuery } from "@tanstack/react-query";

interface ServiceFormValues {
  itemName: string;
  serviceType: string;
  duration: number;
  price: number;
  quantity: number;
  description: string;
}

const validationSchema = Yup.object({
  itemName: Yup.string().required("Item name is required"),
  serviceType: Yup.string().required("Service Type is required"),
  duration: Yup.number().required("Average Duration is required"),
});

const CreateService = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  const initialValues = {
    itemName: "",
    serviceType: "",
    duration: 1,
    price: 0,
    quantity: 1,
    description: "",
  };

  const handleSubmit = async (values: any, actions: any) => {
    try {
      console.log("values:", values);

      const res = await services.addService(token!, values);
      console.log("added service:", res);

      actions.setSubmitting(false);
      toast({
        description: "Service Created Successfully",
        position: "top-right",
        duration: 2500,
        status: "success",
        isClosable: true,
      });
      navigate("/services");
    } catch (error) {
      toast({
        description: "Failed to create service",
        duration: 2500,
        isClosable: true,
        status: "error",
      });
      console.error("error creating service:", error);
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
            navigate("/services");
          }}
          cursor="pointer"
        />
        <Text textStyle="h1">Add New Service</Text>
      </Flex>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Field name="itemName">
              {({ field }: any) => (
                <FormControl
                  isInvalid={!!(errors.itemName && touched.itemName)}
                >
                  <FormLabel
                    htmlFor="itemName"
                    fontSize="10px"
                    textStyle="formLabel"
                  >
                    Item Name
                  </FormLabel>
                  <Input {...field} id="itemName" />
                  <FormErrorMessage>{errors.itemName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="serviceType">
              {({ field }: any) => (
                <FormControl
                  mt={10}
                  isInvalid={!!(errors.serviceType && touched.serviceType)}
                >
                  <FormLabel
                    htmlFor="serviceType"
                    fontSize="10px"
                    textStyle="formLabel"
                  >
                    Service Type
                  </FormLabel>
                  <Select
                    {...field}
                    id="serviceType"
                    h="40px"
                    fontSize="14px"
                    placeholder="Select service type"
                  >
                    <option value="option1">Washing</option>
                    <option value="option2">Dry Cleaning</option>
                    <option value="option3">Ironing</option>
                  </Select>
                  <FormErrorMessage>{errors.serviceType}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="price">
              {({ field }: any) => (
                <FormControl
                  mt={10}
                  isInvalid={!!(errors.price && touched.price)}
                >
                  <FormLabel
                    htmlFor="price"
                    fontSize="10px"
                    textStyle="formLabel"
                  >
                    Price
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement left="12px">GHS</InputLeftElement>
                    <Input
                      {...field}
                      id="price"
                      type="number"
                      paddingLeft="56px"
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.price}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="duration">
              {({ field }: any) => (
                <FormControl
                  mt={10}
                  isInvalid={!!(errors.duration && touched.duration)}
                >
                  <FormLabel
                    htmlFor="duration"
                    fontSize="10px"
                    textStyle="formLabel"
                  >
                    Average Duration
                  </FormLabel>
                  <InputGroup>
                    <Input {...field} id="duration" type="number" min={0} />
                    <InputRightElement mr={4}>Day(s)</InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.duration}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="description">
              {({ field }: any) => (
                <FormControl
                  mt={10}
                  isInvalid={!!(errors.description && touched.description)}
                >
                  <FormLabel
                    htmlFor="description"
                    fontSize="10px"
                    textStyle="formLabel"
                  >
                    Description
                  </FormLabel>
                  <Textarea {...field} id="description" />
                  <FormErrorMessage>{errors.description}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Flex justifyContent="flex-end" mt={10}>
              <Button
                type="submit"
                bgColor="#43BE57"
                _hover={{ bgColor: "#007B23" }}
                color="white"
                isLoading={isSubmitting}
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

export default CreateService;
