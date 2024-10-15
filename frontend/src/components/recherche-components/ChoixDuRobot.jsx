import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ChoixDuRobot = () => {
    const [robotsData, setRobotsData] = useState([])
    const [robot, setRobot] = useState(null)

    useEffect(()=> {
        axios.get("http://127.0.0.1:8000/api/robots")
            .then(r=> {
                setRobotsData(r.data.member)
            })
    },[])

    return (
        <div className="container">
                {
                    robot === null ? 
            <div className='card-container'>
                    {robotsData.map((robot) => (
                        <Link to={'/recherche/'+robot.id} key={robot.nom} onClick={()=>setRobot(robot.nom)}>
                            <div className="list-card"  style={{background: `scroll no-repeat url('src/assets/img/${robot.image_url}') center / cover`}}>
                                <h3>{robot.nom}</h3>
                            </div>
                        </Link>
                    ))
                }
            </div>
                    : <h2>Vous rechercher une recette pour le {robot} !</h2>
                }
        </div>
    );
};

export default ChoixDuRobot;