import axios from 'axios';
import { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const FiltresRecherche = ({setFilters}) => {
    const [dataCategories, setDataCategories] = useState([])
    const [dataIngredients, setDataIngredients] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedIngredients, setSelectedIngredients] = useState([])
    const [titre, setTitre] = useState("")
    const [selectedDifficulte, setSelectedDifficulte] = useState([])

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

    const inputSearchFilter = () => {
        setFilters(prevFilters => {
            let updatedFilters = new URLSearchParams(prevFilters);
            if (!updatedFilters.getAll('titre').includes(titre.toString())) {

                updatedFilters.append('titre', titre);
            }else {
                updatedFilters.delete('titre', titre)
            }

            return `${updatedFilters.toString()}&`;
        })
    }

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
    
    const addDifficulte = (difficulte) => {
        setSelectedDifficulte(prevSelected => {
            if(prevSelected.includes(difficulte)) {
                return prevSelected.filter(id=>id!=difficulte)
            }else {
                return [...prevSelected, difficulte]
            }
        })

        setFilters(prevFilters => {
            let updatedFilters = new URLSearchParams(prevFilters);
    
            // Vérifie si l'ingrédient est déjà présent
            if (!updatedFilters.getAll('difficulte[]').includes(difficulte.toString())) {
                // Ajoute le nouvel ingrédient dans le tableau 'ingredient[]'
                updatedFilters.append('difficulte[]', difficulte);
            } else {
                updatedFilters.delete('difficulte[]', difficulte)
            }
    
            return `${updatedFilters.toString()}&`;
        });
    };



    return (
        <div className='filters'>
            <button onClick={()=>{setFilters(""); setSelectedCategories([]); setSelectedIngredients([]); setTitre("")}}>Réinitialiser les filtres</button>
            <input type="text" placeholder='Recherche par mot-clé' onChange={(e)=>setTitre(e.target.value)} value={titre}/>
            <button onClick={inputSearchFilter}>Rechercher</button>
            <h3>Catégories</h3>
            <ul>
                {
                    dataCategories.map((categorie)=> (
                        <li key={categorie.id} className={ selectedCategories.includes(categorie.id) ? 'active-item' : 'inactive-item' } onClick={()=>addFiltersCategorie(categorie.id)}>{categorie.nom}</li>
                    ))
                }
            </ul>
            <h3>Ingredients</h3>
            {
                    dataIngredients.map((ingredient)=> (
                        <li key={ingredient.id} className={ selectedIngredients.includes(ingredient.id) ? 'active-item' : 'inactive-item' } onClick={()=>addFiltersIngredients(ingredient.id)}>{ingredient.nom}</li>
                    ))
            }
            <h3>Difficulté</h3>
            <ul>
                <li className={ selectedDifficulte.includes('1') ? 'active-item' : 'inactive-item' } onClick={()=>addDifficulte("1")}>1</li>
                <li className={ selectedDifficulte.includes('2') ? 'active-item' : 'inactive-item' } onClick={()=>addDifficulte("2")}>2</li>
                <li className={ selectedDifficulte.includes('3') ? 'active-item' : 'inactive-item' } onClick={()=>addDifficulte("3")}>3</li>
                <li className={ selectedDifficulte.includes('4') ? 'active-item' : 'inactive-item' } onClick={()=>addDifficulte("4")}>4</li>
                <li className={ selectedDifficulte.includes('5') ? 'active-item' : 'inactive-item' } onClick={()=>addDifficulte("5")}>5</li>
            </ul>
            <h3>Prêt en ...</h3>
            <input type="range" name="" id="" />
        </div>
    );
};

export default FiltresRecherche;