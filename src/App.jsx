import React, { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useSnapshot } from "valtio";
import AOS from "aos";
import "aos/dist/aos.css";

import { Home, About } from "./pages";
import { Navbar, Footer } from "./components";

import styles from "./styles";
import state from "./store";

const App = () => {
  if (localStorage.theme === "dark") {
    document.documentElement.classList.add("dark");
    state.darkMode = true;
  } else {
    document.documentElement.classList.remove("dark");
    state.darkMode = false;
  }

  const snap = useSnapshot(state);
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      state.modalNavbar = false;
    }
  });

  useEffect(() => {
    AOS.init({ duration: 500, offset: 100 });
    AOS.refresh();
  }, []);

  return (
    <div className="overflow-hidden relative bg-white dark:bg-[#171512] duration-300">
      <Navbar />

      {/* modal navbar */}
      <div
        className={`w-full h-[7000px] z-50 absolute ${
          snap.modalNavbar === false ? "-right-[250vw]" : " right-0"
        }`}
      >
        <div className="h-[577px] modal-background relative" />
        <div className="h-full bg-[#fefcf783]" />

        <Link
          to={"/"}
          className={`${styles.modalLinks} absolute top-10 w-full`}
          onClick={() => (state.modalNavbar = false)}
        >
          TEXT
        </Link>
        <Link
          to={"/about"}
          className={`${styles.modalLinks} absolute top-[104px] w-full`}
          onClick={() => (state.modalNavbar = false)}
        >
          TEXT
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
