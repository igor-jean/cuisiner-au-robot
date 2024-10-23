import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useAccount } from "../../hooks/useAccount";
import Card from "../recherche-components/Card";

const Profil = () => {
  const { status, logout, authenticate } = useAuth();
  const { account } = useAccount();

  useEffect(() => {
    authenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayStars = (nb) => {
    return Array.from({ length: nb }, (_, index) => (
      <i key={index} className="fa fa-star"></i>
    ));
  };

  return (
    <div className="container">
      <div className="user-div">
        <img
          src={"../src/assets/img/" + account.avatar_url}
          alt={"Avatar de" + account.nom + " " + account.prenom}
          style={{ width: "100px" }}
        />
        <p>
          {account.nom} {account.prenom}
        </p>
      </div>
      <div className="favoris">
        <h3>Mes recettes preferées</h3>
        <div className="recette-container">
          {account.favoris ? (
            account.favoris.map((recette, index) => (
              <Card recette={recette} key={recette.id} />
            ))
          ) : (
            <p>Vous n'avez pas de recettes favoris</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profil;
