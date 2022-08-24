import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import CartItem from "./CartItem";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Modal, Button, Alert, Form } from "react-bootstrap";
import { useForm } from 'react-hook-form';


const Cart = () => {
    const { cartItems, totalPrice, clearCart, sendOrder } = useContext(CartContext);
    const date = new Date();
    const [ordenID, setOrdenID] = useState();
    const [ordenConfirmada, setOrdenConfirmada] = useState(false);
    const [getForm, setGetForm] = useState(false);
    const handleCancelar = () => setGetForm(false);
    const handleTraer = () => setGetForm(true);
    const { register, formState: { errors }, handleSubmit } = useForm();

    const crearOrden = (name, phone, email) => {

        const orderDB = getFirestore();
        const orderCollection = collection(orderDB, "orders");

        const order = {
            buyer: {
                name: name,
                email: email,
                tel: phone,
            },
            items: cartItems.map(product => ({ id: product.id, nombre: product.nombre, detalle: product.detalle, precio: product.precio, quantity: product.quantity, fecha: date.toLocaleDateString() })),
            total: totalPrice(),
        }

        addDoc(orderCollection, order)
            .then(({ id }) => setOrdenID(id))
            .then(sendOrder(order))
            .then(setOrdenConfirmada(true))
    }

    if (cartItems.length === 0) {
        return (
            <>
                <div className="d-flex flex-column align-items-center" style={{ minHeight: "550px" }}>
                    <p>No hay elementos en el carrito</p>
                    <p>Haga click <a href="/">Aqui</a> para continuar comprando</p>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div style={{ minHeight: "550px" }}>
                    <div>
                        <h1 className="my-4 text-center fw-light text-decoration-underline" style={{ fontFamily: 'Abril Fatface', fontSize: "2rem" }}>Detalle de Compra</h1>
                        <hr />
                    </div>
                    <div className="text-center">
                        <table className="table ">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Imagen</th>
                                    <th scope="col">Detalle</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Precio Unitario</th>
                                    <th scope="col">Precio Final</th>
                                    <th scope="col">Eliminar</th>
                                </tr>
                            </thead>
                            {
                                cartItems.map((prod) => <CartItem key={prod.id} producto={prod} />)
                            }
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th scope="col">Total Compra: </th>
                                <th scope="col">$ {totalPrice()}</th>
                            </tr>
                        </table>
                        <div className="d-flex flex-col text-center w-full mb-12 justify-content-around" style={{ padding: "0.5rem" }}>
                            <div>
                                <Link to="/">
                                    <button className="third add btn-agregar btn btn-primary">Agregar Productos<i aria-hidden="true"></i></button>
                                </Link>
                            </div>
                            <div>
                                <button className="third add btn-agregar btn btn-primary" onClick={handleTraer}>Confirmar Compra</button>
                            </div>
                        </div>
                    </div>

                    <Modal show={getForm} onHide={handleCancelar}>
                        <Modal.Header>
                            <Modal.Title className="fs-3 text-center">Datos del Comprador</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <div className="mb-4">
                                    <Form.Label>Nombre completo</Form.Label>
                                    <Form.Control type="text" placeholder="Nombre y Apellido" className="form-control" {...register("name", { required: "Por favor completar dato" })} />
                                    {errors.name && <p className="text-danger d-block">{errors.name.message}</p>}
                                </div>
                                <div className="mb-4">
                                    <Form.Label>Celular</Form.Label>
                                    <Form.Control type="number" className="form-control" placeholder="115555555" {...register("phone", { required: "Por favor completar dato", pattern: {value: "[0-9]"}, minLength: {value: "9", message: 'Ingrese mínimo los 9 digitos'}})} requerid />
                                    {errors.phone && <p className="text-danger d-block">{errors.phone.message}</p>}
                                </div>
                                <div className="mb-4">
                                    <Form.Label>Correo electrónico</Form.Label>
                                    <Form.Control type="email" className="form-control" placeholder="email" {...register('email', {
                                        required: 'Por favor ingresar email', pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: 'Por favor ingrese un mail valido',
                                        },
                                    })} required /> {errors.email && <p className="text-danger d-block">{errors.email.message}</p>}
                                </div>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={handleCancelar}>Volver</Button>
                            <Button variant="success" onClick={handleSubmit((data, e) => {
                                handleCancelar()
                                crearOrden(data.name, data.phone, data.email)
                            })}>Completar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={ordenConfirmada} onHide={() => setOrdenConfirmada(false)}>
                        <Modal.Header closeButton onClick={() => {
                            clearCart()
                        }}>
                            <Alert variant="success" className="text-center d-flex justify-content-center">¡Tu compra se realizo con exito!</Alert>
                        </Modal.Header>
                        <Modal.Body>
                            <p className="text-center"><b>N° de Orden:</b> {ordenID}</p> <br />
                            {cartItems.map((cart) => {
                                return (
                                    <ul>
                                        <li><b>Producto:</b> {cart.nombre}</li>
                                        <li><b>Precio por unidad:</b> $ {cart.precio}</li>
                                        <li><b>Cantidad:</b> {cart.quantity}</li>
                                        <li><b>SubTotal:</b> $ {cart.quantity * cart.precio}</li>
                                    </ul>
                                )
                            })}
                            <ul>
                                <li><b>Total Abonado:</b> $ {totalPrice()}</li>
                            </ul>
                        </Modal.Body>
                    </Modal>
                </div>
            </>
        );
    }
}
export default Cart;