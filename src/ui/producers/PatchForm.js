import React from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { patchProducers } from "../../state/ducks/producers/operations";
import "../../App.css";

const PatchForm = ({ id, patchProducers }) => {
  const formik = useFormik({
    initialValues: {
      id: id,
      name: "",
    },
    onSubmit: (values) => {
      patchProducers(values);
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        Podaj nową nazwę producenta:{" "}
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
      </div>
      <button type="submit">Zatwierdź</button>
    </form>
  );
};

export default connect(null, {
  patchProducers,
})(PatchForm);
