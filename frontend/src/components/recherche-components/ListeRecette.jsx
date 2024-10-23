import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Card from "./Card";

// eslint-disable-next-line react/prop-types
const ListeRecette = ({ filters }) => {
  const { robot } = useParams();
  const [listeRecette, setListeRecette] = useState();
  const { status, logout, authenticate } = useAuth();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/recettes?robot=" + robot + "&" + filters)
      .then((r) => {
        setListeRecette(r.data.member);
      });
  }, [robot, filters]);

  useEffect(() => {
    authenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="recette-container">
      {listeRecette ? (
        listeRecette.map((recette) => (
          <Card recette={recette} key={recette.id} />
        ))
      ) : (
        <div>Chargement ...</div>
      )}
    </div>
  );
};

export default ListeRecette;
