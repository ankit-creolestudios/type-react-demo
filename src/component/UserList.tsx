import { Card } from "antd";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/store";
import { loadUser } from "../feature/userSlice";

const UserList = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  const { users, loading } = useAppSelector((state) => state).user;
  console.log(users);
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
          {users.map((item, index) => (
            <div key={item.id} style={{ margin: "10px" }}>
              <Card title={`${item.id}.${item.name}`} style={{ width: 300 }}>
                <p>
                  <b>Email:</b>
                  {item.email}
                </p>
                <p>
                  <b>Address:</b>
                  {item.address.street} {item.address.city}
                </p>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default UserList;
