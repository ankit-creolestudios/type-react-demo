import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { delUserRecord, retrieveUser } from "../../feature/crudSlice";

const UserRecord = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(retrieveUser());
  }, [dispatch]);
  const { userRecord, loading, error } = useAppSelector((state) => state.crud);
  const handleDel = (id: number | string | undefined) => {
    dispatch(delUserRecord(id));
    window.location.reload();
  };
  return (
    <div>
      {loading ? (
        <div>loading</div>
      ) : (
        <div
          style={{
            margin: "auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {userRecord.map((item, index) => (
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
          ))}
        </div>
      )}
    </div>
  );
};

export default UserRecord;
