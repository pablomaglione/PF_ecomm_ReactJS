import { useState, useEffect } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';


function ItemListContainer() {
    const { categoriaId } = useParams();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const querydb = getFirestore();
        const queryCollection = collection(querydb, "products");

        if (categoriaId) {
            const queryFilter = query(queryCollection, where("categoria", '==', categoriaId));
            getDocs(queryFilter)
                .then(resp => setItems(resp.docs.map(product => ({ id: product.id, ...product.data() }))));
        } else {
            getDocs(queryCollection)
                .then(resp => setItems(resp.docs.map(product => ({ id: product.id, ...product.data() }))));
        }
    }, [categoriaId]);

    return (
        <>
            <div>
                <ItemList prod={items} />
            </div>
        </>
    );
};

export default ItemListContainer;