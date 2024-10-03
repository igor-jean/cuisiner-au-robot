import { useState } from "react";
import FiltresRecherche from "./FiltresRecherche";
import ListeRecette from "./ListeRecette";

const RobotChoisi = () => {
    const [filters, setFilters] = useState("")

    return (
        <div>
            <FiltresRecherche setFilters={setFilters}/>
            <ListeRecette filters={filters}/>
        </div>
    );
};

export default RobotChoisi;