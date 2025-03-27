"use client";

import React from "react";
import { useAuth } from "../context";
import toast from "react-hot-toast";

const AddToCartBTN = ({ item }) => {
  let { cart, setCart } = useAuth();
  console.log(cart);
  return (
    <div>
      {" "}
      <button
        onClick={() => {
          let cartIds = cart.map((it) => it.id);
          if (cartIds.includes(item?.id)) {
            return alert("Already added");
          }
          setCart([item, ...cart]);
          localStorage.setItem("cart", JSON.stringify([item, ...cart]));
          toast.success(`${item?.name} added to Cart`);
        }}
        className="btn btn-info mt-auto mb-1"
      >
        Add to cart
      </button>
    </div>
  );
};

export default AddToCartBTN;
