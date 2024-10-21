import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useAccount } from "../../hooks/useAccount";

const Profil = () => {
  const { status, logout, authenticate } = useAuth();
  const { account } = useAccount();

  useEffect(() => {
    authenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      </div>
    </div>
  );
};

export default Profil;
