import React from "react";
import TimeDate from "./TimeDate";
import TimePane from "./TimePane";
import { Orient } from "../utils/orient.js";

export default function TimeBody() {
  return (
    <div>
      <div style={styles.timePanes}>
        <div style={styles.pane}>
          <TimePane orient={Orient.LEFT} />
        </div>
        <div style={styles.pane}>
          <TimePane orient={Orient.RIGHT} />
        </div>
      </div>
      <TimeDate />
    </div>
  );
}

const styles = {
  timePanes: {
    //backgroundColor: "#dddddd",
    marginLeft: "200px",
    marginRight: "200px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: "10px",
    rowGap: "10px"
    //justifyContent: "center"
  },
  pane: {
    //    textAlign: "center"
    //backgroundColor: "red"
  }
};
