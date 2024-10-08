import { Box, Flex, Text, Image, Icon, Button } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

export default function Gamelist() {
    const navigate = useNavigate(); // Initialize the navigate function

    return (
        <Flex flexDirection={'column'} gap={10}>
            <Flex alignItems={'center'} gap={3} flexDirection={'column'} border={'2px solid rgba(0, 0, 0, 0.3)'} borderRadius={10} py={5} boxShadow={'0px 0px 10px 5px rgba(0, 0, 0, 0.3)'}>
                <Box
                    display={'flex'}
                    position={'relative'}
                    borderRadius={'20px'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Image src="/slot-machine1.png"/>
                </Box>
                <Flex alignItems={'center'} justifyContent={'space-around'} height={'120px'} width={'100%'}>
                <Box width={'50%'}>
                    <Text fontWeight={800}>Slotz</Text>
                    <Text fontSize={'14px'}>Spin the drums, you'll win something, I'm telling you</Text>
                </Box>
                <Button
                    bgColor={'blue.500'}
                    color={'white'}
                    gap={2}
                    onClick={() => navigate('/game/slotMachine')} // Navigate to Slot Machine
                >
                    <Icon as={FaPlay} />
                    Play
                </Button>
                </Flex>
            </Flex>

            <Flex alignItems={'center'} gap={3} flexDirection={'column'} border={'2px solid rgba(0, 0, 0, 0.3)'} borderRadius={10} py={5} boxShadow={'0px 0px 10px 5px rgba(0, 0, 0, 0.3)'}>
                <Box
                    display={'flex'}
                    borderRadius={'20px'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <Image src="/game.png" width={'80%'}/>
                </Box>
                <Flex alignItems={'center'} justifyContent={'space-around'} height={'120px'} width={'100%'}>
                <Box width={'50%'}>
                    <Text fontWeight={800}>Roulette: Spin to Fortune</Text>
                    <Text fontSize={'14px'}>Try out your luck, double or lose</Text>
                </Box>
                <Button
                    bgColor={'blue.500'}
                    color={'white'}
                    gap={2}
                    onClick={() => navigate('/game/spinWheel')} // Navigate to Roll Game
                >
                    <Icon as={FaPlay} />
                    Play
                </Button>
                </Flex>
            </Flex>
            
        </Flex>
    );
}
