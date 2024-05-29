import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-4 shadow-lg">
      <h1>E-commerce</h1>
      <ul className="flex justify-between items-center gap-10">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/">Categories</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/">About</Link>
        </li>
      </ul>
      <div className="flex justify-between items-center gap-10">
        <button>
          <Link to="/checkout">
            <FaShoppingCart className="w-5 h-5" />
          </Link>
        </button>
        <button>
          <RiLogoutBoxRLine className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
