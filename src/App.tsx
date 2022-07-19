import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import UserList from "./component/UserList";
import AddAndEdit from "./component/addAndEdit";
import UserRecord from "./component/UserRecord";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./component/header";
import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import TypeGenericList from "./component/TypeGenericList/TypeGenericList";
import TodoList from "./component/TypeGenericList/TodoMobx/Todos/TodoList";
import TodoItem from "./component/TypeGenericList/TodoMobx/Todos/TodoItem";
import { TodoStore } from "./component/TypeGenericList/TodoMobx/stores/TodoStore";
import { toJS } from "mobx";

import UserPage from "./component/TypeGenericList/TodoMobx/Users/UserPage";
import CommentPage from "./component/TypeGenericList/TodoMobx/Users/CommentPage";
import HomePage from "./component/TypeGenericList/TodoMobx/Users/HomePage";
import useActions from "./saga/useActions";
import { useAppSelector } from "./saga/app/store";
import Posts from "./component/Posts";

function App() {
  return (
    // <div>
    //   <Posts />
    // </div>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<UserRecord />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-record" element={<AddAndEdit />} />
        <Route path="/edit-record/:id" element={<AddAndEdit />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/type"
          element={
            <TypeGenericList
              keyExtractor={({ id }) => id}
              data={[
                { id: 1, firstName: "Jhon", lastName: "Doe" },
                { id: 2, firstName: "Jona", lastName: "Doe" },
                { id: 3, firstName: "Jhonney", lastName: "Doe" },
              ]}
              renderItem={(test) => (
                <div>
                  <div>{test.firstName}</div>
                  <div>{test.id}</div>
                </div>
              )}
            />
          }
        />
        <Route path="/todo" element={<TodoList />} />
        <Route path="/user-list" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
