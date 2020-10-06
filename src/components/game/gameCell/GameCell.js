import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import bombIcon from "../../../icons/bomb-solid.svg";
import "./GameCell.scss";

const GameCell = ({ cell, isRevealAll, resetGame, updateMinefield }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  useEffect(() => {
    setIsRevealed(false);
  }, [resetGame]);
  // On Click of a cell
  const cellSelected = (e) => {
    let key = e.which || e.keyCode || "click";
    // Accepts only Click and the enter Key
    const acceptedInputs = [13, "click"];
    if (acceptedInputs.includes(key) && !isRevealed) {
      setIsRevealed(true);
      updateMinefield(cell);
    }
  };
  return (
    <div
      className="game-cell"
      onKeyDown={(e) => cellSelected(e)}
      onClick={(e) => cellSelected(e)}
      tabIndex="0"
    >
      {isRevealed || isRevealAll ? (
        cell.cellData === -1 ? (
          <img src={bombIcon} alt="Bomb" />
        ) : (
          cell.cellData
        )
      ) : (
        ""
      )}
    </div>
  );
};
GameCell.propTypes = {
  cell: PropTypes.object.isRequired,
  resetGame: PropTypes.bool.isRequired,
  isRevealAll: PropTypes.bool.isRequired,
  updateMinefield: PropTypes.func.isRequired,
};

export default GameCell;
