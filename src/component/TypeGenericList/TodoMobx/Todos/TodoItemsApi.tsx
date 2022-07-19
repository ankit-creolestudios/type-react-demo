import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { toJS } from "mobx";
import React, { useState } from "react";
import { Todos } from "../../../../appInterface/TodosInterface";
import { ITodo } from "../stores/TodoStore";
import { useStores } from "../use-store";
interface IProps {
  todo: Todos;
}
const TodoItemsApi = ({ todo }: IProps) => {
  const [editMode, setEditMode] = useState(false);
  const { todoStore } = useStores();
  const [check, setCheck] = useState(todo.completed);
  const [form] = Form.useForm();
  const handleClick = ({ todo }: IProps) => {
    setEditMode(!editMode);
    form.setFieldsValue({ ...todo, text: todo.title });
    console.log({ ...todo, text: todo.title });
  };
  const handleRemove = (id: number) => {
    todoStore.removeTodo(id);
  };
  const handleSubmit = (values: ITodo) => {
    setEditMode(!editMode);
    const updateTodo = {
      ...todo,
      text: values.text,
    };
    todoStore.updateTodo(updateTodo);
  };
  // const handleChnage = (e: CheckboxChangeEvent) => {
  //   console.log(!check);
  // };
  return (
    <div className="todo--ist">
      <Card>
        <div className="todo__ist">
          <div>TodoItem</div>
          <div>
            <Checkbox
              checked={todo.completed}
              onChange={() => todoStore.togleTodo(todo.id)}
            />
          </div>
          {!editMode && <div>{todo.title}</div>}
          {editMode && (
            <Form onFinish={handleSubmit} form={form}>
              <Form.Item
                name={"text"}
                rules={[{ required: true, message: "Please enter todo" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Save
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="button"
                  type="primary"
                  danger
                  onClick={() => setEditMode(!editMode)}
                >
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          )}
          <div>
            <EditOutlined onClick={() => handleClick({ todo })} />
          </div>
          <div>
            <DeleteOutlined onClick={() => handleRemove(todo.id)} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TodoItemsApi;
