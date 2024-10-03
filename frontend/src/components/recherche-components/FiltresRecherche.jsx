import axios from 'axios';
import { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const FiltresRecherche = ({setFilters}) => {
    const [dataCategories, setDataCategories] = useState([])
    const [dataIngredients, setDataIngredients] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedIngredients, setSelectedIngredients] = useState([])

    useEffect(()=> {
        const fetchData = async () => {
            const [r1, r2] = await Promise.all([
                axios.get('http://127.0.0.1:8000/api/categories'),
                axios.get('http://127.0.0.1:8000/api/ingredients'),
            ])
            setDataCategories(r1.data.member)
            setDataIngredients(r2.data.member)
        }
        fetchData()
    }, [])

    const addFiltersCategorie = (categorieId) => {
        setSelectedCategories(prevSelected => {
            if(prevSelected.includes(categorieId)) {
                return prevSelected.filter(id=>id!=categorieId)
            }else {
                return [...prevSelected, categorieId]
            }
        })

        setFilters(prevFilters => {
            let updatedFilters = new URLSearchParams(prevFilters);
    
            // Vérifie si la catégorie est déjà présente
            if (!updatedFilters.getAll('categorie[]').includes(categorieId.toString())) {
                // Ajoute la nouvelle catégorie dans le tableau 'categorie[]'
                updatedFilters.append('categorie[]', categorieId);
            }else {
                updatedFilters.delete('categorie[]', categorieId)
            }
    
            return `${updatedFilters.toString()}&`;
        });
    };
    

    const addFiltersIngredients = (ingredientId) => {
        setSelectedIngredients(prevSelected => {
            if(prevSelected.includes(ingredientId)) {
                return prevSelected.filter(id=>id!=ingredientId)
            }else {
                return [...prevSelected, ingredientId]
            }
        })

        setFilters(prevFilters => {
            let updatedFilters = new URLSearchParams(prevFilters);
    
            // Vérifie si l'ingrédient est déjà présent
            if (!updatedFilters.getAll('ingredientPourRecettes[]').includes(ingredientId.toString())) {
                // Ajoute le nouvel ingrédient dans le tableau 'ingredient[]'
                updatedFilters.append('ingredientPourRecettes[]', ingredientId);
            } else {
                updatedFilters.delete('ingredientPourRecettes[]', ingredientId)
            }
    
            return `${updatedFilters.toString()}&`;
        });
    };
    


    return (
        <div>
            <h3>Catégories</h3>
            <ul>
                {
                    dataCategories.map((categorie)=> (
                        <li key={categorie.id} style={{ color: selectedCategories.includes(categorie.id) ? 'red' : 'black' }} onClick={()=>addFiltersCategorie(categorie.id)}>{categorie.nom}</li>
                    ))
                }
            </ul>
            <h3>Ingredients</h3>
            {
                    dataIngredients.map((ingredient)=> (
                        <li key={ingredient.id} style={{ color: selectedIngredients.includes(ingredient.id) ? 'red' : 'black' }} onClick={()=>addFiltersIngredients(ingredient.id)}>{ingredient.nom}</li>
                    ))
            }
            <button onClick={()=>{setFilters(""); setSelectedCategories([]); setSelectedIngredients([])}}>Reset filtre</button>
        </div>
    );
};

export default FiltresRecherche;