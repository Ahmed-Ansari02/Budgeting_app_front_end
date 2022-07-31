import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

function Navbar({ User,reset_user }) {
 
  const [Signout, setSignout] = useState(false);
  useEffect(() => {setSignout(false)}, [User]);
  return (
    <nav className="navbar">
      <div className="logo_box">
        <motion.div
          whileHover={{ scale: [1, 0.95, 1], rotate: [0, 360] }}
          transition={{
            type: "just",
          }}
          className="picture_frame"></motion.div>
        <p className="app_name">Budget app</p>
      </div>

      <div className="Links_div">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
          <Link to="/">Add Items</Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
          <Link to="/expenses"> View Expenses</Link>
        </motion.div>
        {User ? (
          <div className="login_logo_box">
            <motion.img
              src={User.picture}
              onTap={()=>setSignout(!Signout)}
              whileTap={{ scale: 0.9 }}
              className="login_img"
            />
            {Signout ? (
              <motion.button
                className="logout_screen"
                onTap={reset_user}
                whileTap={{ scale: 0.9, background: "green" }}
                initial={{y:-100, opacity:0}}
                animate={{y:0, opacity:1}}>
                Logout
              </motion.button>
            ) : null}
          </div>
        ) : null}
      </div>
    </nav>
  );
}

export default Navbar;
