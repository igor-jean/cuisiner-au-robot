import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const RobotChoisi = () => {
    const {id} = useParams()
    const [dataRecettesRobot, setDataRecettesRobot] = useState([])

    useEffect(()=> {
        axios.get('http://127.0.0.1:8000/api/robots/'+id)
            .then(r=> {
                setDataRecettesRobot(r.data)
            })
    }, [id])

    return (
        <div>
            <NavLink to={'/recherche/robot/'+id+'/categories'}>Par Catégorie</NavLink>
            <h1>Vous avez choisi le {dataRecettesRobot.nom} !</h1>
            {   dataRecettesRobot.recettes ?
                dataRecettesRobot.recettes.map((recette)=> (
                    <div className='card-recette' key={recette.id}>
                        <div className="bg"></div>
                        <div className="blob"></div>
                        <div className="overflow">
                            <img src={`/build/images/`} alt="photo de " style={{width:"100%"}} />
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

export default RobotChoisi;