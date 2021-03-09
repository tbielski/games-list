import {
  GAMES_REQUEST,
  GAMES_GET,
  GAMES_DELETE,
  GAMES_PATCH,
  GAMES_FAILURE,
} from "./types";
import { createAction } from "redux-api-middleware";
import { normalize, schema } from "normalizr";

const gameSchema = new schema.Entity("games");
const gamesSchema = new schema.Array(gameSchema);

export const getGames = () => (dispatch) =>
  dispatch(
    createAction({
      endpoint: `http://localhost:5000/games`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      types: [
        GAMES_REQUEST,
        {
          type: GAMES_GET,
          payload: async (action, state, res) => {
            const json = await res.json();
            const { entities } = normalize(json, gamesSchema);
            return entities;
          },
          meta: { actionType: "GET_ALL" },
        },
        GAMES_FAILURE,
      ],
    })
  );

export const postGames = (values) => (dispatch) =>
  dispatch(
    createAction({
      endpoint: `http://localhost:5000/games`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values }),
      types: [
        GAMES_REQUEST,
        {
          type: GAMES_GET,
          payload: async (action, state, res) => {
            const json = await res.json();
            const { entities } = normalize(json, gameSchema);
            return entities;
          },
          meta: { actionType: "GET_ONE" },
        },
        GAMES_FAILURE,
      ],
    })
  );

export const deleteGames = (id) => (dispatch) =>
  dispatch(
    createAction({
      endpoint: `http://localhost:5000/games/${id}`,
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
      types: [
        GAMES_REQUEST,
        {
          type: GAMES_DELETE,
          payload: async (action, state, res) => {
            const entities = { games: { id } };
            return entities;
          },
          meta: { actionType: "DELETE_ONE" },
        },
        GAMES_FAILURE,
      ],
    })
  );

export const patchGames = (values) => (dispatch) =>
  dispatch(
    createAction({
      endpoint: `http://localhost:5000/games/${values.id}`,
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
      }),
      types: [
        GAMES_REQUEST,
        {
          type: GAMES_PATCH,
          payload: async (action, state, res) => {
            const json = await res.json();
            const { entities } = normalize(json, gameSchema);
            return entities;
          },
          meta: { actionType: "GET_ONE" },
        },
        GAMES_FAILURE,
      ],
    })
  );
