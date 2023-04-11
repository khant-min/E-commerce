// icons
import { FiShoppingCart } from "react-icons/fi";
import { DataContextProps } from "../../data.types";

import useAuth from "../../hooks/useAuth";

import { useState } from "react";

interface CartProps {
  setOpenSlider: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cart = ({ setOpenSlider }: CartProps) => {
  return (
    <button className="cart" onClick={() => setOpenSlider(true)}>
      <FiShoppingCart />
      <h2>Cart</h2>
    </button>
  );
};

export default Cart;
