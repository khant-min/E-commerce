import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

import { Link } from "react-router-dom";

const Account = () => {
  return (
    <div className="account">
      <ul>
        <li>
          <Link to="/register">Log In with MyShop</Link>
        </li>
        <li>Log In with Google</li>
        <li>
          <BsFacebook className="text-blue-700" /> Log In with Facebook
        </li>
        <li>Log In with Twitter</li>
        <li>
          <FaGithub /> Log In with Github
        </li>
      </ul>
    </div>
  );
};

export default Account;

/// This component is for creating account using | MyShop | Google | Facebook | Twitter
