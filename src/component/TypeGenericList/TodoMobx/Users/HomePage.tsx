import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import AppApi from "../../../../apis/app";
import UserApi from "../../../../apis/UserApi";
import { useAppContext } from "../../../../app-context";

const HomePage = observer(() => {
  //   const { api, store } = useAppContext();
  const [loading, setLoading] = useState(false);
  console.log(AppApi);
  //   console.log(api, store);
  //   const load = async () => {
  //     try {
  //       setLoading(true);
  //       await api.post.getAll();
  //       await api.user.getAll();
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   useEffect(() => {
  //     load();
  //   }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      {/* {store.post.all.map((post) => (
        <Post key={post.id} post={post} />
      ))} */}
    </div>
  );
});

export default HomePage;
