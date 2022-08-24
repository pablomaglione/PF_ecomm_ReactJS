import React from "react";
import { useContext} from "react";
import { CartContext } from "../contexts/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const CartWidget = () => {
  const { totalProd } = useContext(CartContext);

  return (
    <div className="ps-4 d-flex align-items-center flex-column" style={{marginRight:"50px"}}>
      <span className="qty-display">{totalProd() || ""} </span>
      <FontAwesomeIcon icon={faShoppingCart} />
    </div>
  );
};
export default CartWidget;