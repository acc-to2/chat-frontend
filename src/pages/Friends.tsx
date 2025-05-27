import FriendsList from "../components/FriendsList";
import NavBar from "../components/NavBar";

const Friends = () => {
  return (
    <div className="flex h-screen">
      <NavBar />
      <FriendsList />
    </div>
  );
};

export default Friends;
