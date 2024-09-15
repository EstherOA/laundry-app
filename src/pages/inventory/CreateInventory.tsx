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
  Select,
  SimpleGrid,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useQuery } from "@tanstack/react-query";
import inventory from "../../api/inventory";
import { FileUpload } from "../../components";
import staff from "../../api/staff";
import { useEffect, useState } from "react";
import { InventoryFormValues, Staff } from "../../utils/types";
import { format } from "date-fns";

const validationSchema = Yup.object({
  itemName: Yup.string().required("Item Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required"),
  quantity: Yup.number().required("Quantity is required").min(1),
  purchasedBy: Yup.string().required("Purchased By is required"),
  vendor: Yup.string().required("Vendor is required"),
  datePurchased: Yup.string().required("Date Purchased is required"),
  paymentMode: Yup.string().required("Payment Mode is required"),
  paymentReceipt: Yup.string(),
});

const CreateInventory = () => {
  const navigate = useNavigate();

  const toast = useToast();
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  const [staffList, setStaffList] = useState<Staff[]>([]);

  const initialValues: InventoryFormValues = {
    itemName: "",
    description: "",
    price: 0,
    quantity: 1,
    purchasedBy: "",
    paymentMode: "cash",
    paymentReceipt: "",
    status: "in-stock",
    datePurchased: format(new Date(), "yyyy-MM-dd"),
    vendor: "",
    itemId: Date.now().toString(),
  };

  const handleSubmit = async (values: any, actions: any) => {
    try {
      const found = staffList.find((sf) => sf._id === values.purchasedBy);
      const foundName = found ? `${found.firstName} ${found.lastName}` : "";

      const payload = {
        ...values,
        purchasedBy: {
          staffId: values.purchasedBy,
          name: foundName,
        },
      };
      const res = await inventory.addItem(token!, payload);
      console.log("added item:", res);

      actions.setSubmitting(false);
      toast({
        description: "Inventory updated successfully",
        position: "top-right",
        duration: 2500,
        status: "success",
        isClosable: true,
      });
      navigate("/inventory");
    } catch (error) {
      toast({
        description: "Failed to add inventory item",
        duration: 2500,
        isClosable: true,
        status: "error",
      });
      console.error("error adding inventory item:", error);
    }
  };

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const allStaff = await staff.getStaff(token!);
        setStaffList(allStaff);
      } catch (error) {
        console.error("error fetching staff:", error);
      }
    };
    fetchStaff();
  }, [token]);

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
            navigate("/inventory");
          }}
          cursor="pointer"
        />
        <Text textStyle="h1">Add New Item</Text>
      </Flex>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <SimpleGrid columns={3} gap={10} mt={10}>
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
              <Field name="price">
                {({ field }: any) => (
                  <FormControl isInvalid={!!(errors.price && touched.price)}>
                    <FormLabel
                      htmlFor="price"
                      fontSize="10px"
                      textStyle="formLabel"
                    >
                      Price
                    </FormLabel>
                    <Input {...field} id="price" />
                    <FormErrorMessage>{errors.price}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="quantity">
                {({ field }: any) => (
                  <FormControl
                    isInvalid={!!(errors.quantity && touched.quantity)}
                  >
                    <FormLabel
                      htmlFor="quantity"
                      fontSize="10px"
                      textStyle="formLabel"
                    >
                      Quantity
                    </FormLabel>
                    <Input {...field} id="quantity" />
                    <FormErrorMessage>{errors.quantity}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="purchasedBy">
                {({ field }: any) => (
                  <FormControl
                    isInvalid={!!(errors.purchasedBy && touched.purchasedBy)}
                  >
                    <FormLabel
                      htmlFor="purchasedBy"
                      fontSize="10px"
                      textStyle="formLabel"
                    >
                      Purchased By
                    </FormLabel>
                    <Select
                      h="40px"
                      {...field}
                      id="purchasedBy"
                      fontSize="14px"
                      placeholder="Select buyer"
                    >
                      {staffList.map((staff) => (
                        <option
                          value={staff._id}
                          key={staff._id}
                        >{`${staff.firstName} ${staff.lastName}`}</option>
                      ))}
                    </Select>
                    <FormErrorMessage>{errors.purchasedBy}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="vendor">
                {({ field }: any) => (
                  <FormControl isInvalid={!!(errors.vendor && touched.vendor)}>
                    <FormLabel
                      htmlFor="vendor"
                      fontSize="10px"
                      textStyle="formLabel"
                    >
                      Vendor
                    </FormLabel>
                    <Input {...field} id="vendor" />
                    <FormErrorMessage>{errors.vendor}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="datePurchased">
                {({ field }: any) => (
                  <FormControl
                    isInvalid={!!(errors.datePurchased && touched.vendor)}
                  >
                    <FormLabel
                      htmlFor="datePurchased"
                      fontSize="10px"
                      textStyle="formLabel"
                    >
                      Date Purchased
                    </FormLabel>
                    <Input {...field} id="datePurchased" type="date" />
                  </FormControl>
                )}
              </Field>
              <Field name="paymentMode">
                {({ field }: any) => (
                  <FormControl
                    isInvalid={!!(errors.paymentMode && touched.paymentMode)}
                  >
                    <FormLabel
                      htmlFor="paymentMode"
                      fontSize="10px"
                      textStyle="formLabel"
                    >
                      Payment Mode
                    </FormLabel>
                    <Select
                      h="40px"
                      {...field}
                      id="paymentMode"
                      fontSize="14px"
                      placeholder="Select payment mode"
                    >
                      <option value="momo">Momo</option>
                      <option value="cash">Cash</option>
                    </Select>
                    <FormErrorMessage>{errors.paymentMode}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="description">
                {({ field }: any) => (
                  <FormControl
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
              <Field name="paymentReceipt">
                {({ field }: any) => (
                  <FormControl>
                    <FormLabel
                      htmlFor="paymentReceipt"
                      fontSize="10px"
                      textStyle="formLabel"
                    >
                      Receipt
                    </FormLabel>
                    <FileUpload
                      {...field}
                      id="paymentReceipt"
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

export default CreateInventory;
