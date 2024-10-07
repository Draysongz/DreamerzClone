import React, { useState } from "react";
import { Box, Button, Text, VStack, HStack, useToast } from "@chakra-ui/react";
import { Wheel } from "react-custom-roulette";
import { motion, AnimatePresence } from "framer-motion";
import Leaderboard from "./leaderboard";
import { useRoyal } from "../hooks/useRoyal";

interface Score {
  player: string;
  score: number;
}

const SpinnerWheel: React.FC = () => {
  const [mustSpin, setMustSpin] = useState<boolean>(false);
  const [prizeNumber, setPrizeNumber] = useState<number>(0);
  const [stakeAmount, setStakeAmount] = useState<number | null>(null); // Stake amount is required before the game
  const [spinsLeft, setSpinsLeft] = useState<number>(1); // One spin per payment
  const [totalWinnings, setTotalWinnings] = useState<number>(0);
  const [lastWin, setLastWin] = useState<number>(0);
  const [spinResults, setSpinResults] = useState<number[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [showWinAnimation, setShowWinAnimation] = useState<boolean>(false);
  const [leaderboardScores, setLeaderboardScores] = useState<Score[]>([]);
  const toast = useToast();

  const {Deposit} = useRoyal()

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
    if (stakeAmount === null || stakeAmount <= 0) {
      toast({
        title: "Please set a valid stake amount to play.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (spinsLeft > 0) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setSpinsLeft(0); // Only one spin per payment
    }
  };

  const handleSpinStop = () => {
    setMustSpin(false);

    const result = data[prizeNumber].option;
    if (result === "Try Again") {
      // If it's "Try Again", player loses the stake
      setLastWin(0);
      setStakeAmount(null);
      toast({
        title: "You lost!",
        description: `You lost your stake. Better luck next time!`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const multiplier = parseFloat(result.replace('x', '')) || 0;
      const winAmount = stakeAmount! * multiplier;
      const newTotalWinnings = totalWinnings + winAmount;

      setLastWin(winAmount);
      setTotalWinnings(newTotalWinnings);
      setSpinResults([...spinResults, winAmount]);

      setShowWinAnimation(true);
      setTimeout(() => setShowWinAnimation(false), 2000);

      toast({
        title: `You won $${winAmount}!`,
        description: `Total winnings: $${newTotalWinnings}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setTimeout(() => {
        setIsGameOver(true);
        setLeaderboardScores((prevScores) =>
          [...prevScores, { player: "Player", score: newTotalWinnings }]
            .sort((a, b) => b.score - a.score)
            .slice(0, 10) // Limit the leaderboard to 10 players
        );
      }, 2000);
    }
  };

  const handlePayment = async (amount: number) => {
     const dep = await Deposit(amount)
     console.log(dep)
     toast({
      title: "Deposit successful",
      status: "success",
      duration: 3000,
      isClosable: true,
     })
    setStakeAmount(1);
    setSpinsLeft(1); // Grant one spin per payment
    setTotalWinnings(0); // Reset winnings for the new round
  };

  if (isGameOver) {
    return (
      <VStack spacing={8} align="center">
        <Text fontSize="2xl" fontWeight="bold">
          Game Over! Total Winnings: ${totalWinnings}
        </Text>
        <Button
          colorScheme="teal"
          onClick={() => {
            setIsGameOver(false);
            setStakeAmount(null); // Reset stake amount
          }}
        >
          Play Again (Requires New Payment)
        </Button>
        <Leaderboard scores={leaderboardScores} />
      </VStack>
    );
  }

  return (
    <VStack spacing={8} align="center">
      <Text fontSize="2xl" fontWeight="bold">
        {stakeAmount ? `Stake: $${stakeAmount}` : "Please pay to play"}
      </Text>

      {!stakeAmount && (
        <HStack spacing={4}>
          <Button colorScheme="blue" onClick={() => handlePayment(1)}>
            Pay $10 to Play
          </Button>
          <Button colorScheme="blue" onClick={() => handlePayment(20)}>
            Pay $20 to Play
          </Button>
        </HStack>
      )}

      {stakeAmount && (
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
