import React from 'react';

// Import react-circular-progressbar module and styles
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Radial separators
import RadialSeparators from "./RadialSeparators";

export default function CircleProgressBar(props) {

  return (
    <CircularProgressbarWithChildren
        value={props.percent}
        text={`${props.percent}%`}
        strokeWidth={10}
        styles={buildStyles({
          strokeLinecap: "butt"
        })}
      >
        <RadialSeparators
          count={12}
          style={{
            background: "#fff",
            width: "2px",
            // This needs to be equal to props.strokeWidth
            height: `${10}%`
          }}
        />
      </CircularProgressbarWithChildren>
  );
}

