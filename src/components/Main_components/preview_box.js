import React from "react";
import BudgetItem from "./budget_item";
import "./components_style.css";
import { motion } from "framer-motion";

function preview_box(props) {
  if (props.ListItem === []) {
    return null;
  }

  return (
    <div className="preview_box">
      <ol className="Orderedlist">
        {props.ListItem.map((data, index) => {
          return (
            <motion.li
            key={index}
              className="Listitem"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0}}>
              <BudgetItem
                data={data.data}
                key={data.Count}
                id={data.Count}
                handlesubmit={props.handlesubmit}
              />
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

export default preview_box;
