import React from "react";
import "./components_style.css";
import { motion } from "framer-motion";

function grand_totalbox(props) {
  return (
    <div className="grand_totalbox">
      <div className="total_box">
        <h1>Total:</h1>
        <h1>$ {props.total}</h1>
      </div>

      <motion.button className="final_submit" onClick={props.submitItems} whileHover={{scale:1.1}}  whileTap={{ scale: 0.9, background: "green" , border: "black" }}
>
        Submit
      </motion.button>
    </div>
  );
}

export default grand_totalbox;
