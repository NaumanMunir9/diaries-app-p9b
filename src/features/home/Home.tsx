// libraries
import { FC } from "react";

// features
import Diaries from "../diary/Dairies";
import Editor from "../entry/Editor";

const Home: FC = () => {
  return (
    <div className="two-cols">
      <div className="left">
        <Diaries />
      </div>

      <div className="right">
        <Editor />
      </div>
    </div>
  );
};

export default Home;
