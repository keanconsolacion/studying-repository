import faker from "faker";
import React from "react";
import { createRoot } from "react-dom/client";
import CommentDetail from "./CommentDetail";
import ApprovalCard from "./ApprovalCard";

const root = createRoot(document.querySelector("#root"));

const App = () => {
  return (
    <div className="ui container comments">
      <ApprovalCard>
        <div>
          <h4>Are you sure?</h4>
        </div>
      </ApprovalCard>
      <ApprovalCard>
        <CommentDetail
          author="Mordekai"
          timeAgo="Yesterday at 5:30PM"
          imgSrc={faker.image.image()}
          text="Nice blog"
        />
      </ApprovalCard>
      <ApprovalCard>
        <CommentDetail
          author="Rigby"
          timeAgo="Yesterday at 12:00PM"
          imgSrc={faker.image.image()}
          text="Nice blog 2"
        />
      </ApprovalCard>
      <ApprovalCard>
        <CommentDetail
          author="Skips"
          timeAgo="2 Days Ago"
          imgSrc={faker.image.image()}
          text="Nice blog 3"
        />
      </ApprovalCard>
    </div>
  );
};

root.render(<App />);
