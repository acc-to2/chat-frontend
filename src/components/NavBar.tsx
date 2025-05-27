import { FaHome } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const nav = useNavigate();
  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
  const TOKEN_URI = import.meta.env.VITE_TOKEN_URI;

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("id_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("pkce_verifier");
    window.location.href =
      `${TOKEN_URI}/logout?client_id=${CLIENT_ID}` +
      "&logout_uri=http://localhost:5173";
  };

  return (
    <div className="m-6 p-8 rounded-3xl bg-gray-400 flex flex-col justify-between">
      <div className="flex flex-col gap-10 ">
        <button onClick={() => nav("/main")}>
          <FaHome color="white" size={40} />
        </button>
        <button onClick={() => nav("/friends")}>
          <FaUserFriends color="white" size={40} />
        </button>
      </div>
      <button onClick={handleLogout}>
        <HiOutlineLogout color="white" size={40} />
      </button>
    </div>
  );
};
export default NavBar;
