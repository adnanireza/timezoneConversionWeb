import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import ArrowLeftOutlinedIcon from "@material-ui/icons/ArrowLeftOutlined";
import ArrowRightOutlinedIcon from "@material-ui/icons/ArrowRightOutlined";
import { Context } from "../context/citiesContext";
import { Orient } from "../utils/orient.js";

export default function Arrow({ orient, data }) {
  const styles = {
    arrowDiv: {
      display: "flex",
      marginLeft: 10,
      marginRight: 10
    }
  };

  const { arrowClicked } = useContext(Context);
  return orient === Orient.LEFT ? (
    <div style={styles.arrowDiv}>
      <Button
        onClick={() => arrowClicked(data, orient)}
        variant="outlined"
        color="default"
      >
        <ArrowRightOutlinedIcon className="Arrow" style={styles.arrow} />
      </Button>
    </div>
  ) : (
    <div style={styles.arrowDiv}>
      <Button
        onClick={() => arrowClicked(data, orient)}
        variant="outlined"
        color="default"
      >
        <ArrowLeftOutlinedIcon className="Arrow" style={styles.arrow} />
      </Button>
    </div>
  );
}
