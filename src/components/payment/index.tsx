import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { FileUpload } from "..";
import {
  useAddPayment,
  useStaff,
  useUpdateOrderPaymentStatus,
} from "../../hooks";
import { useParams } from "react-router-dom";
import { PaymentFormValues, Staff } from "../../utils/types";
import { Order } from "../../utils/types";
import { log } from "console";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: Order;
}

const validationSchema = Yup.object({
  mode: Yup.string().required("Payment mode is required"),
  amount: Yup.number().required("Amount is required"),
  sender: Yup.string().required("Sender is required"),
  senderPhoneNumber: Yup.string().required("Sender Phone Number is required"),
  processedBy: Yup.string().required("Employee is required"),
});

const PaymentModal = ({ isOpen, onClose, orderDetails }: PaymentModalProps) => {
  const toast = useToast();
  const { orderId } = useParams();
  const { data: staffList = [] } = useStaff();
  const addPaymentMutation = useAddPayment();
  const updateOrderPaymentStatusMutation = useUpdateOrderPaymentStatus();

  const initialValues: PaymentFormValues = {
    mode: "cash",
    amount: 0,
    sender: "",
    processedBy: "",
    senderPhoneNumber: "",
    receipt: "",
  };

  const handleSubmit = async (
    values: PaymentFormValues,
    actions: FormikHelpers<PaymentFormValues>
  ) => {
    try {
      const processedByStaff = staffList.find(
        (staff: Staff) => staff._id === values.processedBy
      );

      const paymentData = {
        ...values,
        processedBy: {
          staffId: values.processedBy,
          name: processedByStaff
            ? `${processedByStaff.firstName} ${processedByStaff.lastName}`
            : "",
        },
      };

      const totalPaid = orderDetails.payments.reduce((acc, curr) => {
        return acc + curr.amount;
      }, 0);

      const paymentStatus =
        Number(orderDetails.totalAmount) > values.amount + totalPaid
          ? "partial"
          : "full";

      // Add the payment
      await addPaymentMutation.mutateAsync({
        id: orderId!,
        data: paymentData as any, // Type assertion needed due to API mismatch
      });

      // Update the order's payment status
      await updateOrderPaymentStatusMutation.mutateAsync({
        id: orderId!,
        paymentStatus,
      });

      actions.setSubmitting(false);
      toast({
        description: "Payment added successfully",
        position: "top-right",
        duration: 2500,
        status: "success",
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        description: "Failed to add payment",
        duration: 2500,
        isClosable: true,
        status: "error",
      });
      console.error("error adding payment:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Payment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <Field name="mode">
                  {({ field }: any) => (
                    <FormControl isInvalid={!!(errors.mode && touched.mode)}>
                      <FormLabel
                        htmlFor="mode"
                        fontSize="10px"
                        textStyle="formLabel"
                      >
                        Payment Mode
                      </FormLabel>
                      <Select
                        {...field}
                        id="mode"
                        h="40px"
                        fontSize="14px"
                        placeholder="Select payment mode"
                      >
                        <option value="momo">Momo</option>
                        <option value="cash">Cash</option>
                      </Select>
                      <FormErrorMessage>{errors.mode}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="amount">
                  {({ field }: any) => (
                    <FormControl
                      mt={5}
                      isInvalid={!!(errors.amount && touched.amount)}
                    >
                      <FormLabel
                        htmlFor="amount"
                        fontSize="10px"
                        textStyle="formLabel"
                      >
                        Amount
                      </FormLabel>
                      <Input
                        {...field}
                        id="amount"
                        type="number"
                        min={0.01}
                        step="0.01"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "" || parseFloat(value) >= 0.01) {
                            field.onChange(e);
                          }
                        }}
                      />
                      <FormErrorMessage>{errors.amount}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="sender">
                  {({ field }: any) => (
                    <FormControl
                      mt={5}
                      isInvalid={!!(errors.sender && touched.sender)}
                    >
                      <FormLabel
                        htmlFor="sender"
                        fontSize="10px"
                        textStyle="formLabel"
                      >
                        Sender
                      </FormLabel>
                      <Input {...field} id="sender" />
                      <FormErrorMessage>{errors.sender}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="senderPhoneNumber">
                  {({ field }: any) => (
                    <FormControl
                      mt={5}
                      isInvalid={
                        !!(
                          errors.senderPhoneNumber && touched.senderPhoneNumber
                        )
                      }
                    >
                      <FormLabel
                        htmlFor="senderPhoneNumber"
                        fontSize="10px"
                        textStyle="formLabel"
                      >
                        Sender Phone Number
                      </FormLabel>
                      <Input {...field} id="senderPhoneNumber" />
                      <FormErrorMessage>
                        {errors.senderPhoneNumber}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="processedBy">
                  {({ field }: any) => (
                    <FormControl
                      mt={5}
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
                        id="processedBy"
                        h="40px"
                        fontSize="14px"
                        placeholder="Select employee"
                      >
                        {staffList.map((staff: Staff) => (
                          <option
                            value={staff._id}
                            key={staff._id}
                          >{`${staff.firstName} ${staff.lastName}`}</option>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </Field>
                <Field name="proofUrl">
                  {({ field }: any) => (
                    <FormControl mt={5}>
                      <FormLabel
                        htmlFor="proofUrl"
                        fontSize="10px"
                        textStyle="formLabel"
                      >
                        Proof of Payment
                      </FormLabel>
                      <FileUpload
                        {...field}
                        id="proofUrl"
                        type="file"
                        multiple={false}
                      />
                    </FormControl>
                  )}
                </Field>
                <Flex mt={10} gap={8} mb={4}>
                  <Button
                    bgColor="#FF0000"
                    _hover={{ bgColor: "#8C0000" }}
                    color="white"
                    w="100%"
                  >
                    Cancel
                  </Button>
                  <Button
                    w="100%"
                    bgColor="#43BE57"
                    _hover={{ bgColor: "#007B23" }}
                    color="white"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Submit
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;
