import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Text,
  VStack,
  HStack,
  useToast,
  Image,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Wheel } from "react-custom-roulette";
import { motion, AnimatePresence } from "framer-motion";
import Leaderboard from "./leaderboard";
import { useRoyal } from "../hooks/useRoyal";
import { useUserAPI } from "../hooks/useUserApi";
import { useTonConnect } from "../hooks/useTonConnect";
import userEventEmitter from "../utils/eventEmitter";

interface Score {
  player: string;
  score: number;
}
interface ProfileProps {
  userData: any;
}
  const data = [
    { option: "0.5x", style: { backgroundColor: "#FF6B6B", textColor: "white" } },
    { option: "Try Again", style: { backgroundColor: "#FFE15D", textColor: "black" } },
    { option: "1.0x", style: { backgroundColor: "#4ECDC4", textColor: "white" } },
    { option: "Try Again", style: { backgroundColor: "#FFE15D", textColor: "black" } },
    { option: "1.5x", style: { backgroundColor: "#FFD93D", textColor: "black" } },
    { option: "Try Again", style: { backgroundColor: "#FFE15D", textColor: "black" } },
    { option: "2.0x", style: { backgroundColor: "#6E85B7", textColor: "white" } },
    { option: "Try Again", style: { backgroundColor: "#FFE15D", textColor: "black" } },
    { option: "2.5x", style: { backgroundColor: "#ED8975", textColor: "white" } },
    { option: "Try Again", style: { backgroundColor: "#FFE15D", textColor: "black" } },
    { option: "3.0x", style: { backgroundColor: "#9575DE", textColor: "white" } },
    { option: "Try Again", style: { backgroundColor: "#FFE15D", textColor: "black" } },
    { option: "3.5x", style: { backgroundColor: "#FF8066", textColor: "white" } },
    { option: "Try Again", style: { backgroundColor: "#FF9B9B", textColor: "white" } },
    { option: "4.0x", style: { backgroundColor: "#45B7D1", textColor: "white" } },
    { option: "Try Again", style: { backgroundColor: "#FF9B9B", textColor: "white" } },
  ];

