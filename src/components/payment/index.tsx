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
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { FileUpload } from "..";

interface PaymentFormValues {
  mode: string;
  amount: number;
  sender: string;
  proofUrl: string;
  senderPhoneNumber: string;
  processedBy: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const validationSchema = Yup.object({});

const PaymentModal = ({ isOpen, onClose }: PaymentModalProps) => {
  const initialValues: PaymentFormValues = {
    mode: "",
    amount: 0,
    sender: "",
    proofUrl: "",
    processedBy: "",
    senderPhoneNumber: "",
  };

  const handleSubmit = () => {};

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
                      <Input {...field} id="amount" />
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
                        placeholder="Select payment mode"
                      >
                        <option value="momo">Momo</option>
                        <option value="cash">Cash</option>
                      </Select>
                      <FormErrorMessage>{errors.processedBy}</FormErrorMessage>
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
