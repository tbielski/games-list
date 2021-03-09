import { PRODUCERS_REQUEST, PRODUCERS_GET, PRODUCERS_PATCH, PRODUCERS_FAILURE } from "./types";
import { createAction } from "redux-api-middleware";
import { normalize, schema } from "normalizr";

const producerSchema = new schema.Entity("producers");
const producersSchema = new schema.Array(producerSchema);

export const getProducers = () => (dispatch) =>
  dispatch(
    createAction({
      endpoint: `http://localhost:5000/producers`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      types: [
        PRODUCERS_REQUEST,
        {
          type: PRODUCERS_GET,
          payload: async (action, state, res) => {
            const json = await res.json();
            const { entities } = normalize(json, producersSchema);
            return entities;
          },
          meta: { actionType: "GET_ALL" },
        },
        PRODUCERS_FAILURE,
      ],
    })
  );

export const postProducers = (values) => (dispatch) =>
  dispatch(
    createAction({
      endpoint: `http://localhost:5000/producers`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values }),
      types: [
        PRODUCERS_REQUEST,
        {
          type: PRODUCERS_GET,
          payload: async (action, state, res) => {
            const json = await res.json();
            const { entities } = normalize(json, producerSchema);
            return entities;
          },
          meta: { actionType: "GET_ONE" },
        },
        PRODUCERS_FAILURE,
      ],
    })
  );

  export const patchProducers = (values) => (dispatch) =>
  dispatch(
    createAction({
      endpoint: `http://localhost:5000/producers/${values.id}`,
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
      }),
      types: [
        PRODUCERS_REQUEST,
        {
          type: PRODUCERS_PATCH,
          payload: async (action, state, res) => {
            const json = await res.json();
            const { entities } = normalize(json, producerSchema);
            return entities;
          },
          meta: { actionType: "GET_ONE" },
        },
        PRODUCERS_FAILURE,
      ],
    })
  );
