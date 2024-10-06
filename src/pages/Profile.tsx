import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Icon,
  Button,
  Input,
  Image,
  FormLabel,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { HiUser } from "react-icons/hi2";
import { GiReceiveMoney, 
  // GiPayMoney, 
  // GiWallet 
} from "react-icons/gi";
import { FaLeftLong } from "react-icons/fa6";
// import { MdCurrencyExchange } from "react-icons/md";
// import { SiConvertio } from "react-icons/si";
import NavigationBar from "../components/NavigationBar";
import { Link } from "react-router-dom"

interface profileProps{
  userData: any
}

const Profile: React.FC<profileProps> = ({userData}) => {
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState(""); // State for amount input
  const [wallet, setWallet] = useState(""); // State for wallet input
  const [userID, setUserID] = useState(""); // State for UserID input

  const {isOpen, onClose, onOpen} = useDisclosure()

  // const { isOpen: isSecondOpen, onOpen: onSecondOpen, onClose: onSecondClosed } = useDisclosure();
  const playerID = "47368468239";
  console.log(userData) // Store PlayerID here

  // Function to toggle the visibility of total assets and button text
  const toggleVisibility = () => {
    setIsHidden((prev) => !prev);
  };

  const handleConfirmClick = () => {
    setIsModalOpen(true); // Open modal on Confirm button click
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal when "No" is clicked
  };

  const handleProceed = () => {
    // Add logic for proceeding with the withdrawal
    setIsModalOpen(false);
    onClose(); // Close drawer after proceeding
  };

  // Check if inputs are valid
  const isConfirmButtonDisabled = !userID || userID !== playerID || !amount || !wallet;

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
      >
        <Box display={"flex"} flexDirection={"column"} gap={10} mt={0}>
          <Link to={'/'}>          
          <Icon as={FaLeftLong}
          boxSize={{ base: 6, sm: 6 }}
          color={"rgba(0, 0, 0, 1)"}/>
          </Link>
          <Flex alignItems={"center"} gap={5} mt={-5}>
            <Icon
              as={HiUser}
              width={{ base: 13, sm: 20 }}
              height={{ base: 13, sm: 20 }}
              boxSize={{ base: 10, sm: 14 }}
              border={"1px solid rgba(0, 0, 0, 0.3)"}
              borderRadius={"50%"}
              p={"5px"}
              color={"rgba(190, 129, 100, 0.7)"}
            />
            <Box>
              <Text fontWeight={600} fontSize={{ base: "14px", sm: "20px" }}>
                {userData && userData.user.username}
              </Text>
              <Text
                fontWeight={400}
                fontSize={{ base: "12px", sm: "14px" }}
                display={"flex"}
                gap={3}
                alignItems={"center"}
                textAlign={"center"}
              >
                PlayerID:
                <Text
                  fontWeight={500}
                  fontSize={{ base: "12px", sm: "16px" }}
                  alignSelf={"center"}
                >
                  {userData && userData.user.telegramId}
                </Text>
              </Text>
            </Box>
          </Flex>

          <Box display={"flex"}>
            <Box
              width={"50%"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
            >
              <Text fontSize={"18px"}>Total Assets</Text>

              {!isHidden ? (
                <Text
                  fontSize={"52px"}
                  fontWeight={700}
                  display={"flex"}
                  gap={2}
                >
                  {userData && userData.user.balance}
                  <Text
                    fontSize={"20px"}
                    fontWeight={200}
                    alignSelf={"flex-end"}
                    mb={4}
                  >
                    USD
                  </Text>
                </Text>
              ) : (
                <Text
                  fontSize={"52px"}
                  fontWeight={700}
                  display={"flex"}
                  gap={2}
                >
                  ****
                </Text>
              )}
            </Box>

            <Box
              display={"flex"}
              width={"50%"}
              justifyContent={"right"}
              alignItems={"center"}
            >
              <Button
                width={"70%"}
                bgColor={"black"}
                color={"white"}
                _focus={{bg:"black"}}
                onClick={toggleVisibility}
              >
                {isHidden ? "Show" : "Hide"}
              </Button>
            </Box>
          </Box>

          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            border={"1px solid rgba(0, 0, 0, 0.3)"}
          borderRadius={"15px"}
          height={'120px'}
          >
            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              gap={3}
              width={"28%"}
              justifyContent={"center"}
              py={"10px"}
              onClick={onOpen}
            >
              <Icon as={GiReceiveMoney} boxSize={{ base: 10, sm: 14 }} />
              <Text>Withdraw</Text>
            </Flex>

            {/* <Flex
              flexDirection={"column"}
              alignItems={"center"}
              gap={3}
              border={"1px solid rgba(0, 0, 0, 0.3)"}
              borderRadius={"15px"}
              width={"28%"}
              justifyContent={"center"}
              py={"10px"}
              onClick={onSecondOpen}
            >
              <Icon as={GiPayMoney} boxSize={{ base: 10, sm: 14 }} />
              <Text>Deposit</Text>
            </Flex>

            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              gap={3}
              border={"1px solid rgba(0, 0, 0, 0.3)"}
              borderRadius={"15px"}
              width={"28%"}
              justifyContent={"center"}
              py={"10px"}
            >
              <Icon as={SiConvertio} boxSize={{ base: 10, sm: 14 }} />
              <Text>Convert</Text>
            </Flex> */}
          <Box
          display={'flex'}
          alignItems={"center"}
          width={"70%"}
          height={{base: '96px', sm: '112px'}}
          justifyContent={"center"}
          p={"10px"}
          textAlign={'center'}>
            <Text
            fontSize={{base: '16px', sm: "18px"}}>
              Click on the icon to withdraw your assets to your wallet
            </Text>

          </Box>
          </Box>

          <Box mt={{base: 5, sm: 10}}>
          <Image src="/slot-machine.png" width={'100%'} height={'50%'} opacity={0.5} />
          </Box>
        </Box>
      </Flex>
      <NavigationBar />
      {/* Withdrawal Drawer */}
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Choose Withdrawal Method</DrawerHeader>

          <DrawerBody>
            <Box display={'flex'} flexDirection={'column'} gap={5}>
              <Box>
                <FormLabel htmlFor="userID">Input UserID</FormLabel>
                <Input 
                  id="userID" 
                  placeholder="Type here..." 
                  value={userID} 
                  onChange={(e) => setUserID(e.target.value)} // Update UserID input value
                  required // Mark as required
                />
              </Box>
              <Box>
                <FormLabel htmlFor="wallet">Input Wallet Address</FormLabel>
                <Input
                  id="wallet"
                  placeholder="Type here..."
                  value={wallet}
                  onChange={(e) => setWallet(e.target.value)} // Update wallet input value
                  required // Mark as required
                />
              </Box>
              <Box>
                <FormLabel htmlFor="amount">Enter Amount</FormLabel>
                <Input
                  id="amount"
                  placeholder="Type here..."
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)} // Update amount input value
                  required // Mark as required
                />
              </Box>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button 
              colorScheme="green" 
              onClick={handleConfirmClick} 
              isDisabled={isConfirmButtonDisabled} // Disable button if inputs are invalid
            >
              Confirm
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Modal for Withdrawal confirmation */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} isCentered>
        <ModalOverlay />
        <ModalContent height="300px">
          <ModalHeader>Confirm Withdrawal</ModalHeader>
          <ModalBody>
            <Text>
              Are you sure you want to withdraw <b>$ {amount}</b> to the wallet address{" "}
              <b>{wallet}</b>?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleProceed}>
              Yes, proceed
            </Button>
            <Button variant="ghost" onClick={handleCloseModal}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/*  Deposit Drawer */}
      {/* <Drawer isOpen={isSecondOpen} placement="bottom" onClose={onSecondClosed}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Choose Deposit Method</DrawerHeader>

          <DrawerBody>
            <Box display={'flex'} flexDirection={'column'} gap={5}>
              <Box display={'flex'}
              gap={4}>
                <Icon as={MdCurrencyExchange}
                boxSize={{ base: 10, sm: 14 }}/>
                <Flex>
                  <Text fontWeight={700}>Deposit USD
                  <Text fontWeight={100}>Deposit from Wallet</Text>
                  </Text>
                </Flex>
              </Box>
              
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onSecondClosed}
            >
              Cancel
            </Button>
            <Button 
              colorScheme="green"
              onClick={onSecondClosed} 
              
            >
              OK
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer> */}
    </Box>
  );
};

export default Profile;
