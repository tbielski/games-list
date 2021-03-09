import React from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { postGames } from "../../state/ducks/games/operations";
import selectorsGames from "../../state/ducks/games/selectors";
import selectorsProducers from "../../state/ducks/producers/selectors";
import "../../App.css";
import { postProducers } from "../../state/ducks/producers/operations";

const GamesForm = ({ producers, postGames, postProducers }) => {
  const formik = useFormik({
    initialValues: {
      gameName: "",
      producer: "",
      producerName: "",
      platform: "",
      gameStatus: "to_play",
      review: "",
      rating: "",
      dateStart: "",
      dateEnd: "",
    },
    onSubmit: (values) => {
      const res = producers.find((obj) => obj.name === values.producerName);
      if (res) {
        values.producer = res.id;
      } else {
        values.producer = producers.length;
        postProducers({ name: values.producerName });
      }
      delete values.producerName;
      postGames(values);
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        Podaj nazwę gry:{" "}
        <input
          id="gameName"
          name="gameName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.gameName}
        />
      </div>
      <div>
        Podaj platformę na której będziesz grać:{" "}
        <input
          id="platform"
          name="platform"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.platform}
        />
      </div>
      <div>
        Podaj nazwę producenta gry:{" "}
        <input
          id="producerName"
          name="producerName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.producerName}
        />
      </div>
      <button type="submit">Dodaj Grę</button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    games: selectorsGames.allGames(state),
    producers: selectorsProducers.allProducers(state),
  };
};

export default connect(mapStateToProps, {
  postGames,
  postProducers,
})(GamesForm);
