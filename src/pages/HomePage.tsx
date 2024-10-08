import { Box, Flex, Text, Button, Image } from "@chakra-ui/react";
import NavigationBar from "../components/NavigationBar";
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import Gamelist from "../components/Gamelist";
import { Link } from "react-router-dom";
interface profileProps{
  userData: any
}

const HomePage: React.FC<profileProps> = ({userData}) => {
  const slides = [

    <Box
      textAlign="center"
      bg={"linear-gradient(rgba(128, 0, 128, 0.3), white)"}
      width={"100%"}
      p={"50px 10px"}
    >
      <Image
        src="/player-versus-player (2).png"
        alt="Slide 1 Image"
        width={24}
        mx="auto"
      />

      <Text
        display={"flex"}
        justifyContent={"center"}
        fontWeight={900}
        fontSize={"21px"}
        mt={5}
      >
        Got friends?
      </Text>

      <Text fontSize={"16px"} fontWeight={700} mt={3}>
        Refer 5 friends and Get a free Spin 
      </Text>

      <Link to="/friends">
        <Button mt={4} color={"green"} bg={"green.200"}>
          Refer now
        </Button>
      </Link>
    </Box>,
    <Box
      textAlign="center"
      bg={"linear-gradient(rgba(255, 165, 0, 0.3), white)"}
      width={"100%"}
      p={"50px 10px"}
    >
      <Image
        src="/resilience.png"
        alt="Slide 1 Image"
        width={24}
        mx="auto"
      />

      <Text
        display={"flex"}
        justifyContent={"center"}
        fontWeight={900}
        fontSize={"21px"}
        mt={5}
      >
        Need free Spin?
      </Text>

      <Text fontSize={"16px"} fontWeight={700} mt={3}>
        Complete all tasks and earn free spin each
      </Text>

      <Link to="/task">
        <Button mt={4} color={"orange"} bg={"orange.200"}>
          Earn now
        </Button>
      </Link>
    </Box>,
  ];

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
        // bg={'url(/Social-casinos.jpg)'}
        width={"95%"}
        p={"0px 10px"}
        height={"100%"}
        bgColor={"white"}
        flexDirection={"column"}
        pb={32}
        gap={5}
      >
        <Header  userData={userData}/>
        <Box
          p={"10px"}
          border={"1px solid rgba(0, 0, 0, 0.3)"}
          borderRadius={"20px"}
        >
          <Carousel slides={slides} />
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={5}>
          <Flex alignItems={"center"} justifyContent={"space-between"} mt={10}>
            <Text fontWeight={900} fontSize={"20px"}>
              Keep on playing
            </Text>
            <Link to={"/minigames"}>            
            <Button color={"blue.500"} bgColor={"blue.100"} width={"75px"}>
              See all
            </Button>
            </Link>
          </Flex>
          <Gamelist />
        </Box>
      </Flex>
      <NavigationBar userData={userData} />
    </Box>
  );
};

export default HomePage;
