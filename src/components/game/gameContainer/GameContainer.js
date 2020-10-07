import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import GameCell from "../gameCell/GameCell";
import UIfx from "uifx";
import enterance from "../../../game-sounds/enterance.mp3";
import "./GameContainer.scss";

const GameContainer = ({
  rowCount = 5,
  colCount = 5,
  setGameStatus,
  resetInputValues,
  history,
}) => {
  const [gameCellList, setGameCellList] = useState([]);
  const [resetGame, setResetGame] = useState(false);
  const [isRevealAll, setIsRevealAll] = useState(false);
  const [minesArray, setMinesArray] = useState([]);
  const [tileCount, setTileCount] = useState([]);
  const mineList = [];

  useEffect(() => {
    mineListGenerator();
    createCellDataRows();
    setIsRevealAll(false);
    grandEnterance.play();
  }, [resetGame]);

  const grandEnterance = new UIfx(enterance);

  /** Random Positive number Generator */
  const getRandomNumber = (min, max) => Math.floor(Math.random() * max + min);

  /** Create Mine Bomb List */
  const mineListGenerator = () => {
    const totalTiles = rowCount * colCount;
    const mineCount = Math.ceil(totalTiles * (30 / 100)); // 30% of tiles are mines
    let randomNumber;
    let i;
    for (i = 0; i < mineCount; i++) {
      randomNumber = getRandomNumber(0, totalTiles);
      if (!mineList.includes(randomNumber)) mineList.push(randomNumber);
    }
    setMinesArray(mineList);
  };

  /** Creates Mine Sweeper Grid */
  const createCellDataRows = () => {
    let i;
    let j;
    let cellList = [];
    let updatedCellList = [];
    let colData = {};
    let index;
    for (i = 0; i < rowCount; i++) {
      cellList[i] = [];
      for (j = 0; j < colCount; j++) {
        index = j + i * rowCount;
        colData = {
          index: index,
          cellData: mineList.includes(index) ? -1 : 0,
        };
        cellList[i].push(colData);
      }
    }
    updatedCellList = addMineCount(cellList);
    setGameCellList(updatedCellList);
  };

  /**Update Mine Count on Adjacent Tiles */
  const updateNearbyMineCount = (cellList, rowIndex, colIndex) => {
    // Create Above Row List
    const prevCol = colIndex - 1;
    const currCol = colIndex;
    const nextCol = colIndex + 1;
    const prevRow = rowIndex - 1;
    const currRow = rowIndex;
    const nextRow = rowIndex + 1;
    const navigateCols = [prevCol, currCol, nextCol];
    const navigateRows = [prevRow, currRow, nextRow];

    let aboveRowList = [];
    // Create Above List
    for (let i = 0; i < 3; i++) {
      aboveRowList.push(
        typeof cellList[navigateRows[0]] !== "undefined" &&
          typeof cellList[navigateRows[0]][navigateCols[i]] !== "undefined"
          ? cellList[navigateRows[0]][navigateCols[i]]
          : null
      );
    }
    // Create Current Row List
    let currentRowList = [];
    for (let i = 0; i < 3; i++) {
      if (i === 1) continue;
      currentRowList.push(
        typeof cellList[navigateRows[1]] !== "undefined" &&
          typeof cellList[navigateRows[1]][navigateCols[i]] !== "undefined"
          ? cellList[navigateRows[1]][navigateCols[i]]
          : null
      );
    }

    // Create Below Row List
    let belowRowList = [];
    for (let i = 0; i < 3; i++) {
      belowRowList.push(
        typeof cellList[navigateRows[2]] !== "undefined" &&
          typeof cellList[navigateRows[2]][navigateCols[i]] !== "undefined"
          ? cellList[navigateRows[2]][navigateCols[i]]
          : null
      );
    }
    // Update the cellData by 1 for nearby tiles
    const mergedList = [...aboveRowList, ...currentRowList, ...belowRowList];
    mergedList.forEach((cell) => {
      if (cell && cell.cellData !== -1) cell.cellData += 1;
    });

    return cellList;
  };

  /** Add Mine Count to all tiles in the game*/
  const addMineCount = (cellList) => {
    let updatedCellList;
    if (cellList.length) {
      cellList.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
          if (cell.cellData === -1) {
            updatedCellList = updateNearbyMineCount(
              cellList,
              rowIndex,
              cellIndex
            );
          }
        });
      });
    }
    return updatedCellList;
  };

  /* Update Mine field */
  const updateMinefield = ({ cellData }) => {
    //Mine
    if (cellData === -1) {
      setIsRevealAll(true);
      setGameStatus("over");
    } else {
      //Empty Tiles
      setTileCount([...tileCount, cellData]);
      const safeTileCount = rowCount * colCount - minesArray.length;
      if (tileCount.length === safeTileCount - 1) {
        setIsRevealAll(true);
        setGameStatus("winner");
      }
    }
  };

  const resetGameBoard = (e) => {
    let key = e.which || e.keyCode || "click";
    // Accepts only Click and the enter Key
    const acceptedInputs = [13, 32, "click"];
    if (acceptedInputs.includes(key)) {
      setIsRevealAll(false);
      setResetGame(!resetGame);
      setTileCount([]);
    }
  };

  const backToMainPage = () => {
    resetInputValues();
    history.push("/");
  };

  const mineTableBody = () => {
    let mineBody = [];
    if (gameCellList && gameCellList.length) {
      mineBody = gameCellList.map((row, rowIndex) => {
        return (
          <tr key={rowIndex}>
            {row.map((col, colIndex) => {
              let index = colIndex + 1 + rowIndex * rowCount;
              return (
                <td key={colIndex}>
                  <GameCell
                    cell={col}
                    index={index}
                    isRevealAll={isRevealAll}
                    resetGame={resetGame}
                    updateMinefield={updateMinefield}
                  />
                </td>
              );
            })}
          </tr>
        );
      });
    }
    return mineBody;
  };
  return (
    <div className="container-fluid">
      <div className="row game-container-controls">
        <div className="col-4"></div>
        <div className="col-4 d-flex justify-content-center">
          <span
            tabIndex="0"
            onClick={(e) => resetGameBoard(e)}
            onKeyDown={(e) => resetGameBoard(e)}
          >
            <i className="fas fa-redo"></i>
          </span>
        </div>
        <div className="col-4 d-flex justify-content-end">
          <button
            className="btn btn-outline-info"
            onClick={() => {
              backToMainPage();
            }}
          >
            Back
          </button>
        </div>
      </div>
      <table className="game-container">
        <tbody>{mineTableBody()}</tbody>
      </table>
    </div>
  );
};
GameContainer.propTypes = {
  rowCount: PropTypes.string,
  colCount: PropTypes.string,
  setGameStatus: PropTypes.func.isRequired,
  resetInputValues: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(GameContainer);
