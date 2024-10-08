import React from 'react'
import { Box, Flex, Text } from "@chakra-ui/react";
import Header from "../components/Header";
import NavigationBar from "../components/NavigationBar";
import Gamelist from '../components/Gamelist';

interface profileProps{
  userData: any
}

const Minigames: React.FC<profileProps> = ({userData}) => {


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
      >
        <Header  userData={userData}/>
        <Box display={"flex"} flexDirection={"column"} gap={5}>
          <Flex alignItems={"center"} justifyContent={"space-between"} mt={10}>
            <Text fontWeight={900} fontSize={"32px"}>
              Play to Earn
            </Text>
          </Flex>
          <Text fontWeight={700} fontSize={"22px"}>
            
          </Text>
            <Gamelist />
        </Box>
      </Flex>
      <NavigationBar />
    </Box>
  );
}

export default Minigames