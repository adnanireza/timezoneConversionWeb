import React, { useContext } from "react";
import { Context } from "../context/citiesContext";

export default function({ orient }) {
  const styles = {
    overflow: {
      //display: "flex",
      fontSize: 14
    }
  };
  const { state } = useContext(Context);
  const text = state[orient].overflow;
  return text ? <p style={styles.overflow}>{"(" + text + ")"}</p> : null;
}
