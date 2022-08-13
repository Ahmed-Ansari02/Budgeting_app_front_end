import React, { useEffect, useState } from "react";
import "./pages_style.css";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

import ExpensesSummary from "../components/Expenses_components/Expenses_summary";
import Line_graph from "../components/Expenses_components/Line_graph";
import Bar_graph from "../components/Expenses_components/Bar_graph";
import Search_box from "../components/Expenses_components/Search_box";
import Search_results from "../components/Expenses_components/Search_results";
import Loading_screen from "../components/Expenses_components/Loading_screen";

let item_list_db_json = [];
let line_graph_data_db_json = [];
const server_url = "https://budgetting-app-server.herokuapp.com";
function Expenses({ User }) {
  const [Loaded, setLoaded] = useState(false);
  const [BudgetList, setBudgetList] = useState([]);
  const [SummaryData, setSummaryData] = useState([]);
  const [LineGraphData, setLineGraphData] = useState([]);
  const [BarGraphData, setBarGraphData] = useState([]);
  const [Avg, setAvg] = useState(0);
  const [Item_remove_id_list, setItem_remove_id_list] = useState([]);
  const [renderDel, setrenderDel] = useState(false);

  useEffect(() => {
    if (Item_remove_id_list.length === 1) {
      setrenderDel(true);
    } else if (Item_remove_id_list.length === 0) {
      setrenderDel(false);
    }
  }, [Item_remove_id_list]);

  async function get_dbdata() {
    let current_month = new Date().getMonth() + 1;
    let last_month = current_month - 1;
    let item_list_db = await fetch(`${server_url}/fetch_data/${User.sub}`);
    item_list_db_json = await item_list_db.json();

    item_list_db_json.map((item) => {
      const List_Item_Array = Object.entries(item);

      let date_string = new Date(List_Item_Array[5][1]);
      date_string.setDate(date_string.getUTCDate());

      item.date_purchased = date_string;
    });
    setBudgetList(item_list_db_json);

    let summary_data_db = await fetch(
      `${server_url}/summarydata/${current_month}/${last_month}/${User.sub}`
    );
    let summary_data_db_json = await summary_data_db.json();
    setSummaryData(summary_data_db_json);

    let line_graph_data_db = await fetch(
      `${server_url}/linegraphdata/${User.sub}`
    );
    line_graph_data_db_json = await line_graph_data_db.json();
    calc_avg(line_graph_data_db_json);
    setLineGraphData(line_graph_data_db_json);
    let bar_graph_data = await fetch(
      `${server_url}/categorydata/${current_month}/${User.sub}`
    );
    let bar_graph_data_json = await bar_graph_data.json();
    setBarGraphData(bar_graph_data_json);
    setLoaded(true);
  }

  function get_search_box_value(e) {
    if (!e.target.value) {
      setBudgetList(item_list_db_json);
      return;
    }
    let temp_BudgetList = item_list_db_json.filter((item) =>
      item.item.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setBudgetList(temp_BudgetList);
  }
  function calc_avg(month_arr) {
    let avg = 0;

    month_arr.map((month) => {
      avg += month.total;
    });
    setAvg(avg / month_arr.length);
  }

  function remove_item_id(id) {
    if (!Item_remove_id_list.includes(id)) {
      setItem_remove_id_list((Item_remove_id_list) => [
        ...Item_remove_id_list,
        id,
      ]);
    } else {
      let temp_arr = Item_remove_id_list.filter((item) => item !== id);
      setItem_remove_id_list(temp_arr);
    }
  }

  async function remove_budget_item(id) {
    let delete_req = await fetch(`${server_url}/deleteitem/${id}/${User.sub}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      mode: "cors",
      body: JSON.stringify(Item_remove_id_list),
    });

    if (delete_req.status === 200) {
      get_dbdata();
      setItem_remove_id_list([]);
      return;
    }
    toast.error(`Error in deleting items`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  async function delete_btn_handler() {
    let delete_req = await fetch(
      `${server_url}/deleteitem_multiples/${User.sub}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
        mode: "cors",
        body: JSON.stringify(Item_remove_id_list),
      }
    );
    if (delete_req.status === 200) {
      get_dbdata();
      setItem_remove_id_list([]);
      return;
    }
    toast.error(`Error in deleting items`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  useEffect(() => {
    get_dbdata();
  }, []);
  return (
    <AnimatePresence exitBeforeEnter>
      {Loaded ? (
        <motion.div
          className="Expenses_page"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          key="Loaded">
          <Search_results
            ListItem={BudgetList}
            remove_budget_item={remove_budget_item}
            remove_item_id={remove_item_id}
            renderDel={renderDel}
            delete_btn_handler={delete_btn_handler}
          />

          <ExpensesSummary summary_data={SummaryData} avg={Avg} />
          <Line_graph line_graph_data={LineGraphData} />
          <Search_box get_search_box_value={get_search_box_value} />
          <Bar_graph Bar_graph_data={BarGraphData} />
        </motion.div>
      ) : (
        <Loading_screen key="Loading_screen" />
      )}
    </AnimatePresence>
  );
}

export default Expenses;
