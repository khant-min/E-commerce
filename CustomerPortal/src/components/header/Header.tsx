import { Link } from "react-router-dom";

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
    </div>
  );
}
