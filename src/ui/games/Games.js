import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getGames,
  deleteGames,
  patchGames,
} from "../../state/ducks/games/operations";
import { getProducers } from "../../state/ducks/producers/operations";
import GamesForm from "./GamesForm.js";
import ReviewForm from "./ReviewForm.js";
import PatchForm from "../producers/PatchForm.js";
import selectorsGames from "../../state/ducks/games/selectors";
import selectorsProducers from "../../state/ducks/producers/selectors";

const Games = ({
  games,
  producers,
  getGames,
  getProducers,
  deleteGames,
  patchGames,
}) => {
  useEffect(() => {
    getGames();
    getProducers();
  }, [getGames, getProducers]);

  const handleDelete = (id) => {
    deleteGames(id);
  };

  const handleStart = (values) => {
    patchGames(values);
  };

  const handleEnd = (values) => {
    patchGames(values);
  };

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const today_slashed = day + "/" + month + "/" + year;

  return (
    <div>
      <GamesForm />
      {games &&
        games.map((game) => (
          <React.Fragment key={game.id}>
            <h3>{game.gameName}</h3>
            <h5>
              Producent:{" "}
              {producers.find((prod) => prod.id === game.producer)?.name}
            </h5>
            <PatchForm id={game.producer}/>
            <h5>Platforma: {game.platform}</h5>
            <div>Status: {game.gameStatus}</div>
            <div>
              {game.dateStart !== "" ? (
                <div>Data rozpoczęcia grania: {game.dateStart}</div>
              ) : (
                <div>Gra jeszcze nie zaczęta</div>
              )}
            </div>
            <div>
              {game.dateStart !== "" && game.dateEnd !== "" ? (
                <div>Data ukończenia gry: {game.dateEnd}</div>
              ) : (
                ""
              )}
            </div>
            <div>
              {game.gameStatus === "to_play" ? (
                <button
                  onClick={() => {
                    handleStart({
                      id: game.id,
                      dateStart: today_slashed,
                      gameStatus: "playing",
                    });
                  }}
                >
                  Start
                </button>
              ) : (
                ""
              )}
            </div>
            <div>
              {game.gameStatus === "playing" ? (
                <button
                  onClick={() => {
                    handleEnd({
                      id: game.id,
                      dateEnd: today_slashed,
                      gameStatus: "done",
                    });
                  }}
                >
                  Koniec
                </button>
              ) : (
                ""
              )}
            </div>
            <div>
              {game.gameStatus === "done" ? <ReviewForm id={game.id} /> : ""}
            </div>
            <div>
              {game.review !== "" ? (
                <div>
                  <div>Recenzja: {game.review}</div>
                  <div>Ocena: {game.rating}/10</div>
                </div>
              ) : (
                ""
              )}
            </div>
            <button onClick={() => handleDelete(game.id)}>Usuń grę</button>
          </React.Fragment>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    games: selectorsGames.allGames(state),
    producers: selectorsProducers.allProducers(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGames: () => {
      dispatch(getGames());
    },
    getProducers: () => {
      dispatch(getProducers());
    },
    deleteGames: (id) => {
      dispatch(deleteGames(id));
    },
    patchGames: (id) => {
      dispatch(patchGames(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Games);
