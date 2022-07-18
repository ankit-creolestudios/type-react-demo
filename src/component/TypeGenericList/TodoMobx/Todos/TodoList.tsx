import { Button, Form, Input } from "antd";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ITodo, TodoStore } from "../stores/TodoStore";
import { useStores } from "../use-store";
import TodoItem from "./TodoItem";

const TodoList = observer(() => {
  const { todoStore } = useStores();
  const todo = toJS(todoStore);
  const handleSubmit = (values: ITodo) => {
    const newTodo = {
      id: Date.now(),
      text: values.text,
      completed: false,
    };
    todoStore.addTodo(newTodo);
  };

  return (
    <div>
      {/* <div>TodoList</div> */}
      <div className="add_edit_wrap">
        <div style={{ textAlign: "center", padding: "10px", fontSize: "30px" }}>
          Add Todo
        </div>
        <div>
          <Form
            name="useraddedit"
            labelCol={{
              span: 8,
            }}
            // wrapperCol={{
            //   span: 16,
            // }}
            onFinish={handleSubmit}
            className="add_edit_antd"
          >
            <Form.Item
              name={"text"}
              label="Todo"
              rules={[
                {
                  required: true,
                  message: "Please enter todo",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                htmlType="submit"
                type="primary"
                className="add_edit_button"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div>
        <div>
          <div>Todo</div>
          {todoStore.inCompletedTask.length === 0 ? (
            <div>no todo present</div>
          ) : (
            todoStore.inCompletedTask?.map((item) => {
              return <TodoItem todo={toJS(item)} />;
            })
          )}
        </div>
        <div>
          <div>Todo done</div>
          <div>
            {todoStore.completedTask.length === 0 ? (
              <div>no todo present</div>
            ) : (
              <div>
                {todoStore.completedTask.map((item) => {
                  return <TodoItem todo={toJS(item)} />;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default TodoList;
