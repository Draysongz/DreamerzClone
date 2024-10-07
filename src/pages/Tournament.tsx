import { Box, Flex, Text,  Icon } from "@chakra-ui/react";
import { MdHelp } from "react-icons/md";
import Header from "../components/Header";
import NavigationBar from "../components/NavigationBar";
import RegularTournament from "../components/RegularTournament";

export default function Tournament({userData}: {userData: any}) {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      bgColor={"white"}
      width={"100vw"}
      minHeight={"100vh"}
      alignItems={"center"}
      py={7}
    >
      <Flex
        width={"95%"}
        p={"0px 10px"}
        height={"100%"}
        bgColor={"white"}
        flexDirection={"column"}
        pb={32}
        gap={5}
      >
        <Header userData={userData}/>
        <Box display={"flex"} flexDirection={"column"} gap={5}>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Text fontWeight={900} fontSize={"32px"}>
              Tournaments
            </Text>
            <Icon as={MdHelp}
            boxSize={8}/>
          </Flex>
          <RegularTournament />
          {/* <Gamelist /> */}
        </Box>
      </Flex>
      <NavigationBar />
    </Box>
  );
}
