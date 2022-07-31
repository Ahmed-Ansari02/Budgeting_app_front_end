import React from "react";
import { motion } from "framer-motion";
import "./components_style.css";

const categories=["Item", "Price", "Quantity","Category"]

function budget_item(props) {

  //const data_array = props.data;
  if (props.data === []) {
    return null;
  }
  const elements_display = props.data.map((element, index) => {
    if (index === 4) {
      return null;
    }
    return (
      <div className="item" key={index}>
        <p className="item_tag">{categories[index]}</p>
        {index===1? "$" + element: element}
      </div>
    );
  });
  return (
    <motion.div className="budget_item">
      {elements_display}
      <motion.button
        className="btn"
        onClick={() => props.handlesubmit(props.id)}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      />
    </motion.div>
  );
}

export default budget_item;
