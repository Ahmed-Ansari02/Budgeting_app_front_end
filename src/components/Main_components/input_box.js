import React from "react";

import { motion } from "framer-motion";
import "./components_style.css";

function Input_box(props) {
  return (
    <div className="input_box">
      <form
        className="form_box"
        onSubmit={(e) => {
          e.preventDefault();
          props.submit(e);
        }}>
        <div className="form_box_heading">
          <b>Input items here</b>
        </div>
        <motion.div className="input_element" whileHover={{ scale: 1.05 }}>
          <p>Item:</p>
          <motion.input
            type="text"
            name="Item"
            className="text_box"
            whileFocus={{ scale: 1.05}}
          />
        </motion.div>

        <motion.div className="input_element" whileHover={{ scale: 1.05 }}>
          <p>Price:</p>
          <motion.input
            type="number"
            step="0.01"
            name="Item"
            className="text_box"
            whileFocus={{ scale: 1.05 }}
            placeholder={"Enter price in Dollars 💲"}
          />
        </motion.div>
        <motion.div className="input_element" whileHover={{ scale: 1.05}}>
          <p>Quantity:</p>

          <motion.input
            type="number"
            name="Item"
            className="text_box"
            whileFocus={{ scale: 1.05}}
            placeholder={"Enter Quantity"}
          />
        </motion.div>
        <motion.div className="input_element" whileHover={{ scale: 1.05 }}>
          <p>Category:</p>
          <motion.select
            name="category"
            className="dropDown"
            whileFocus={{ scale: 1.05 }}>
            <option value="Grocery">Grocery</option>
            <option value="Health">Health</option>
            <option value="Utilities">Utilities</option>
            <option value="Rent">Rent</option>
            <option value="Stationary">Stationary</option>
            <option value="Snacks">Snacks</option>
          </motion.select>
        </motion.div>
        <motion.div className="input_element" whileHover={{ scale: 1.05 }}>
          <p>Date:</p>
          <motion.input
            type="date"
            name="Item"
            className="text_box"
            whileFocus={{ scale: 1.05 }}
          />
        </motion.div>
        <motion.div
          className="input_element_submit"
          whileHover={{ scale: 1.05 }}>
          <motion.input
            type="submit"
            value="Add ➕"
            className="submit_btn"
            whileFocus={{ scale: 1.05 }}
            whileTap={{ scale: 0.9, background: "green", border: "black" }}
          />
        </motion.div>
      </form>
    </div>
  );
}

export default Input_box;
