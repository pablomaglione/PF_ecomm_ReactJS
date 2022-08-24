import { Link } from "react-router-dom";

const Item = ({ producto }) => {
    const { nombre, precio, img, id } = producto;
    return (
        <div className="card rounded border-0" style={{ width: "16rem", margin: "0" }}>
            <div className="card-body p-4 d-flex flex-column align-items-center justify-content-center">
                <img className="card-img-top" src={img} alt="Card image cap" style={{ margin: "10px" }} />
                <h1 className="card-title text-center"><span className="name-items" style={{fontSize: "0.75rem"}}>{nombre}</span></h1>
                <p className="card-precio text-center card-text">{`$${precio}`}</p>
                <Link to={`/item/${id}`}><button id={id} className="third btn btn-primary">Ver Más<i aria-hidden="true"></i></button></Link>
            </div>
        </div>
    );
};

export default Item;

