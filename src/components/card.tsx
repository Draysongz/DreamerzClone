// Card.tsx

import React from "react";
import "../index.css";
import { CardType } from "./data"; // Import the CardType interface for type safety

// Define the type for the props passed to the Card component
interface CardProps {
  item: CardType;
  handleSelectedCards: (item: CardType) => void;
  toggled: boolean;
  stopflip: boolean;
}

// Functional Component with typed props
const Card: React.FC<CardProps> = ({
  item,
  handleSelectedCards,
  toggled,
  stopflip,
}) => {
  return (
    <div className="item">
      <div className={toggled ? "toggled" : ""}>
        <img className="face" src={item.img} alt="face" />
        <div
          className="back"
          onClick={() => !stopflip && handleSelectedCards(item)}
        >
          {" "}
        </div>
      </div>
    </div>
  );
};

export default Card;
