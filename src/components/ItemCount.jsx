import React, {useState} from 'react';
import Swal from 'sweetalert2'


const ItemCount = (props) => {
    const[count, setCount] = useState (props.initial);
    const [disabled, setDisabled] = useState (true);

    function cantSubstract(){
        if(count > 0){
            if(count == 1){
                setDisabled(true);
            }
            setCount(count - 1);
        }
    }

    function cantAdd(){
        if(props.stock > count){
            setCount(count + 1);
            setDisabled(false);
        }
        else{            
            Swal.fire('No se puede agregar más productos')
        }
    }

    {/*function finCompra(){
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Agregaste productos al carrito',
            showConfirmButton: false,
            timer: 1500,
          })
        }*/}

    return (
        <div className="container px-8 py-8 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
                <div style={{padding: "0.5rem"}}>
                    <button onClick={cantSubstract}> - </button>
                    <span> {count} </span>
                    <button onClick={cantAdd}> + </button>
                </div>
                <div>
                    <button className="third add btn-agregar btn btn-primary" onClick={() => props.onAdd(count)} disabled={disabled}> Agregar Producto </button>
                </div>
            </div>
        </div>
    );
}

export default ItemCount;
