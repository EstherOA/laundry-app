import { ArrowBackIcon, SmallAddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  IconButton,
  Input,
  Select,
  SimpleGrid,
  Text,
  useToast,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { addDays, format } from "date-fns";
import * as Yup from "yup";
import staff from "../../api/staff";
import services from "../../api/services";
import { useQuery } from "@tanstack/react-query";
import { OrderFormValues, OrderItem, Service, Staff } from "../../utils/types";
import orders from "../../api/orders";
import { useUser } from "../../hooks";

const orderItemSchema = Yup.object({
  itemName: Yup.string().required("Item Name is required"),
  serviceType: Yup.string().required("Service Type is required"),
  quantity: Yup.string().required("Quantity is required"),
  price: Yup.string().required("Price is required"),
});

const orderMainSchema = Yup.object({
  processedBy: Yup.string().required("Employee is required"),
  customerFirstName: Yup.string().required("First Name is required"),
  customerLastName: Yup.string().required("Last Name is required"),
  customerPhoneNumber: Yup.string().required("Phone Number is required"),
  address: Yup.string().required("Address is required"),
  landmark: Yup.string().required("Landmark is required"),
  deliveryNotes: Yup.string(),
  totalAmount: Yup.number(),
  dueDate: Yup.string().required("Due Date is required"),
});

const OrderItemEntry = ({
  handleChange,
  item,
}: {
  handleChange: (id: number, updatedItem: OrderItem) => void;
  item: OrderItem;
}) => {
  const [serviceList, setServiceList] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const allServices = await services.getServices(token!);
        setServiceList(allServices);
      } catch (error) {
        console.error("error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const getServiceTypes = () => {
    if (!selectedService) return ["Washing", "Dry Cleaning", "Ironing"];

    const foundItem = serviceList.find((item) => item._id === selectedService);

    const allItemEntries = serviceList.filter(
      (service) => service.itemName === foundItem?.itemName
    );

    return allItemEntries.map((items) => items.serviceType);
  };

  const getItemPrice = (values: OrderItem) => {
    const { quantity, serviceType, serviceId } = values;

    if (!serviceId.length || !serviceType.length) return "";

    const foundItem = serviceList.find(
      (service) =>
        service._id === serviceId && service.serviceType === serviceType
    );

    const basePrice = foundItem?.price ?? 0;
    return (basePrice * Number(quantity)).toString();
  };

  return (
    <Formik
      initialValues={item}
      validationSchema={orderItemSchema}
      onSubmit={() => {}}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form>
          <SimpleGrid columns={4} gap={10}>
            <Field name="serviceId">
              {({ field }: any) => (
                <FormControl
                  isInvalid={!!(errors.serviceId && touched.serviceId)}
                >
                  <FormLabel
                    htmlFor="serviceId"
                    fontSize="10px"
                    textStyle="formLabel"
                  >
                    Item Name
                  </FormLabel>
                  <Select
                    {...field}
                    h="32px"
                    fontSize="14px"
                    id="serviceId"
                    placeholder="Select item"
                    onChange={async (e) => {
                      const serviceId = e.target.value;
                      const selectedIndex = e.target.selectedIndex;
                      const itemName = e.target.options[selectedIndex].text;

                      await setFieldValue("serviceId", serviceId);

                      const updatedPrice = getItemPrice({
                        ...values,
                        serviceId,
                      });

                      setSelectedService(serviceId);
                      handleChange(item.id, {
                        ...item,
                        serviceId,
                        price: updatedPrice,
                        itemName,
                      });
                      await setFieldValue("price", updatedPrice);
                    }}
                    textTransform="capitalize"
                  >
                    {serviceList.map((service) => (
                      <option value={service._id} key={service._id}>
                        {service.itemName}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{errors.serviceId}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="serviceType">
              {({ field }: any) => (
                <FormControl
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
                    h="32px"
                    fontSize="14px"
                    placeholder="Select service type"
                    onChange={async (e) => {
                      const serviceType = e.target.value;
                      await setFieldValue("serviceType", serviceType);
                      const updatedPrice = getItemPrice({
                        ...values,
                        serviceType,
                      });

                      handleChange(item.id, {
                        ...item,
                        serviceType,
                        price: updatedPrice,
                      });
                      await setFieldValue("price", updatedPrice);
                    }}
                  >
                    {getServiceTypes().map((service) => (
                      <option value={service} key={service}>
                        {service}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{errors.serviceType}</FormErrorMessage>
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
                  <Input
                    {...field}
                    id="quantity"
                    h="32px"
                    type="number"
                    onChange={async (e) => {
                      const quantity = e.target.value;
                      await setFieldValue("quantity", quantity);
                      const updatedPrice = getItemPrice({
                        ...values,
                        quantity,
                      });

                      handleChange(item.id, {
                        ...item,
                        quantity,
                        price: updatedPrice,
                      });
                      await setFieldValue("price", updatedPrice);
                    }}
                  />
                  <FormErrorMessage>{errors.quantity}</FormErrorMessage>
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
                  <Input
                    {...field}
                    id="price"
                    h="32px"
                    type="number"
                    value={getItemPrice(values)}
                    readOnly
                  />
                  <FormErrorMessage>{errors.price}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </SimpleGrid>
        </Form>
      )}
    </Formik>
  );
};

const CreateOrder = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { data: token } = useQuery<string>({ queryKey: ["userToken"] });
  const user = useUser();

  const initialValues: OrderFormValues = {
    totalAmount: 0,
    processedBy: "",
    customerFirstName: "",
    customerLastName: "",
    customerPhoneNumber: "",
    address: "",
    landmark: "",
    deliveryNotes: "",
    dueDate: format(new Date(), "yyyy-MM-dd"),
    orderId: Date.now().toString(),
  };

  const [items, setItems] = useState<OrderItem[]>([
    {
      id: 0,
      itemName: "",
      serviceId: "",
      serviceType: "",
      quantity: "1",
      price: "",
      duration: 1,
    },
  ]);
  const [staffList, setStaffList] = useState<Staff[]>([]);

  const handleAddItem = () => {
    const lastItem = items[items.length - 1];
    const { serviceId, quantity, serviceType, price } = lastItem;

    if (!serviceId || !quantity || !serviceType || !price) {
      toast({
        description: "Enter item details first",
        duration: 2000,
        isClosable: true,
        status: "error",
      });
      return;
    }

    setItems([
      ...items,
      {
        id: items.length,
        serviceId: "",
        itemName: "",
        serviceType: "",
        quantity: "1",
        price: "",
        duration: 1,
      },
    ]);
  };

  const handleChangeItem = useCallback((id: number, updatedItem: OrderItem) => {
    setItems((prevItems) => {
      return prevItems.map((item) => (item.id === id ? updatedItem : item));
    });
  }, []);

  const totalPrice = useMemo(
    () =>
      items.reduce((sum, currentItem) => (sum += Number(currentItem.price)), 0),
    [items]
  );

  const getTotalDuration = useCallback(() => {
    let dueDate = new Date();
    items.map((item) => {
      dueDate = addDays(dueDate, item.duration);
    });
    return format(dueDate, "yyyy-MM-dd");
  }, [items]);

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
  }, []);

  const handleSubmit = async (values: any, actions: any) => {
    try {
      const { customer, processedBy, ...rest } = values;

      const processedByStaff = staffList.find(
        (staff) => staff._id === processedBy
      );

      const payload = {
        ...rest,
        items,
        payments: [],
        paymentStatus: "none",
        invoiceId: `INV${Math.floor(Math.random() * 100000)}-${Math.floor(
          Math.random() * 1000
        )}`,
        customer: {
          firstName: values.customerFirstName,
          lastName: values.customerLastName,
          phoneNumber: values.customerPhoneNumber,
          address: values.address,
          deliveryNotes: values.deliveryNotes,
          landmark: values.landmark,
        },
        orderStatus: "pending",
        recordedBy: {
          name: `${user.firstName} ${user.lastName}`,
          staffId: user._id,
        },
        processedBy: {
          name: processedByStaff
            ? `${processedByStaff.firstName} ${processedByStaff.lastName}`
            : "",
          staffId: processedBy,
        },
      };
      const res = await orders.addOrder(token!, payload);

      actions.setSubmitting(false);
      toast({
        description: "Order created successfully",
        position: "top-right",
        duration: 2500,
        status: "success",
        isClosable: true,
      });
      navigate("/orders");
    } catch (error) {
      toast({
        description: "Failed to create order",
        duration: 2500,
        isClosable: true,
        status: "error",
      });
      console.error("error creating order:", error);
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
            navigate("/orders");
          }}
          cursor="pointer"
        />
        <Text textStyle="h1">Create New Order</Text>
      </Flex>
      <Text textAlign="center" textStyle="h2" mb="32px">
        Order Details
      </Text>
      <Flex gap={2} flexDir="column">
        {items.map((item) => (
          <OrderItemEntry
            key={item.id}
            handleChange={handleChangeItem}
            item={item}
          />
        ))}
      </Flex>
      <Flex justifyContent="flex-end" mt={4} mb="48px">
        <IconButton
          aria-label="Add New Item"
          boxSize="24px"
          px={0}
          minW="unset"
          borderRadius="4px"
          _hover={{ backgroundColor: "#2A3C9B" }}
          as={SmallAddIcon}
          color="white"
          onClick={handleAddItem}
          backgroundColor="#1A7DDB"
        />
      </Flex>
      <Formik
        initialValues={initialValues}
        validationSchema={orderMainSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Box>
              <SimpleGrid columns={4} gap={10}>
                <Flex flexDir="column" gap={1}>
                  <Text textStyle="formLabel">Total Price</Text>
                  <Input
                    h="32px"
                    id="totalAmount"
                    name="totalAmount"
                    type="number"
                    value={totalPrice}
                    readOnly
                  />
                </Flex>
                <Field name="processedBy">
                  {({ field }: any) => (
                    <FormControl
                      isInvalid={!!(errors.processedBy && touched.processedBy)}
                    >
                      <FormLabel
                        htmlFor="processedBy"
                        fontSize="10px"
                        textStyle="formLabel"
                      >
                        Processed By
                      </FormLabel>
                      <Select
                        {...field}
                        h="32px"
                        fontSize="14px"
                        id="processedBy"
                        placeholder="Select employee"
                      >
                        {staffList.map((staff) => (
                          <option
                            value={staff._id}
                            key={staff._id}
                          >{`${staff.firstName} ${staff.lastName}`}</option>
                        ))}
                      </Select>
                      <FormErrorMessage>{errors.processedBy}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="dueDate">
                  {({ field }: any) => (
                    <FormControl
                      isInvalid={!!(errors.dueDate && touched.dueDate)}
                    >
                      <FormLabel
                        htmlFor="dueDate"
                        fontSize="10px"
                        textStyle="formLabel"
                      >
                        Due Date
                      </FormLabel>
                      <Input
                        {...field}
                        value={getTotalDuration()}
                        id="dueDate"
                        type="date"
                        h="32px"
                      />
                      <FormErrorMessage>{errors.dueDate}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </SimpleGrid>
            </Box>
            <Box>
              <Text textAlign="center" textStyle="h2" mt="56px" mb="32px">
                Customer Details
              </Text>
              <SimpleGrid columns={4} gap={10}>
                <Field name="customerFirstName">
                  {({ field }: any) => (
                    <FormControl
                      isInvalid={
                        !!(
                          errors.customerFirstName && touched.customerFirstName
                        )
                      }
                    >
                      <FormLabel
                        htmlFor="customerFirstName"
                        fontSize="10px"
                        textStyle="formLabel"
                      >
                        First Name
                      </FormLabel>
                      <Input {...field} id="customerFirstName" />
                      <FormErrorMessage>
                        {errors.customerFirstName}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="customerLastName">
                  {({ field }: any) => (
                    <FormControl
                      isInvalid={
                        !!(errors.customerLastName && touched.customerLastName)
                      }
                    >
                      <FormLabel
                        htmlFor="customerLastName"
                        fontSize="10px"
                        textStyle="formLabel"
                      >
                        Last Name
                      </FormLabel>
                      <Input {...field} id="customerLastName" />
                      <FormErrorMessage>
                        {errors.customerLastName}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="customerPhoneNumber">
                  {({ field }: any) => (
                    <FormControl
                      isInvalid={
                        !!(
                          errors.customerPhoneNumber &&
                          touched.customerPhoneNumber
                        )
                      }
                    >
                      <FormLabel
                        htmlFor="customerPhoneNumber"
                        fontSize="10px"
                        textStyle="formLabel"
                      >
                        Phone Number
                      </FormLabel>
                      <Input {...field} id="customerPhoneNumber" />
                      <FormErrorMessage>
                        {errors.customerPhoneNumber}
                      </FormErrorMessage>
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
              </SimpleGrid>
              <SimpleGrid columns={4} gap={10} mt={10}>
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
                      <Input {...field} id="landmark" />
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
                      <Input {...field} id="deliveryNotes" />
                      <FormErrorMessage>
                        {errors.deliveryNotes}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </SimpleGrid>
            </Box>
            <Flex justifyContent="flex-end" mt={10}>
              <Button
                isLoading={isSubmitting}
                type="submit"
                bgColor="#43BE57"
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

export default CreateOrder;
