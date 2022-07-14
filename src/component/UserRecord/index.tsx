import { EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { retrieveUser } from "../../feature/crudSlice";

const UserRecord = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(retrieveUser());
  }, [dispatch]);
  const { userRecord, loading, error } = useAppSelector((state) => state.crud);
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
                title={`${item.id}.${item.userName}`}
                style={{ width: 300 }}
              >
                <p>
                  <b>Email:</b>
                  {item.email}
                </p>
                <p>
                  <Link to={`/edit-record/${item.id}`}>
                    {" "}
                    <EditOutlined />
                  </Link>
                </p>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserRecord;
