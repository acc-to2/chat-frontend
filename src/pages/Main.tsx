import ChattingList from "../components/ChattingList";
import GroupList from "../components/GroupList";
import NavBar from "../components/NavBar";

const Main = () => {
  return (
    <div className="flex h-screen">
      <NavBar />
      <GroupList />
      <ChattingList />
    </div>
  );
};

export default Main;
