import React from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { patchGames } from "../../state/ducks/games/operations";
import "../../App.css";

const ReviewForm = ({ id, patchGames }) => {
  const formik = useFormik({
    initialValues: {
      id: id,
      review: "",
      rating: "",
      gameStatus: "reviewed",
    },
    onSubmit: (values) => {
      patchGames(values);
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        Recenzja:{" "}
        <input
          id="review"
          name="review"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.review}
        />
      </div>
      <div>
        Ocena:{" "}
        <input
          id="rating"
          name="rating"
          type="number"
          min="0"
          max="10"
          step="1"
          onChange={formik.handleChange}
          value={formik.values.rating}
        />
      </div>
      <button type="submit">Dodaj recenzję</button>
    </form>
  );
};

export default connect(null, {
  patchGames,
})(ReviewForm);
