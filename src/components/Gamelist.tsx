import { Box, Flex, Text, Image, Icon, Button } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

export default function Gamelist() {
  const navigate = useNavigate(); // Initialize the navigate function
  const GameDetails = [
    {
      image: "/slot-machine1.png",
      name: "Slotz",
      description: "Spin the drums, you'll win something, I'm telling you",
      path: "/game/slotMachine",
    },
    {
      image: "/game.png",
      name: "Roulette: Spin to Fortune",
      description: "Try out your luck, double or lose",
      path: "/game/spinWheel",
    },
    {
      image: "/flip-n-match.webp",
      name: "Flip, Match, and Master!",
      description:
        " Dive into a world of patterns and pairs. Can you remember where each card is?",
      path: "/game/memoryGame",
    },
  ];
  return (
    <Flex flexDirection={"column"} gap={10}>
      {GameDetails.map((list) => {
        return (
          <Flex
            alignItems={"center"}
            gap={3}
            flexDirection={"column"}
            border={"2px solid rgba(0, 0, 0, 0.3)"}
            borderRadius={10}
            py={5}
            boxShadow={"0px 0px 10px 5px rgba(0, 0, 0, 0.3)"}
          >
            <Box
              display={"flex"}
              position={"relative"}
              borderRadius={"20px"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Image src={list.image} />
            </Box>
            <Flex
              alignItems={"center"}
              justifyContent={"space-around"}
              height={"120px"}
              width={"100%"}
            >
              <Box width={"50%"}>
                <Text fontWeight={800}>{list.name}</Text>
                <Text fontSize={"14px"}>{list.description}</Text>
              </Box>
              <Button
                bgColor={"blue.500"}
                color={"white"}
                gap={2}
                _hover={{ bg: "blue.500" }}
                onClick={() => navigate(list.path)} // Navigate to Slot Machine
              >
                <Icon as={FaPlay} />
                Play
              </Button>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
}
