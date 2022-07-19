import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppContext } from "../../../../app-context";

const UserPage = observer(() => {
  const user = useAppContext();
  const [loading, setLoading] = useState(false);
  const params = useParams<{ userId: string }>();
  const userId = Number(params.userId);
  console.log(user);
  //   console.log(store);
  //   console.log(api);
  //   const load = async () => {
  //     try {
  //       setLoading(true);
  //       await api.user.getById(userId);
  //       //   await api.post.getByUserId(userId);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   useEffect(() => {
  //     load();
  //   }, []);

  //   if (loading) {
  //     return <div>loading...</div>;
  //   }

  //   const user = store.user.byId.get(userId);

  //   if (!user) {
  //     return <div>User not found</div>;
  //   }

  return <div>user page</div>;
});

export default UserPage;
