import { Box, Flex, Text, Button} from "@chakra-ui/react";
import Header from "../components/Header";
import NavigationBar from "../components/NavigationBar";
import Tables from "../components/Tables";
export default function Friends({userData}: {userData: any}) {
    return(
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
        <Header userData={userData} />
        <Box display={"flex"} flexDirection={"column"} gap={5}>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Text fontWeight={900} fontSize={"32px"}>
              Friends
            </Text>

          </Flex>
          <Box
          border={'1px solid black'}
          p={'10px'}
          borderRadius={'20px'}>
            <Flex
            width={'100%'}
            height={'250px'}
            bg={'linear-gradient(180deg, rgba(255, 215, 0, 0.2), rgba(0, 0, 0, 0.1) 70%)'}
            borderRadius={'20px'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            textAlign={'center'}
            gap={2}
            >
                <Text
                fontSize={'20px'}
                fontWeight={600}
                mx={'auto'}
                >Bring friends, earn together! </Text>
                <Text
                width={'80%'}
                fontSize={'18px'}>
                    Refer 5 friends and get one free spin
                </Text>
                <Box
                display={'flex'}
                gap={5}
                mt={6}>
                    <Button
                    fontSize={'14px'}
                    fontWeight={700}
                    bg={'rgba(255, 215, 0, 0.1)'}
                    color={'rgb(225, 215, 0.8)'}>
                        Copy referral link
                    </Button>
                    <Button
                    bg={'rgba(255, 215, 0, 0.1)'}
                    color={'rgb(225, 215, 0)'}></Button>
                </Box>
            </Flex>
          </Box>
        </Box>
        <Box>
            <Text
            fontSize={'22px'}
            fontWeight={800}
            display={'flex'}
            alignItems={'center'}
            gap={2}>
                Your friends
                <Text
                p={'5px'}
                bg={'rgba(0, 0, 0, 0.3)'}
                borderRadius={'5px'}
                fontWeight={300}
                fontSize={'16px'}>
                    0
                </Text>
            </Text>
            <Tables />
        </Box>
      </Flex>
      <NavigationBar userData={userData}/>
    </Box>
    )
}