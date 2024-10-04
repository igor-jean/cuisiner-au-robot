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

        const displayStars = (nb) => {
        return Array.from({ length: nb }, (_, index) => (
            <i key={index} className="fa fa-star"></i>
        ));
    };

    return (
        <div className="recette-container">
            {
                listeRecette ?
                listeRecette.map((recette)=> (
// 
                    

                        <div className="card" key={recette.id}>
                            <div className="header">
                                <img src={"../src/assets/img/"+recette.image_url} alt="" />
                                <div className="icon">
                                    <i className="fa-regular fa-heart"></i>
                                </div>
                            </div>
                        <div className="text">
                            <h3 className="food">
                                {recette.titre}
                            </h3>
                            <i className="fa-regular fa-clock"></i> {parseInt(recette.temps_preparation || 0) + parseInt(recette.temps_cuisson || 0)} Min
                            {/* <i className="fa fa-users"> Serves 2</i> */}
                            <div className="stars">
                                <li>
                                {
                                     
                                    displayStars(recette.difficulte)
                                }
                                </li>
                            </div>
                        </div>
                        <a href="#" className="btn">En cuisine !</a>
                        </div>



// 
                    // <div className='card-recette' key={recette.id}>
                    //     <div className="bg"></div>
                    //     <div className="blob"></div>
                    //     <div className="overflow">
                    //         <img src={"../src/assets/img/"+recette.image_url} alt="photo de " style={{width:"100%"}} />
                    //     </div>
                    //     <div className="deroulement">
                    //         <h4>{recette.titre}</h4>
                    //         <p>
                    //             <span>{parseInt(recette.temps_preparation || 0) + parseInt(recette.temps_cuisson || 0)} min</span>
                    //             <span>Difficulté: {recette.difficulte}</span>
                    //         </p>
                    //     </div>
                    // </div>





                )) : <div>Chargement ...</div>
            }
        </div>
    );
};

export default ListeRecette;