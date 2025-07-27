import { Flex, Text } from "@chakra-ui/react";
import { Log } from "../../utils/types";
import { format } from "date-fns";

const LogEntry = ({ log }: { log: Log }) => {
  return (
    <Flex flexDir="row" alignItems="center" gap={2}>
      <Text borderRightWidth={2} pr={2}>
        {format(new Date(log.createdAt), "hh:mm:ssaaa, do MMMM yyyy")}
      </Text>
      <Text
        borderRightWidth={2}
        pr={2}
        textTransform="uppercase"
        color="#1A7DDB"
      >
        {log.type}
      </Text>
      <Text textStyle="infoTitle">{log.message}</Text>
    </Flex>
  );
};

export default LogEntry;
