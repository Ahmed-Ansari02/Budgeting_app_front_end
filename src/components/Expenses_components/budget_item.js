import React from "react";
import { motion } from "framer-motion";
import "./Expenses_style.css";
import { useRef, useEffect, useState } from "react";

const categories = ["Item", "Price", "Quantity", "Category", "Date"];

function Budget_item({ data, remove_budget_item, remove_item_id, renderDel }) {
  const myRef = useRef();
  const [Width, setWidth] = useState(0);
  const [Remove, setRemove] = useState(false);
  useEffect(() => {
    setWidth(myRef.current.clientWidth);
  }, []);
  useEffect(() => {
    if (!renderDel) {
      setRemove(false);
    }
  }, [renderDel]);

  const data_array = Object.entries(data);
  data_array.splice(0, 1);
  if (data === []) {
    return null;
  }
  const elements_display = data_array.map((element, index) => {
    if (index === 4) {
      element[1] = element[1].toLocaleDateString();
    }
    return (
      <div className="item_expense" key={index}>
        <p className="item_tag_expense">{categories[index]}</p>
        {index === 1 ? "$" + element[1] : element[1]}
      </div>
    );
  });
  return (
    <motion.div
      className="budget_item_expense"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragSnapToOrigin={1}
      onDragEnd={(event, info) => {
        if (info.offset.x > Width * 0.7) {
         
          remove_budget_item(data.id);
        }
      
      }}
      ref={myRef}
      whileDrag={{ scale: 1.01 }}>
      {elements_display}
      <motion.button
        className={Remove ? "btn_remove" : "btn_maintain"}
        onClick={() => {
          setRemove(!Remove);
          remove_item_id(data.id);
        }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.9 }}
      />
    </motion.div>
  );
}

export default Budget_item;
