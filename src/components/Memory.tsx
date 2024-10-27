import React, { useEffect, useState } from "react";
import { 
  Button, 
  Text, 
  VStack,
  Image, 
  useToast, 
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
  Box
} from "@chakra-ui/react";
import Data, { CardType } from "./data";
import Card from "./card";
import "../index.css";

const MemoryGame: React.FC = () => {
  const [cardsArray, setCardsArray] = useState<CardType[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [firstCard, setFirstCard] = useState<CardType | null>(null);
  const [secondCard, setSecondCard] = useState<CardType | null>(null);
  const [stopFlip, setStopFlip] = useState<boolean>(false);
  const [matchesFound, setMatchesFound] = useState<number>(0); // Track matches found
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [paymentMade, setPaymentMade] = useState<boolean>(false);
  const [moveLimit, setMoveLimit] = useState<number>(3);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [totalWinnings, setTotalWinnings] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const NewGame = () => {
    const shuffledArray = Data.sort(() => 0.5 - Math.random()).map(card => ({
      ...card,
      matched: false,
    }));
    setCardsArray(shuffledArray);
    setMoves(0);
    setFirstCard(null);
    setSecondCard(null);
    setMatchesFound(0); // Reset matches found
    setGameOver(false);
  };

  // Select cards
  const handleSelectedCards = (item: CardType) => {
    if (stopFlip || gameOver || moves >= moveLimit) return; // Removed won check
    firstCard ? setSecondCard(item) : setFirstCard(item);
  };

  useEffect(() => {
    if (firstCard && secondCard) {
      setStopFlip(true);

      if (firstCard.name === secondCard.name) {
        setCardsArray(prevArray =>
          prevArray.map(card =>
            card.name === firstCard.name ? { ...card, matched: true } : card
          )
        );
        setMatchesFound(prev => prev + 1); // Increment matches found
        resetSelection();
      } else {
        setTimeout(resetSelection, 1000);
      }
    }
  }, [firstCard, secondCard]);

  const resetSelection = () => {
    setFirstCard(null);
    setSecondCard(null);
    setStopFlip(false);
    setMoves(prevMoves => prevMoves + 1);
  };

  // Win case
  const handleWin = () => {
    const winAmount = paymentAmount * 2;
    setTotalWinnings(prev => prev + winAmount);
    toast({
      title: `You won $${winAmount}!`,
      description: `Your total winnings are now $${totalWinnings + winAmount}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  useEffect(() => {
    if (moves >= moveLimit && !gameOver) {
      setGameOver(true);
    }
  }, [moves, moveLimit]);

  // Loss case
  const handleLoss = () => {
    setTotalWinnings(0); // Reset total winnings
    toast({
      title: "Game Over",
      description: 'You lost. Try again!',
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  useEffect(() => {
    if (moves >= moveLimit && !gameOver) {
      setGameOver(true);
      handleLoss(); 
    }
  }, [moves, moveLimit]);

  useEffect(() => {
    if (matchesFound >= 2) { // Check if two matches have been found
      handleWin();
    }
  }, [matchesFound]);

  const handlePayment = (amount: number) => {
    setPaymentAmount(amount);
    setPaymentMade(true);
    setMoveLimit(3);
    setMoves(0);
    setGameOver(false);
    NewGame(); // Start a new game upon successful payment
    onClose();
    toast({
      title: `Payment successful!,
      description: You have ${moveLimit} moves to find two matches.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={8}>
      <Text fontSize="2xl" fontWeight="bold">Memory Game</Text>
      
      {!paymentMade && <Image src="/flip-n-match.webp" />} {/* Only show image before game starts */}

      {!paymentMade && (
        <Button colorScheme="blue" onClick={onOpen}>
          Start Game (Requires Payment)
        </Button>
      )}

      {paymentMade && (
        <Box display={'flex'} flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'} w={'100vw'}
        gap={5}>
          <Box className="board" w={'100%'}>
            {cardsArray.map(item => (
              <Card
                key={item.id}
                item={item}
                handleSelectedCards={handleSelectedCards}
                toggled={item === firstCard || item === secondCard || item.matched}
                stopflip={stopFlip}
              />
            ))}
          </Box>

          {gameOver ? (
            <Text fontSize="lg" color="red.500">😢 Game Over! Try again. 😢</Text>
          ) : (
            <Text>Moves: {moves} / {moveLimit}</Text>
          )}

          <Text fontSize="lg">Total Winnings: ${totalWinnings}</Text>

          <Button onClick={onOpen} colorScheme="teal" w={'50%'} h={'60px'}>
            Play Again
          </Button>
        </Box>
      )}

      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Make Payment</DrawerHeader>

          <DrawerBody>
            <Box display={'flex'} flexDirection={'column'} gap={5}>
              <FormControl>
                <FormLabel>Amount</FormLabel>
                <NumberInput max={100} min={1} onChange={(_, valueAsNumber) => setPaymentAmount(valueAsNumber)}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>Cancel</Button>
            <Button colorScheme="green" onClick={() => handlePayment(paymentAmount)}>
              Confirm Payment
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </VStack>
  );
};

export default MemoryGame;