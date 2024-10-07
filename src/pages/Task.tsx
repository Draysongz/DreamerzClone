import { Box, Flex, Text,  Icon } from "@chakra-ui/react";
import { MdHelp } from "react-icons/md";
import Header from "../components/Header";
import NavigationBar from "../components/NavigationBar";
import RegularTask from "../components/RegularTask";
import { PiSpinnerBallFill } from "react-icons/pi";

export default function Tournament() {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      bgColor={"white"}
      width={"100vw"}
      minHeight={"100vh"}
      alignItems={"center"}
      py={2}
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
        <Header />
        <Box display={"flex"} flexDirection={"column"} gap={1}>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Text fontWeight={900} fontSize={"32px"}>
              Tasks
            </Text>
            <Icon as={MdHelp}
            boxSize={8}/>
          </Flex>
          <Text display={'flex'} gap={2}
          alignItems={'center'}>Complete each task and earn a Free Spin
            <Icon as={PiSpinnerBallFill}/>
          </Text>
          <RegularTask />
          {/* <Gamelist /> */}
        </Box>
      </Flex>
      <NavigationBar />
    </Box>
  );
}
