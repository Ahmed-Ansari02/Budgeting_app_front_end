import React from "react";
import BudgetItem from "./budget_item";
import "./Expenses_style.css";
import { motion } from "framer-motion";

function Search_results({
  ListItem,
  remove_budget_item,
  remove_item_id,
  renderDel,
  delete_btn_handler,
}) {
  function directions() {
    return (
      <motion.div
        className="directions"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}>
        Swipe Right to remove an item or click the trash can to select items
      </motion.div>
    );
  }
  function renderDeleteBtn() {
    return (
      <motion.button
        className="delete_btn"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9, background: "green", border: "black" }}
        onClick={delete_btn_handler}>
        Delete
      </motion.button>
    );
  }
  return (
    <div className="search_results_box ">
      {renderDel ? renderDeleteBtn() : directions()}

      <div className="search_results">
        {ListItem.map((data, index) => {
          return (
            <motion.div
              key={index}
              className="Listitem_expense"
              whileHover={{ scale: 1.01 }}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}>
              <BudgetItem
                data={data}
                id={index}
                remove_budget_item={remove_budget_item}
                remove_item_id={remove_item_id}
                renderDel={renderDel}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Search_results;
