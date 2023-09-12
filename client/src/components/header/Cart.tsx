import { FiShoppingCart } from "react-icons/fi";
import { DataContextProps } from "../../types";
import { useAuth } from "../../context/DataContext";
import { useState } from "react";
import "react-modern-drawer/dist/index.css";

// interface CartProps {
//   setOpenSlider: React.Dispatch<React.SetStateAction<boolean>>;
// }

const Cart = ({ toggleDrawer }: any) => {
  return (
    <button className="cart" onClick={toggleDrawer}>
      <FiShoppingCart />
      <h2>Cart</h2>
    </button>
  );
};

export default Cart;
