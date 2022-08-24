import React from 'react';
import Item from "./Item";
import { useLocation } from 'react-router-dom';

const ItemList = ({prod}) => {
    const location = useLocation();
    let route = "";
    if(location.pathname === "/"){
        route = "Productos"
    }else{
        route = prod[0].categoria;
    }
    return (
        <>
            <h1 className="d-flex justify-content-center" style={{fontFamily: 'Abril Fatface', background: "#E8F0F2" }}>{route}</h1>
            <div className="container" style={{ minHeight: "500px" }}>
                <div className="row align-items-end flex-content-center">
                    {prod.map(prodItem => (
                        <div key={prodItem.id} className="d-flex productos_item col-xxl-3 col-lg-4 col-md-6 col-sm-12 justify-content-center">
                            <Item producto={prodItem} />
                        </div>
                    ))
                    }
                </div>
            </div>
        </>
    );
};

export default ItemList;
