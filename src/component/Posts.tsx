import { Card } from "antd";
import React, { useEffect } from "react";
import { useAppSelector } from "../saga/app/store";

import useActions from "../saga/useActions";

const Posts = () => {
  const actions = useActions();

  const state = useAppSelector((state) => state);

  useEffect(() => {
    actions.getPostsApi();
  }, []);
  return (
    <div>
      <div>Posts</div>
      {state.length === 0 ? (
        <div>loading</div>
      ) : (
        <div>
          <div>Post</div>
          {state.map((item) => (
            <div>
              <Card>
                <div>
                  <b>{item.id}</b>{" "}
                </div>
                <div>
                  <b>{item.title}</b>
                </div>
                <div dangerouslySetInnerHTML={{ __html: item.body }} />
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
