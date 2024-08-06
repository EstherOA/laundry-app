import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import CustomerSvg from "../../assets/customer.svg";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box minH="100vh">
      <Grid templateColumns="repeat(2, 1fr)">
        <Flex
          bgColor="#1A7DDB"
          minH="100vh"
          pt="12em"
          flexDir="column"
          color="white"
          alignItems="center"
          gap="2.5em"
        >
          <Text>Laundry Logo</Text>
          <Text textStyle="h1" fontWeight={500}>
            Laundry Management System
          </Text>
          <Flex w="340px" h="230px">
            <Image src={CustomerSvg} w="100%" objectFit="cover" />
          </Flex>
        </Flex>
        <Box minH="100vh" pl="5em" pt="12em">
          <Box w="60%">
            <Heading textAlign="center" mb="1.5em">
              Login
            </Heading>
            <Flex flexDir="column" gap={1} mb="1.5em">
              <Text textStyle="formLabel">Phone Number</Text>
              <Input />
            </Flex>
            <Flex flexDir="column" gap={1} mb={2}>
              <Text textStyle="formLabel">Password</Text>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"} />
                <InputRightElement
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <Icon as={showPassword ? ViewOffIcon : ViewIcon} />
                </InputRightElement>
              </InputGroup>
            </Flex>
            <Flex justify="flex-end" mb="1.5em">
              <Button
                variant="link"
                color="#118524"
                fontSize="small"
                textDecoration="underline"
              >
                Send OTP
              </Button>
            </Flex>
            <Flex flexDir="column" gap={1} mb="2.5em">
              <Text textStyle="formLabel">Enter OTP</Text>
              <Input />
            </Flex>
            <Flex>
              <Button color="white" bgColor="#F3705A" w="150px">
                Login
              </Button>
            </Flex>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default Login;
