import "./App.css";

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sign_in_screen from "./Pages/Sign_in_screen";
import Main_page from "./Pages/Main_page";
import Expenses from "./Pages/Expenses";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

function App() {
  const [User, setUser] = useState();

  function reset_user() {
    setUser();
  }
  function handleCredentialResponse(jwt_token) {
    let user_credentials = JSON.parse(atob(jwt_token.credential.split(".")[1]));

    setUser(user_credentials);
  }
  if (User) {
    toast.success(`Hello ${User.name}`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  return (
    <div className="App">
      <Navbar
        handleCredentialResponse={handleCredentialResponse}
        User={User}
        key="nav"
        reset_user={reset_user}
      />
      <AnimatePresence exitBeforeEnter>
        {User ? (
          <div className="app_screen" key="app_screen">
            <Routes>
              <Route path="/" element={<Main_page User={User} />} />
              <Route path="/expenses" element={<Expenses User={User} />} />
            </Routes>
          </div>
        ) : (
          <Sign_in_screen
            handleCredentialResponse={handleCredentialResponse}
            key="sign_in"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
