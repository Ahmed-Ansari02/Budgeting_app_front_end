import React, { useState } from "react";
import { useEffect } from "react";
import "./Expenses_style.css";
let avg = 0;

function Expenses_summary({ summary_data, avg }) {
 

  return (
    <div className="Expenses_summary">
      <div className="Expenses_item">
        <p className="heading">This Month Total: </p>
        <p className="value">
          $ {summary_data.curr_month_total[0].Total_price}
        </p>
      </div>
      <div className="Expenses_item">
        <p className="heading">Last Month Total: </p>
        <p className="value">
          $ {summary_data.last_month_total[0].Total_price}
        </p>
      </div>
      <div className="Expenses_item">
        <p className="heading">Monthly change: </p>
        <p className="value">
          $
          {summary_data.curr_month_total[0].Total_price -
            summary_data.last_month_total[0].Total_price}
        </p>
      </div>
      <div className="Expenses_item">
        <p className="heading">Monthly Average: </p>
        <p className="value">$ {avg}</p>
      </div>

      <div className="Expenses_item">
        <p className="heading">Greatest Expense: </p>
        {summary_data.greatest_exp[0] ? (
          <p className="value">
            {summary_data.greatest_exp[0].item}(
            {"$" + summary_data.greatest_exp[0].Total_price})
          </p>
        ) : (
          <p className="value">N.A</p>
        )}
      </div>
      <div className="Expenses_item">
        <p className="heading">Most Bought: </p>
        {summary_data.most_bought[0] ? (
          <p className="value">
            {summary_data.most_bought[0].item}(
            {summary_data.most_bought[0].quantity})
          </p>
        ) : (
          <p className="value">N.A</p>
        )}
      </div>
    </div>
  );
}

export default Expenses_summary;
