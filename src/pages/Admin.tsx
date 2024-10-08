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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { MdAdminPanelSettings } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import NavigationBar from "../components/NavigationBar";

const Admin: React.FC = () => {
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState(""); // State for amount input
  const [wallet, setWallet] = useState(""); // State for wallet input
  const { isOpen, onClose, onOpen } = useDisclosure();

  const toggleVisibility = () => {
    setIsHidden((prev) => !prev);
  };

  const handleConfirmClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProceed = () => {
    setIsModalOpen(false);
    onClose();
  };

  const isConfirmButtonDisabled = !amount || !wallet;

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
      <Flex width={"95%"} p={"0px 10px"} height={"100%"} bgColor={"white"} flexDirection={"column"} pb={32}>
        <Box display={"flex"} flexDirection={"column"} gap={10}>
          <Flex alignItems={"center"} gap={5}>
            <Icon
              as={MdAdminPanelSettings}
              width={{ base: 13, sm: 20 }}
              height={{ base: 13, sm: 20 }}
              boxSize={{ base: 10, sm: 14 }}
              border={"1px solid rgba(0, 0, 0, 0.3)"}
              borderRadius={"50%"}
              p={"5px"}
              color={"rgba(0, 0, 0, 1"}
            />
            <Box>
              <Text fontWeight={600} fontSize={{ base: "14px", sm: "20px" }}>
                Welcome, Admin
              </Text>
            </Box>
          </Flex>

          <Box display={"flex"}>
            <Box width={"50%"} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
              <Text fontSize={"18px"}> Assets Accumulated</Text>
              {!isHidden ? (
                <Text fontSize={"52px"} fontWeight={700} display={"flex"} gap={2}>
                  0.00
                  <Text fontSize={"20px"} fontWeight={200} alignSelf={"flex-end"} mb={4}>
                    USD
                  </Text>
                </Text>
              ) : (
                <Text fontSize={"52px"} fontWeight={700} display={"flex"} gap={2}>
                  ****
                </Text>
              )}
            </Box>

            <Box display={"flex"} width={"50%"} justifyContent={"right"} alignItems={"center"}>
              <Button width={"70%"} bgColor={"black"} color={"white"} _focus={{ bg: "black" }} onClick={toggleVisibility}>
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
            height={"120px"}
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

            <Box display={"flex"} alignItems={"center"} width={"70%"} justifyContent={"center"} p={"10px"} textAlign={"center"}>
              <Text fontSize={{ base: "16px", sm: "18px" }}>Click on the icon to withdraw your assets to your wallet</Text>
            </Box>
          </Box>

          <Box mt={{ base: 5, sm: 10 }}>
            <Image src="/slot-machine1.png" width={"100%"} height={"50%"} opacity={0.5} />
          </Box>

          {/* Withdrawal History */}
          <Box mt={10}>
            <Text fontWeight={600} fontSize={"20px"} mb={5}>
              Withdrawal History
            </Text>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Amount (USD)</Th>
                  <Th>Wallet Address</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Oct 5, 2024</Td>
                  <Td>$100</Td>
                  <Td>0x123...abc</Td>
                </Tr>
                <Tr>
                  <Td>Oct 6, 2024</Td>
                  <Td>$200</Td>
                  <Td>0x456...def</Td>
                </Tr>
                <Tr>
                  <Td>Oct 7, 2024</Td>
                  <Td>$300</Td>
                  <Td>0x789...ghi</Td>
                </Tr>
              </Tbody>
            </Table>
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
            <Box display={"flex"} flexDirection={"column"} gap={5}>
              <Box>
                <FormLabel htmlFor="wallet">Input Wallet Address</FormLabel>
                <Input
                  id="wallet"
                  placeholder="Type here..."
                  value={wallet}
                  onChange={(e) => setWallet(e.target.value)}
                  required
                />
              </Box>
              <Box>
                <FormLabel htmlFor="amount">Enter Amount</FormLabel>
                <Input
                  id="amount"
                  placeholder="Type here..."
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </Box>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={handleConfirmClick} isDisabled={isConfirmButtonDisabled}>
              Confirm
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Modal for Withdrawal Confirmation */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Withdrawal</ModalHeader>
          <ModalBody>
            <Text>
              Are you sure you want to withdraw <b>${amount}</b> to the wallet address <b>{wallet}</b>?
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
    </Box>
  );
};

export default Admin;
