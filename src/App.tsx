import React from "react";
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

function App() {
  return (
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
