import {
  Box,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  useSteps,
  Stepper,
} from "@chakra-ui/react";

const steps = [
  {
    title: "Received",
    icon: "",
  },
  {
    title: "Processed",
    icon: "",
  },
  {
    title: "Complete",
    icon: "",
  },
  {
    title: "Delivered",
    icon: "",
  },
];

const OrderStepper = () => {
  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  return (
    <Stepper index={activeStep}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink="0">
            <StepTitle>{step.title}</StepTitle>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};

export default OrderStepper;