const SpinnerWheel: React.FC<ProfileProps> = ({ userData }) => {
  const [mustSpin, setMustSpin] = useState<boolean>(false);
  const [prizeNumber, setPrizeNumber] = useState<number>(0);
  const [spinsLeft, setSpinsLeft] = useState<number>(0);
  const [totalWinnings, setTotalWinnings] = useState<number>(0);
  const [lastWin, setLastWin] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [showWinAnimation, setShowWinAnimation] = useState<boolean>(false);
  const [leaderboardScores, setLeaderboardScores] = useState<Score[]>([]);
  const [userDeets, setUserDeets] = useState<any>(null);
  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { updateUserProfile, fetchAllUsers } = useUserAPI(
    userData?.user?.telegramId,
    userData?.token
  );
  const { Deposit } = useRoyal();
  const { connected } = useTonConnect();

  useEffect(() => {
    if (userData) {
      setUserDeets(userData.user);
      setSpinsLeft(userData.user?.totalSpins);
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

  useEffect(() => {
    const loadLeaderboard = async () => {
      const users = await fetchAllUsers();
      const sortedScores = users
        .map((user: any) => ({
          player: user.username,
          score: user.balance || 0,
        }))
        .sort(
          (a: { player: string; score: number }, b: { player: string; score: number }) =>
            b.score - a.score
        )
        .slice(0, 10);

      setLeaderboardScores(sortedScores);
    };

    loadLeaderboard();
  }, [userDeets]);

  const handleSpinClick = () => {
    if (spinsLeft <= 0) {
      toast({
        title: "Please buy a slot to play.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setSpinsLeft((prev) => prev - 1);
  };

  const handleSpinStop = async () => {
    setMustSpin(false);

    if (!userDeets) return;

    const result = data[prizeNumber].option;
    const updateData: any = {
      totalSpins: spinsLeft,
    };

    if (result === "Try Again") {
      setLastWin(0);
      updateData.totalLosses = userDeets.totalLosses + 1;
      toast({
        title: "You lost!",
        description: "Better luck next time!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const multiplier = parseFloat(result.replace("x", "")) || 0;
      const winAmount = 1 * multiplier;
      const newTotalWinnings = totalWinnings + winAmount;

      setLastWin(winAmount);
      setTotalWinnings(newTotalWinnings);

      updateData.totalWins = userDeets.totalWins + 1;
      updateData.spinningWheelWins = userDeets.spinningWheelWins + 1;
      updateData.balance = userDeets.balance + winAmount;

      toast({
        title: `You won $${winAmount}!`,
        description: `Total winnings: $${newTotalWinnings}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setShowWinAnimation(true);
      setTimeout(() => setShowWinAnimation(false), 2000);
    }

    await updateUserProfile(updateData);
    setIsGameOver(true);
  };

 const handlePayment = async (amount: number) => {
  onClose();
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
    console.log(dep);

    // Calculate the number of spins based on the deposited amount.
    const spinsAwarded = Math.floor(amount); // Assuming 1 ton = 1 spin.

    // Update the user's total spins.
    await updateUserProfile({
      totalSpins: userDeets.totalSpins + spinsAwarded,
    });

    toast({
      title: "Deposit successful",
      description: `You have been awarded ${spinsAwarded} spin(s).`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Update the local state.
    setSpinsLeft((prev) => prev + spinsAwarded);
    setTotalWinnings(0);
    setIsGameOver(false); // Reset game-over state when new spins are added.
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


  if (isGameOver && spinsLeft === 0 && !mustSpin) {
    return (
      <VStack spacing={8} align="center">
        <Text fontSize="2xl" fontWeight="bold">
          No more spins Left! 
        </Text>
        <Button colorScheme="teal" onClick={() => setIsGameOver(false)}>
          Buy More Spins
        </Button>
        <Leaderboard scores={leaderboardScores} />
      </VStack>
    );
  }

  return (
    <VStack spacing={8} align="center">
      {spinsLeft <= 0 && !mustSpin && !isGameOver && (
        <>
          <Image src="/game.png" />
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

      {(spinsLeft > 0 || mustSpin) && (
        <>
          <Text color="black" fontSize="xl">
            Spins Left: {spinsLeft}
          </Text>
          <AnimatePresence>
            {showWinAnimation && (
              <motion.div>
                <Text color="yellow.300" fontSize="6xl" fontWeight="bold">
                  {lastWin} TON
                </Text>
              </motion.div>
            )}
          </AnimatePresence>
          <Box w="100%" display="flex" flexDirection="column" alignItems="center">
            <motion.div animate={mustSpin ? { scale: [1, 1.05, 1] } : {}} transition={{ duration: 0.5, repeat: Infinity }}>
              <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={data}
                onStopSpinning={handleSpinStop}
                outerBorderColor="#13B5B0"
                outerBorderWidth={10}
                innerBorderColor="#13B5B0"
                radiusLineColor="#13B5B0"
                radiusLineWidth={1}
                textDistance={60}
                fontSize={20}
              />
            </motion.div>
          </Box>
          <HStack spacing={4}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button colorScheme="teal" onClick={handleSpinClick} isDisabled={mustSpin || spinsLeft === 0}>
                Spin
              </Button>
            </motion.div>
          </HStack>
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
                <NumberInputField onChange={(e) => setStakeAmount(parseInt(e.target.value))} value={stakeAmount} />
                <NumberInputStepper>
                  <NumberIncrementStepper onClick={() => setStakeAmount((prev) => prev + 1)} />
                  <NumberDecrementStepper onClick={() => setStakeAmount((prev) => Math.max(prev - 1, 0))} />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={() => handlePayment(stakeAmount)}>
              Confirm
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </VStack>
  );
};

export default SpinnerWheel;
