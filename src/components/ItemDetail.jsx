import { useState, useContext } from "react";
import ItemCount from "./ItemCount"
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

const ItemDetail = ({ producto }) => {
    const [cant, setCant] = useState(0);
    const { addItem } = useContext(CartContext);
    const { nombre, detalle, precio, img, stock, categoria } = producto;


    const onAdd = (cant) => {
        setCant(cant);
        addItem(producto, cant);
    };

    return (
        <div className="card rounded border-0">
            <div className="card-body p-4 d-flex flex-column justify-content-center aling-item-center" style={{margin: "0 5rem"}}>
                <div className="d-flex justify-content-around" style={{margin: "5px", height:"600px"}} >
                    <div style={{padding: "0 30px"}}>
                        <img className="card-img-top" src={img} alt="Card cap" />
                    </div>
                    <div style={{ width: "40%" }}>
                        <h1 className="card-title text-center"><span style={{ fontSize: "1.75rem" }}>{nombre}</span></h1>
                        <p className="card-detalle small text-center text-muted font-italic">Categoria: {categoria}</p>
                        <p className="card-detalle small text-center text-muted font-italic" style={{position: "relative", height: "250px", margin: "10px 60px", padding: "50px"}}>{detalle}</p>
                        <p className="card-precio text-center card-text" style={{ fontSize: "1.5rem" }}>{`$${precio}`}</p>
                        {cant === 0 ? (<ItemCount stock={stock} initial={0} onAdd={onAdd} />) : (<p className="flex flex-col text-center w-full mb-12">{cant} Producto Agregado </p>)}
                        <div className="flex flex-col text-center w-full mb-12" style={{ padding: "0.5rem" }}>
                            <Link to="/">
                                <button className="third btn btn-primary" style={{ margin: "10px" }}> Ir al Inicio </button>
                            </Link>
                            <Link to="/cart">
                                <button className="third btn btn-primary" style={{ margin: "10px" }}> Ir al Carrito </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;