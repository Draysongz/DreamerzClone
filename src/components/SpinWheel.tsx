import React, { useEffect, useState } from "react";
import { Box, Button, Text, VStack, HStack, useToast } from "@chakra-ui/react";
import { Wheel } from "react-custom-roulette";
import { motion, AnimatePresence } from "framer-motion";
import Leaderboard from "./leaderboard";
import { useRoyal } from "../hooks/useRoyal";
import { useUserAPI } from "../hooks/useUserApi";
import { useTonConnect } from "../hooks/useTonConnect";

interface Score {
  player: string;
  score: number;
}
interface ProfileProps {
  userData: any;
}

const SpinnerWheel: React.FC<ProfileProps> = ({ userData }) => {
  const [mustSpin, setMustSpin] = useState<boolean>(false);
  const [prizeNumber, setPrizeNumber] = useState<number>(0);
  const [spinsLeft, setSpinsLeft] = useState<number>(0);
  const [totalWinnings, setTotalWinnings] = useState<number>(0);
  const [lastWin, setLastWin] = useState<number>(0);
  // const [spinResults, setSpinResults] = useState<number[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [showWinAnimation, setShowWinAnimation] = useState<boolean>(false);
  const [leaderboardScores, setLeaderboardScores] = useState<Score[]>([]);
  const [userDeets, setUserDeets] = useState<any>(null);
  const toast = useToast();
  const { updateUserProfile, user, fetchAllUsers } = useUserAPI( userData?.user?.telegramId, userData?.token);
  const { Deposit } = useRoyal();
  const {connected} = useTonConnect()

  console.log("userdata from spinnerwheel", userData)

  useEffect(() => {
    if (userData) {
      setUserDeets(userData.user);
      setSpinsLeft(userData.user?.totalSpins);
    }
  }, [userData]);

  useEffect(() => {
    if (user) {
      setUserDeets(user);
    }
  }, [user]);

useEffect(() => {
  const loadLeaderboard = async () => {
    const users = await fetchAllUsers();
    console.log(users)
  
    const sortedScores = users
      .map((user: any) => ({
        player: user.username,
        score: user.balance || 0,
      }))
      .sort((a: { player: string; score: number }, b: { player: string; score: number }) => b.score - a.score)
      .slice(0, 10); // Get the top 10

    setLeaderboardScores(sortedScores);
  };

  loadLeaderboard();
}, [userDeets]); // Make sure to use an empty dependency array if you want to fetch users only once when the component mounts




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

  const handleSpinClick = () => {
    if (spinsLeft <= 0) {
      toast({
        title: "Please buy spin to play.",
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
      setTimeout(() => {
        setIsGameOver(true);
       
      }, 2000);
    } else {
      const multiplier = parseFloat(result.replace('x', '')) || 0;
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

      setTimeout(() => {
        setIsGameOver(true);
      }, 2000);
    }

    await updateUserProfile(updateData);
  };

  const handlePayment = async (amount: number) => {
    if(!connected){
      toast({
        title:"Please connect wallet ",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      return 
    }
    try {
      const dep = await Deposit(amount);
      console.log(dep);

      await updateUserProfile({
        totalSpins: userDeets.totalSpins + 1,
      });

      toast({
        title: "Deposit successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setSpinsLeft((prev) => prev + 1);
      setTotalWinnings(0);
    } catch (error) {
      console.error("Deposit failed:", error);
      toast({
        title: "Deposit failed",
        description: "An error occurred while processing the deposit.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (isGameOver) {
    return (
      <VStack spacing={8} align="center">
        <Text fontSize="2xl" fontWeight="bold">
          Game Over! Total Winnings: ${userDeets?.balance}
        </Text>
        <Button
          colorScheme="teal"
          onClick={() => setIsGameOver(false)}
        >
          Play Again (Requires New Payment)
        </Button>
        <Leaderboard scores={leaderboardScores} />
      </VStack>
    );
  }

  return (
    <VStack spacing={8} align="center">
  {spinsLeft <= 0 && !mustSpin && (
  <HStack spacing={4}>
    <Button colorScheme="blue" onClick={() => handlePayment(1)}>
      Pay $10 to Play
    </Button>
    <Button colorScheme="blue" onClick={() => handlePayment(1)}>
      Pay $20 to Play
    </Button>
  </HStack>
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
            ${lastWin}
          </Text>
        </motion.div>
      )}
    </AnimatePresence>
    <Box w={"100%"} display={"flex"} flexDirection={"column"} alignItems={"center"}>
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

    </VStack>
  );
};

export default SpinnerWheel;
