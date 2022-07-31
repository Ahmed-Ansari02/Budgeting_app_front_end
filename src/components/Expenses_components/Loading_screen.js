import "./Expenses_style.css";
import React from "react";
import { motion } from "framer-motion";

function Loading_screen() {
  return (
    <motion.div className="Loading_screen" transition={{ duration: 2 }}>
      <motion.div
        className="Loading_logo"
        animate={{ rotate: 360 }}
        exit={{ opacity: [1, 0.8, 0.4, 0] }}
        transition={{ duration: 0.8}}
      />
      <h1>Loading.....</h1>
    </motion.div>
  );
}

export default Loading_screen;
