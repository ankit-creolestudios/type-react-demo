import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import {
  delUserRecord,
  retrieveUser,
  searchUser,
  sortUser,
} from "../../feature/crudSlice";

const UserRecord = () => {
  const [select, setSelect] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [message, setMessage] = useState("No user found with this name");
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (inputSearch == "" || select == "") {
      dispatch(retrieveUser());
    }
  }, [dispatch, inputSearch]);
  const handleSubmit = () => {
    if (inputSearch !== "") {
      dispatch(searchUser(inputSearch));
    }
  };
  const { userRecord, loading, error } = useAppSelector((state) => state.crud);
  const handleDel = (id: number | string | undefined) => {
    dispatch(delUserRecord(id));
    window.location.reload();
  };
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);

    dispatch(sortUser(e.target.value));
  };
  // const handleChange = (value: string) => {
  //   if (value) {
  //     dispatch(sortUser(value));
  //   }
  // };
  return (
    <div>
      {loading ? (
        <div>loading</div>
      ) : (
        <>
          <div className="input__more">
            <div className="input__search">
              <div>UserCheck: </div>
              <div>
                <Form onFinish={handleSubmit} className="input__search__record">
                  <div>
                    <Input
                      value={inputSearch}
                      onChange={(e) => setInputSearch(e.target.value)}
                    />
                  </div>
                  <div>
                    <Button htmlType="submit" type="primary">
                      Check
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
            {/* <div>
              <div>Sort User</div>
              <div>
                <Select placeholder={"Select Type"} onChange={handleChange}>
                  <option value={"userName"}>User Name</option>
                  <option value={"email"}>Email</option>
                </Select>
              </div>
            </div> */}
            <div>
              <div>Sort User</div>
              <div>
                <select
                  placeholder={"Select Type"}
                  onChange={handleChange}
                  value={select}
                >
                  <option value={""} selected>
                    Select Type
                  </option>
                  <option value={"userName"}>User Name</option>
                  <option value={"email"}>Email</option>
                </select>
              </div>
            </div>
          </div>
          <br />
          <div
            style={{
              margin: "auto",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {userRecord.length == 0 ? (
              <div>{message}</div>
            ) : (
              userRecord.map((item, index) => (
                <div key={item.id} style={{ margin: "10px" }}>
                  <Card
                    title={`${index + 1}.${item.userName}`}
                    style={{ width: 300 }}
                  >
                    <p>
                      <b>Email:</b>
                      {item.email}
                    </p>
                    <div>
                      <b>Phone:</b>
                      {item.phone}
                    </div>
                    <div className="add_edit">
                      <div>
                        <Link to={`/edit-record/${item.id}`}>
                          {" "}
                          <EditOutlined />
                        </Link>
                      </div>
                      <div onClick={() => handleDel(item.id)}>
                        <Link to={"#"}>
                          <DeleteOutlined />
                        </Link>
                      </div>
                    </div>
                  </Card>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserRecord;
