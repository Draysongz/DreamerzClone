import { Box, Flex, Text, Image, Icon, Button } from "@chakra-ui/react";
import { BsFillEmojiWinkFill } from "react-icons/bs";

export default function RegularTask() {
  return (
    <Flex flexDirection={"column"} gap={2}>
      <Flex alignItems={"center"} justifyContent={'space-between'}>
        <Box display={'flex'} alignItems={'center'} gap={4}>
        <Box
          display={"flex"}
          width={"15%"}
          height={"100px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Image src="/social-icons/instagram (1).png"/>
        </Box>
        <Box >
          <Text fontWeight={600} display={'flex'}
          fontSize={'15px'}
          alignItems={'center'}
          gap={2}>Follow Us on Instagram 
            
          </Text>
          <Text fontSize={"14px"}
          display={'flex'}
          gap={1}
          alignItems={'center'}
          color={'rgba(0, 0, 0, 0.3)'}>
            <Icon as={BsFillEmojiWinkFill}
            />
            Earn a free spin
          </Text>
        </Box>
        </Box>
        <Button bgColor={"blue.500"} color={"white"} _focus={{bg:"black"}} px={10}>
          <a href="https://www.instagram.com/accounts/login">
          Claim
          </a>
        </Button>
      </Flex>
      <Flex alignItems={"center"} justifyContent={'space-between'}>
        <Box display={'flex'} alignItems={'center'} gap={4}>
        <Box
          display={"flex"}
          width={"15%"}
          height={"100px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Image src="/social-icons/facebook.png"/>
        </Box>
        <Box >
          <Text fontWeight={600} display={'flex'}
          fontSize={'15px'}
          alignItems={'center'}
          gap={2}>Follow Us on Facebook 
            
          </Text>
          <Text fontSize={"14px"}
          display={'flex'}
          gap={1}
          alignItems={'center'}
          color={'rgba(0, 0, 0, 0.3)'}>
            <Icon as={BsFillEmojiWinkFill}
            />
            Earn a free spin
          </Text>
        </Box>
        </Box>
        <Button bgColor={"blue.500"} color={"white"} px={10} _focus={{bg:"black"}}>
          <a href="https://web.facebook.com/">
          Claim
          </a>
        </Button>
      </Flex>
      <Flex alignItems={"center"} justifyContent={'space-between'}>
        <Box display={'flex'} alignItems={'center'} gap={4}>
        <Box
          display={"flex"}
          width={"15%"}
          height={"100px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Image src="/social-icons/discord.png"/>
        </Box>
        <Box >
          <Text fontWeight={600} display={'flex'}
          fontSize={'15px'}
          alignItems={'center'}
          gap={2}>Follow Us on Discord 
            
          </Text>
          <Text fontSize={"14px"}
          display={'flex'}
          gap={1}
          alignItems={'center'}
          color={'rgba(0, 0, 0, 0.3)'}>
            <Icon as={BsFillEmojiWinkFill}
            />
            Earn a free spin
          </Text>
        </Box>
        </Box>
        <Button bgColor={"blue.500"} color={"white"} px={10} _focus={{bg:"black"}}>
          <a href="https://discord.com">
          Claim
          </a>
        </Button>
      </Flex>
      <Flex alignItems={"center"} justifyContent={'space-between'}>
        <Box display={'flex'} alignItems={'center'} gap={4}>
        <Box
          display={"flex"}
          width={"15%"}
          height={"100px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Image src="/social-icons/twitter.png"/>
        </Box>
        <Box >
          <Text fontWeight={600} display={'flex'}
          fontSize={'15px'}
          alignItems={'center'}
          gap={2}>Follow Us on X 
            
          </Text>
          <Text fontSize={"14px"}
          display={'flex'}
          gap={1}
          alignItems={'center'}
          color={'rgba(0, 0, 0, 0.3)'}>
            <Icon as={BsFillEmojiWinkFill}
            />
            Earn a free spin
          </Text>
        </Box>
        </Box>
        <Button bgColor={"blue.500"} color={"white"} px={10} _focus={{bg:"black"}}>
          <a href="https://www.twitter.com/login">
          Claim
          </a>
        </Button>
      </Flex>
      <Flex alignItems={"center"} justifyContent={'space-between'}>
        <Box display={'flex'} alignItems={'center'} gap={4}>
        <Box
          display={"flex"}
          width={"15%"}
          height={"100px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Image src="/social-icons/telegram.png"/>
        </Box>
        <Box >
          <Text fontWeight={600} display={'flex'}
          fontSize={'15px'}
          alignItems={'center'}
          gap={2}>Follow Us on Telegram
            
          </Text>
          <Text fontSize={"14px"}
          display={'flex'}
          gap={1}
          alignItems={'center'}
          color={'rgba(0, 0, 0, 0.3)'}>
            <Icon as={BsFillEmojiWinkFill}
            />
            Earn a free spin
          </Text>
        </Box>
        </Box>
        <Button bgColor={"blue.500"} color={"white"} px={10} _focus={{bg:"black"}}>
          <a href="https://web.telegram.org">
          Claim
          </a>
        </Button>
      </Flex>
      <Flex alignItems={"center"} justifyContent={'space-between'}>
        <Box display={'flex'} alignItems={'center'} gap={4}>
        <Box
          display={"flex"}
          width={"15%"}
          height={"100px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Image src="/social-icons/youtube.png"/>
        </Box>
        <Box >
          <Text fontWeight={600} display={'flex'}
          fontSize={'15px'}
          alignItems={'center'}
          gap={2}>Follow Us on Youtube
            
          </Text>
          <Text fontSize={"14px"}
          display={'flex'}
          gap={1}
          alignItems={'center'}
          color={'rgba(0, 0, 0, 0.3)'}>
            <Icon as={BsFillEmojiWinkFill}
            />
            Earn a free spin
          </Text>
        </Box>
        </Box>
        <Button bg={"blue.500"} color={"white"} px={10} _focus={{bg:"black"}}>
        <a href="https://www.youtube.com" >        
          Claim
        </a>
        </Button>
      </Flex>
    </Flex>
  );
}
