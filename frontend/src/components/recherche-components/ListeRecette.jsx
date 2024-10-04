import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ListeRecette = ({filters}) => {
    const {robot} = useParams()
    const [listeRecette, setListeRecette] = useState()

    useEffect(()=> {
        axios.get('http://localhost:8000/api/recettes?robot='+robot+"&"+filters)
            .then(r=> {
                setListeRecette(r.data.member)
            })
    }, [robot, filters])

    return (
        <div>
            {
                listeRecette ?
                listeRecette.map((recette)=> (
                    <div className='card-recette' key={recette.id}>
                        <div className="bg"></div>
                        <div className="blob"></div>
                        <div className="overflow">
                            <img src={"../src/assets/img/"+recette.image_url} alt="photo de " style={{width:"100%"}} />
                        </div>
                        <div className="deroulement">
                            <h4>{recette.titre}</h4>
                            <p>
                                <span>{parseInt(recette.temps_preparation || 0) + parseInt(recette.temps_cuisson || 0)} min</span>
                                <span>Difficulté: {recette.difficulte}</span>
                            </p>
                        </div>
                    </div>
                )) : <div>Chargement ...</div>
            }
        </div>
    );
};

export default ListeRecette;