import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import '../index.css'
const LoadingPage: React.FC = () => {

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="100vh"
      bgImage={'./token1.png'}
      backgroundPosition={'center'}
      bgColor="gray.100"
      px={4}
      position={"relative"}
      overflow={'hidden'}
    >
      <Box
      position="absolute"
      top="0"
      bottom="50"
      width={'80%'}
      bgImage="/roulette.png"
      backgroundRepeat={'no-repeat'}
      backgroundPosition={'center'}
      backgroundSize={'contain'}
      opacity="0.9"
      animation="rotate 10s linear infinite"
      zIndex="0" />
      
      <Box w={'90%'} alignItems={'center'} justifyContent={'center'} display={'flex'} flexDirection={'column'} position={'fixed'} bottom={{base: 16, sm: 32}}>
      <Text fontSize="6xl" fontWeight="bold" zIndex={1}  bgGradient="linear(to-r, purple.500, blue.500 )"
        bgClip="text">
        Royal USDT
      </Text>
        <Text textAlign={'center'} fontSize={{base: "lg", sm: "xl"}} fontWeight={{base: 0, sm: 700}}>
        Ready to dive in? The fun is just around the corner! 🪄🎉 
        </Text>
      </Box>
    </Flex>
  );
};

export default LoadingPage;
