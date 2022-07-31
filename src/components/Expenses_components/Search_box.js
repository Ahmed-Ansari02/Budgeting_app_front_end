import React from "react";
import "./Expenses_style.css"
import { motion } from "framer-motion";

function Search_box({get_search_box_value}) {
  return (
    <div className="search_box">
      <form className="search_row" onSubmit={(e) => e.preventDefault()} onChange={get_search_box_value}>
        <motion.input
          className="search_field"
          name="search_querry"
          placeholder="What Item are you looking for ?"
          type="text"
          ></motion.input>
        <motion.input
          className="search_button"
          type="submit"
          value=" "
          whileHover={{scale:1.1}} whileTap={{scale:0.9}}></motion.input>
      </form>
    </div>
  );
}

export default Search_box;
