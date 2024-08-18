import { Box, Flex, FlexProps, Text } from "@chakra-ui/react";
import { getColorSchemeByStatus } from "../../utils";

export type BadgeColorScheme = "red" | "orange" | "green" | "blue" | "grey";

interface CustomBadgeProps {
  title: string;
  withDot?: boolean;
  colorScheme?: BadgeColorScheme;
  badgeStyle?: FlexProps;
}

const getStyles = (colorScheme: BadgeColorScheme) => {
  switch (colorScheme) {
    case "red":
      return {
        containerStyle: {
          borderColor: "#EEB3B0",
          bgColor: "#FFF4F2",
        },
        dotStyle: { bgColor: "#F15950" },
        textStyle: { color: "#F15950" },
      };
    case "orange":
      return {
        containerStyle: {
          borderColor: "#FFD6A6",
          bgColor: "#FFF9F0",
        },
        dotStyle: { bgColor: "#FFB054" },
        textStyle: { color: "#FFB054" },
      };
    case "green":
      return {
        containerStyle: {
          borderColor: "#ABE49C",
          bgColor: "#DAFFD0",
        },
        dotStyle: { bgColor: "#28B53E" },
        textStyle: { color: "#28B53E" },
      };
    case "blue":
      return {
        containerStyle: {
          borderColor: "#A5CCEF",
          bgColor: "#DFF0FF",
        },
        dotStyle: { bgColor: "#1A7DDB" },
        textStyle: { color: "#1A7DDB" },
      };
    case "grey":
    default:
      return {
        containerStyle: {
          borderColor: "#BDBFC1",
          bgColor: "#EBEBEB",
        },
        dotStyle: { bgColor: "#84868B" },
        textStyle: { color: "#84868B" },
      };
  }
};

const CustomBadge = ({
  title,
  withDot,
  colorScheme,
  badgeStyle,
}: CustomBadgeProps) => {
  const { containerStyle, dotStyle, textStyle } = getStyles(
    colorScheme ?? getColorSchemeByStatus(title)
  );

  return (
    <Flex
      alignItems="center"
      justify="center"
      border="1px solid"
      {...containerStyle}
      px={2}
      width="fit-content"
      borderRadius="4px"
      {...badgeStyle}
    >
      {withDot && (
        <Box borderRadius="full" mr={1} boxSize="4px" {...dotStyle}></Box>
      )}
      <Text {...textStyle} whiteSpace="nowrap" textTransform="capitalize">
        {title.replace("-", " ")}
      </Text>
    </Flex>
  );
};

export default CustomBadge;
