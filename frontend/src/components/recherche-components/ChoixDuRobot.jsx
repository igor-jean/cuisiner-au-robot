import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ChoixDuRobot = () => {
    const [robotsData, setRobotsData] = useState([])

    useEffect(()=> {
        axios.get("http://127.0.0.1:8000/api/robots")
            .then(r=> {
                setRobotsData(r.data.member)
            })
    },[])

    return (
        <div className="container">
            <div className='card-container'>
                {
                    robotsData.map((robot) => (
                        <Link to={'/recherche/'+robot.id} key={robot.nom}>
                            <div className="list-card"  style={{background: `scroll no-repeat url('src/assets/img/${robot.image_url}') center / cover`}}>
                                <h3>{robot.nom}</h3>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default ChoixDuRobot;