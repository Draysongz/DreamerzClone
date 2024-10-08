import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Text,
  VStack,
  HStack,
  useToast,
  Stack,
  Divider,
  Image,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useRoyal } from "../hooks/useRoyal";
import { useTonConnect } from "../hooks/useTonConnect";
import { useUserAPI } from "../hooks/useUserApi";

const symbols = [
  "/slot/seven.png",
  "/slot/cherries.png",
  "/slot/lemon.png",
  "/slot/orange.png",
  "/slot/watermelon.png",
  "/slot/grape.png",
  "/slot/star.png",
  "/slot/diamond.png",
];
interface profileProps {
  userData: any;
}
interface UpdateUserProfileData {
  slots?: number;
  totalWins?: number;
  slotGameWins?: number;
  totalLosses?: number;
  balance?: number;
}


const SlotMachine: React.FC<profileProps> = ({ userData }) => {
 

  const [reels, setReels] = useState<string[][]>([[], [], []]);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [stake, setStake] = useState<number>(0); // Amount paid to play
  const [userPoints, setUserPoints] = useState<number>(0); // User's total points
  const [userDeets, setUserDeets] = useState<any>(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { Deposit } = useRoyal();
  const { connected } = useTonConnect();
  const { updateUserProfile } = useUserAPI(
    userData?.user?.telegramId,
    userData?.token
  );

  useEffect(() => {
    if (userData) {
      setUserDeets(userData.user);
      setUserPoints(userData.user.slots)
    }
  }, [userData]);

  const handlePayment = async (amount: number) => {
    console.log("amount to pay", amount);
    onClose()
    if (!connected) {
      toast({
        title: "Please connect wallet",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      const dep = await Deposit(amount);
      console.log("amount to pay", dep);

      

      // Calculate the number of spins based on the deposited amount.
      const spinsAwarded = amount; // Assuming 1 ton = 1 spin.
      console.log("spin awarded", amount)

      // Update the user's total spins.
      await updateUserProfile({
        slots: userDeets.slots + spinsAwarded,
      });

      console.log("slots after payment", userDeets.slots + spinsAwarded)

      toast({
        title: "Deposit successful",
        description: `You have been awarded ${spinsAwarded} spin(s).`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

    setUserPoints((prev) => prev + stake); // Add stake to user's points
    } catch (error) {
      toast({
        title: "Deposit failed",
        description: "An error occurred while processing the deposit.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Cooldown logic to prevent immediate replay




const payToPlay = () => {
  // Calculate the new points and store in a local variable
  const newPoints = userPoints - 1;
  setUserPoints(newPoints);

  console.log("userPoints in payToPlay:", newPoints); // Logs the updated points

  // Start spinning and pass the updated points directly

  setIsSpinning(true);
  spinReels(newPoints);
};

const spinReels = (updatedPoints: any) => {
  const spinDuration = 3000;
  const intervalTime = 100;

  const spinInterval = setInterval(() => {
    setReels(
      reels.map(() =>
        Array.from(
          { length: 3 },
          () => symbols[Math.floor(Math.random() * symbols.length)]
        )
      )
    );
  }, intervalTime);

  setTimeout(() => {
    clearInterval(spinInterval);
    setIsSpinning(false);

    console.log("userPoints before evaluateResults:", updatedPoints); // Use updated points
    evaluateResults(updatedPoints);
  }, spinDuration);
};

const evaluateResults = async (updatedPoints: any) => {
  const results = reels.map((reel) => reel[1]); // Middle symbol from each reel
  const [reel1, reel2, reel3] = results;
  console.log("userPoints in evaluateResults:", updatedPoints);

  let winMultiplier;
const updateData: UpdateUserProfileData = {
  slots: updatedPoints,
};

  // Check if all three reels match
  if (reel1 === reel2 && reel2 === reel3) {
    winMultiplier = 3; // 3x multiplier for matching symbols
    const winAmount = 1 * winMultiplier;
    updateData.totalWins = userDeets.totalWins + 1;
    updateData.slotGameWins = userDeets.slotGameWins + 1;
    updateData.balance = userDeets.balance + winAmount;

    toast({
      title: `Congratulations! You won: ${winAmount}`,
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  } else {
    // Deduct the stake amount if the player loses
    updateData.totalLosses = userDeets.totalLosses + 1;
    toast({
      title: "You lose! Better luck next time!",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }

  console.log("Update data to send:", updateData);
  await updateUserProfile(updateData);
};


  return (
    <VStack spacing={5} align="center" padding={5}>
      {userPoints <= 0 && !isSpinning && (
        <>
          <Image src="/slot-machine1.png" />
          <Text mt={-4} color="red">
            Note: 1 ton = 1 slot to spin
          </Text>
          <HStack spacing={4}>
            <Button colorScheme="blue" onClick={onOpen}>
              Buy a slot
            </Button>
          </HStack>
        </>
      )}

      {(userPoints > 0 || isSpinning) && (
        <>
          <Text fontWeight={700} fontSize={"22px"} alignSelf={"flex-start"}>
            Lucky Spin
          </Text>
          <Text fontSize="3xl" fontWeight="bold">
            🎰 Slot Machine 🎰
          </Text>
          <HStack spacing={4}>
            {reels.map((reel, index) => (
              <Box
                key={index}
                borderWidth={1}
                borderRadius="md"
                p={4}
                bg="gray.100"
                boxShadow="md"
              >
                <Stack spacing={2} align="center">
                  {reel.map((symbol, idx) => (
                    <img
                      key={idx}
                      src={symbol}
                      alt={`slot-symbol-${idx}`}
                      style={{ width: "50px", height: "50px" }}
                    />
                  ))}
                </Stack>
              </Box>
            ))}
          </HStack>
          <Divider />
          <HStack spacing={4} paddingY={3}>
            <Button
              onClick={payToPlay}
              colorScheme="teal"
            >
              Play
            </Button>
          </HStack>
          <Text fontSize="lg">LuckySpins: {userPoints}</Text>{" "}
          {/* Reflect only the total points */}
        </>
      )}
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Choose Amount of Slots</DrawerHeader>
          <DrawerBody>
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <NumberInput max={100} min={1}>
                <NumberInputField
                  onChange={(e) => setStake(parseInt(e.target.value))}
                  value={stake}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper
                    onClick={() => setStake((prev) => prev + 1)}
                  />
                  <NumberDecrementStepper
                    onClick={() =>
                      setStake((prev) => Math.max(prev - 1, 0))
                    }
                  />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="green"
              onClick={() => handlePayment(stake)}
            >
              Confirm
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </VStack>
  );
};

export default SlotMachine;
