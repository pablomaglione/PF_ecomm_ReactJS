import { useState, useEffect } from "react";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import {getFirestore, doc, getDoc} from 'firebase/firestore';


function ItemDetailContainer() {
    const [items, setItems] = useState([]);
    const {id} = useParams();
    
    useEffect(() => {
        const querydb = getFirestore();
        const queryDoc = doc(querydb, 'products', id);
        getDoc(queryDoc)
        .then(resp => setItems({id: resp.id, ...resp.data()}))
    }, [id]);
    return (
        <>
            <div>
                <ItemDetail producto={items} />
            </div>
        </>
    );
};

export default ItemDetailContainer;