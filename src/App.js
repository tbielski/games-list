import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { getGames } from "./state/ducks/games/operations";
import Games from "./ui/games/Games";
import selectors from "./state/ducks/games/selectors";

function App() {
  return (
    <div className="App">
      <h1>Games</h1>
      <Games />
    </div>
  );
}

const mapStateToProps = (state) => ({ games: selectors.allGames(state) });

export default connect(mapStateToProps, { getGames })(App);
