import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Categories = () => {
    const [dataCategories, setDataCategories] = useState([])

    useEffect(()=> {
        axios.get("http://127.0.0.1:8000/api/categories")
            .then(r=> {
                setDataCategories(r.data.member)
            })
    }, [])
    return (
        <div>
            <h1>Catégories</h1>
            <ul>
                {
                    dataCategories.map((categorie)=> (
                        <NavLink  key={categorie.nom} to={'recherche/'+categorie.id+''}>
                            <li>{categorie.nom}</li>
                        </NavLink>
                    ))
                }
            </ul>
        </div>
    );
};

export default Categories;