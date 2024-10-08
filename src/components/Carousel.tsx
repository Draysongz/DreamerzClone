import React, { useState, useEffect } from "react";
import { Box, Flex, Circle } from "@chakra-ui/react";

interface CarouselProps {
  slides: React.ReactNode[];
  intervalTime?: number; // optional prop to customize interval time
}

const Carousel: React.FC<CarouselProps> = ({ slides, intervalTime = 10000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to move to the next slide
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Function to manually go to a specific slide
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto slide with useEffect and setInterval
  useEffect(() => {
    const interval = setInterval(goToNextSlide, intervalTime);

    // Cleanup the interval when component unmounts
    return () => clearInterval(interval);
  }, [currentSlide, intervalTime]);


  const colors = ["green.500", "orange.500"];


  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="400px"
      w="100%"
      overflow="hidden"
      pos="relative"
      bg="gray.800"
      borderRadius="20px"
    >
      {/* Slide container */}
      <Box
        display="flex"
        w="100%"
        h="100%"
        transform={`translateX(-${currentSlide * 100}%)`}
        transition="transform 0.5s ease-in-out"
      >
        {slides.map((slide, index) => (
          <Box
            key={index}
            minW="100%"
            display="flex"
            justifyContent="center"
            bg={colors[index % colors.length]}
            color="white"
            fontSize="4xl"
          >
            {slide}
          </Box>
        ))}
      </Box>

      {/* Slide indicators */}
      <Flex pos="absolute" bottom="20px" justify="center" align="center">
        {slides.map((_, index) => (
          <Flex key={index} align="center">
            {currentSlide === index ? (
              <Box
                width="30px"
                height="10px"
                bg="gray.400"
                borderRadius="10px"
                m="2px"
              />
            ) : (
              <Circle
                size="10px"
                bg="rgba(0, 0, 0, 0.2)"
                m="2px"
                cursor="pointer"
                onClick={() => goToSlide(index)}
              />
            )}
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default Carousel;
