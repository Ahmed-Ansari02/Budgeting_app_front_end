import { useState, useEffect } from "react";
import PreviewBox from "../components/Main_components/preview_box";
import TotalBox from "../components/Main_components/grand_totalbox";
import InputBox from "../components/Main_components/input_box";
import "./pages_style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const server_url = "https://budgetting-app-server.herokuapp.com/";

function Main_page({ User }) {
  const [ListItem, setListItem] = useState([]);
  const [Count, setCount] = useState(0);
  const [Total, setTotal] = useState(0);
  //const [Remove, setRemove] = useState(false)

  function handlesubmit(i) {
    let new_array = ListItem.filter((element) => element.Count !== i);

    setListItem(new_array);
  }

  function show_toast(msg) {
    toast.clearWaitingQueue();
    toast.error(msg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  function submit(e) {
    let data = [];
    if (!e.target[0].value & !e.target[4].value) {
      show_toast("Please enter an Item and a date!");
      return;
    } else if (!e.target[0].value) {
      show_toast("Please enter an Item!");
      return;
    } else if (!e.target[4].value) {
      show_toast("Please enter a date!");
      return;
    }

    for (let i = 0; i < 5; i++) {
      data.push(e.target[i].value);
    }

    setListItem(ListItem.concat({ data, Count }));
  }

  useEffect(() => {
    updateTotal(ListItem);
    setCount((Count) => Count + 1);
  }, [ListItem]);

  function updateTotal(arr) {
    let total = 0;

    arr.forEach((data) => {
      total += parseFloat(data.data[1]) * parseInt(data.data[2]);
    });

    setTotal(total);
  }

  async function submitItems() {
    let list_item = ListItem.map((listitem) => {
      return listitem.data;
    });
    let Post_req_payload = {
      list_item,
      user_name: User.name,
      user_id: User.sub,
    };

    if (ListItem.length === 0) {
      show_toast("cant submit an empty list!");

      return;
    } else {
      try {
        const ex = Post_req_payload;
        const response = await fetch(`${server_url}/savedata`, {
          body: JSON.stringify(ex),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          mode: "cors",
        });

        const msg = await response.text();

        if (response.status === 200) {
          toast.success("Succesfully saved 🎊", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            setListItem([]);
            setCount(0);
          }, 2000);
        } else throw Error;
      } catch (err) {
        show_toast("List not saved 😔");
      }
    }
  }

  return (
    <motion.div
      className="Main_page"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}>
      <PreviewBox ListItem={ListItem} handlesubmit={handlesubmit} />
      <InputBox submit={submit} />
      <TotalBox total={Total} submitItems={submitItems} />

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
      />
    </motion.div>
  );
}

export default Main_page;
