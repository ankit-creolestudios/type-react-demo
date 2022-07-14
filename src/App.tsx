import React from "react";
import logo from "./logo.svg";
import "./App.css";
import UserList from "./component/UserList";
import AddAndEdit from "./component/addAndEdit";
import UserRecord from "./component/UserRecord";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./component/header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<UserRecord />} />
        <Route path="/add-record" element={<AddAndEdit />} />
        <Route path="/edit-record/:id" element={<AddAndEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
