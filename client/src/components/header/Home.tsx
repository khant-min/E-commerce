import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Link to="/">
      <div className="flex gap-2 hover:cursor-pointer">
        <IoHome className="text-blue-400 text-2xl" />
        <h1 className="font-semibold sm:flex hidden">MyShop</h1>
      </div>
    </Link>
  );
};

export default Home;
