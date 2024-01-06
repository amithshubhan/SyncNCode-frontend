"use client";
import Header from "@components/Header/Header";
import MainHomeContent from "@components/MainHomeContent/MainHomeContent";
import { Event } from "@mui/icons-material";
import { useState, useContext, createContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { PageContext, usePageContext } from "@components/Context/PageContext";

const Home = () => {
  const [navigateTo, setNavigateTo] = useState("");

  const newRoomId = uuidv4();

  return (
    <>
      {/* // <PageContext.Provider value={{ roomId, setRoomId, password, setPassword }}> */}
      <Header roomId={newRoomId} />
      <MainHomeContent />
    </>
    // </PageContext.Provider>
  );
};

export default Home;
