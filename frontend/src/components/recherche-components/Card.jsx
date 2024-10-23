import React, { useEffect, useState } from "react";
import { useAccount } from "../../hooks/useAccount";
import { useAuth } from "../../hooks/useAuth";

const Card = ({ recette }) => {
  const { account } = useAccount();
  const [isFavori, setIsFavori] = useState(false);
  const { addFavori, removeFavori } = useAuth();

  const displayStars = (nb) => {
    return Array.from({ length: nb }, (_, index) => (
      <i key={index} className="fa fa-star"></i>
    ));
  };

  const handleFavoriToggle = () => {
    setIsFavori(!isFavori); // Changement immédiat de l'état

    if (isFavori) {
      removeFavori(recette.id)
        .then(() => {
          console.log("Favori retiré");
        })
        .catch(() => {
          setIsFavori(true); // Réinitialiser l'état en cas d'échec
        });
    } else {
      addFavori(recette.id)
        .then(() => {
          console.log("Favori ajouté");
        })
        .catch(() => {
          setIsFavori(false); // Réinitialiser l'état en cas d'échec
        });
    }
  };

  const displayHeart = () => {
    if (isFavori) {
      return (
        <i
          className="fa-solid fa-heart"
          onClick={handleFavoriToggle}
          style={{ color: "#ff000d" }}
        ></i>
      );
    } else {
      return (
        <i className="fa-regular fa-heart" onClick={handleFavoriToggle}></i>
      );
    }
  };

  useEffect(() => {
    if (account.favoris != null) {
      const favoriIds = account.favoris.map((favori) => favori.id);
      if (favoriIds.includes(recette.id)) {
        setIsFavori(true);
      }
    }
  }, [account, recette.id]);

  return (
    <div className="card">
      <div className="header">
        <img src={"../src/assets/img/" + recette.image_url} alt="" />
        <div className="icon">{displayHeart()}</div>
      </div>
      <div className="text">
        <h3 className="food">{recette.titre}</h3>
        <i className="fa-regular fa-clock"></i>{" "}
        {parseInt(recette.temps_preparation || 0) +
          parseInt(recette.temps_cuisson || 0)}{" "}
        Min
        <div className="stars">
          <li>{displayStars(recette.difficulte)}</li>
        </div>
      </div>
      <a href="#" className="btn">
        En cuisine !
      </a>
    </div>
  );
};

export default Card;
