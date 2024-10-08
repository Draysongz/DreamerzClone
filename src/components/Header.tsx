import {
  Box,
  Flex,
  Text,
  Icon,
  Image,
  // Image
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
// import star from '/star.png'
// import { BsCurrencyDollar } from "react-icons/bs";
// import { GiWallet } from "react-icons/gi";
// import { FaBell } from "react-icons/fa";
import { HiUser } from "react-icons/hi2";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
// import { IoMdHelpCircle } from "react-icons/io";
import userEventEmitter from "../utils/eventEmitter";


export default function Header({userData}: {userData: any}) {
  const [userDeets, setUserDeets] = useState<any>()

  


useEffect(() => {
  if (userData) {
    setUserDeets(userData.user);
  }
}, [userData]);

  useEffect(() => {
    const handleUserUpdate = (updatedUser: any) => {
      // Update the state with the latest user data
      console.log(updatedUser)
      setUserDeets(updatedUser);
      console.log("User data updated:", updatedUser);
    };

    // Listen for the 'userUpdated' event
    userEventEmitter.on("userUpdated", handleUserUpdate);

    // Clean up the event listener when the component is unmounted
    return () => {
      userEventEmitter.off("userUpdated", handleUserUpdate);
    };
  }, []);


  return (
    <Box
      display={"flex"}
      width={"100%"}
      height={"80px"}
      bgColor={"white"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box display={"flex"} gap={2} alignItems={"center"}>
        {/* <Flex
            alignItems={'center'}
            gap={2}
            border={'1px solid rgba(0, 0, 0, 0.3)'}
            p={{base: '2.5px 5px', sm: '5px 10px'}}
            borderRadius={'20px'}>
                <Image src={star}
                width={{base: 4, sm: 6 }}
                mt={{base: 0.5, sm: 0}}
                />
                <Text
                alignItems={'center'}
                display={'flex'}
                fontWeight={600}
                gap={1}
                fontSize={{base: '14px', sm: '16px'}}>
                    1,000
                    <span
                    className="text-blue-500">
                        XP
                    </span>
                </Text>
            </Flex> */}

        <Flex
          alignItems={"center"}
          border={"1px solid rgba(0, 0, 0, 0.3)"}
          borderRadius={"20px"}
          p={{ base: "4px 7px", sm: "5px 10px" }}
          gap={1}
        >
       <Image  src="/ton.png" width={{base: 5, sm: 10}} height={{base: 5, sm: 10}} borderRadius={'20px'} />
          <Text fontWeight={600} fontSize={{ base: "14px", sm: "16px" }}>
            {userDeets && userDeets.balance}
          </Text>
        </Flex>
      </Box>

      <Flex alignItems={"center"} gap={3}>
        <Flex
          alignItems={"center"}
          p={{ base: "4px 7px", sm: "5px 10px" }}
          gap={1}
        >

          <TonConnectButton />
        </Flex>
        <Link to='/profile'>
        <Flex position={"relative"}>
          <Icon
            as={HiUser}
            width={{ base: 11, sm: 18 }}
            height={{ base: 11, sm: 18 }}
            boxSize={{ base: 8, sm: 12 }}
            border={"1px solid rgba(0, 0, 0, 0.3)"}
            borderRadius={"50%"}
            p={"5px"}
            color={"rgba(0, 0, 0, 0.3)"}
          />
          {/* <Text
                position={'absolute'}
                bg={'rgba(0, 0, 0, 0.2)'}
                fontSize={'10px'}
                bottom={'-12px'}
                left={'11px'}
                fontWeight={700}
                p={'2px'}
                color={'rgba(0, 0, 0, 0.6)'}>
                    5638
                </Text> */}
        </Flex>
        </Link>
      </Flex>
    </Box>
  );
}
