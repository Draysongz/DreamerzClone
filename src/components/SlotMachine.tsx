import React, { useState, useEffect } from 'react';
import { Box, Button, Text, VStack, HStack, useToast, Stack, Divider } from '@chakra-ui/react';

const symbols = [
  '/slot/seven.png',
  '/slot/cherries.png',
  '/slot/lemon.png',
  '/slot/orange.png',
  '/slot/watermelon.png',
  '/slot/grape.png',
  '/slot/star.png',
  '/slot/diamond.png',
];
interface profileProps{
  userData: any
}

const SlotMachine: React.FC<profileProps> = ({userData}) => {
  const COOLDOWN_TIME = 1 * 60 * 1000; // 1 minute cooldown in milliseconds
  console.log(userData)

  const [reels, setReels] = useState<string[][]>([[], [], []]);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [stake, setStake] = useState<number>(0); // Amount paid to play
  const [userPoints, setUserPoints] = useState<number>(0); // User's total points
  const [multiplier, setMultiplier] = useState<number>(0);
  const [cooldown, setCooldown] = useState<boolean>(false);
  const [cooldownEndTime, setCooldownEndTime] = useState<number | null>(null);
  const [hasPaid, setHasPaid] = useState<boolean>(false); // Track if user has paid
  const toast = useToast();

  // Cooldown logic to prevent immediate replay
  useEffect(() => {
    if (cooldownEndTime) {
      const interval = setInterval(() => {
        const remainingTime = cooldownEndTime - Date.now();
        if (remainingTime <= 0) {
          setCooldown(false);
          setCooldownEndTime(null);
          setHasPaid(false); // Reset payment status after cooldown
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [cooldownEndTime]);

  const payToPlay = () => {
    if (stake <= 0) {
      toast({
        title: 'Enter a valid stake amount to play.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setUserPoints((prev) => prev + stake); // Add stake to user's points
    setHasPaid(true); // Mark user as having paid
    setIsSpinning(true);
    spinReels();
  };

  const spinReels = () => {
    const spinDuration = 3000;
    const intervalTime = 100;

    const spinInterval = setInterval(() => {
      setReels(reels.map(() =>
        Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)])));
    }, intervalTime);

    setTimeout(() => {
      clearInterval(spinInterval);
      setIsSpinning(false);
      evaluateResults();
    }, spinDuration);
  };

  const evaluateResults = () => {
    const results = reels.map(reel => reel[1]); // Middle symbol from each reel
    const [reel1, reel2, reel3] = results;

    let winMultiplier = 0;

    // Check if all three reels match
    if (reel1 === reel2 && reel3) {
      winMultiplier = 3; // 3x multiplier for matching symbols
      toast({
        title: `Congratulations! All reels match! Multiplier: x${winMultiplier}`,
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    } else {
      // Deduct the stake amount if the player loses
      setUserPoints((prev) => prev - stake);
      toast({
        title: 'You lose! Better luck next time!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    // Update user points if the player wins
    if (winMultiplier > 0) {
      setMultiplier(winMultiplier);
      setUserPoints(userPoints + (stake * winMultiplier)); // Multiply stake by win multiplier
    }

    // Apply cooldown after the game is played
    setCooldown(true);
    setCooldownEndTime(Date.now() + COOLDOWN_TIME);
  };

  return (
    
    <VStack spacing={5} align="center" padding={5}>
    <Text fontWeight={700} fontSize={"22px"} alignSelf={'flex-start'}>
            Lucky Spin
    </Text>
      <Text fontSize="3xl" fontWeight="bold">🎰 Slot Machine 🎰</Text>
      <HStack spacing={4}>
        {reels.map((reel, index) => (
          <Box key={index} borderWidth={1} borderRadius="md" p={4} bg="gray.100" boxShadow="md">
            <Stack spacing={2} align="center">
              {reel.map((symbol, idx) => (
                <img key={idx} src={symbol} alt={`slot-symbol-${idx}`} style={{ width: '50px', height: '50px' }} />
              ))}
            </Stack>
          </Box>
        ))}
      </HStack>
      <Divider />
      <HStack spacing={4} paddingY={3}>
        <Text fontSize="">Enter Stake Amount:</Text>
        <input
          type="number"
          value={stake}
          onChange={(e) => setStake(parseInt(e.target.value))}
          disabled={cooldown || isSpinning}
          style={{width: '40%'}}
        />
        <Button
          onClick={payToPlay}
          isDisabled={isSpinning || cooldown || hasPaid}
          colorScheme="teal"
        >
          {cooldown ? 'Wait 1 Minute' : 'Play'}
        </Button>
      </HStack>
      <Text fontSize="lg">Multiplier: x{multiplier}</Text>
      <Text fontSize="lg">Points: {userPoints}</Text> {/* Reflect only the total points */}
    </VStack>
  );
};

export default SlotMachine;
