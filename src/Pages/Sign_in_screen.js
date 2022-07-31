import React from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import "./pages_style.css";
import { useNavigate } from "react-router-dom";

function Sign_in_screen({ handleCredentialResponse }) {
  let navigate = useNavigate();
  useEffect(() => {
    /*global google */
    google.accounts.id.initialize({
      client_id:
        "1086210570143-r8asm8h5djh5i784csa8e1o4kpp8uj2b.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("login_btn"),
      { theme: "filled_black", size: "large", text: "signin" } // customization attributes
    );
    google.accounts.id.prompt();
    return () => {
      navigate("/");
    };
  }, []);
  return (
    <motion.div
      className="Sign_in_screen"
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 1 }}>
      <motion.h2
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "just" }}
        className="heading_loading_screen">
        Hey! Sign in to your google account to begin
      </motion.h2>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        id="login_btn"></motion.div>
    </motion.div>
  );
}

export default Sign_in_screen;
