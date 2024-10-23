import { useCallback } from "react";
import { useAccountStore } from "./store";
import { Account } from "./types";
import { apiFetch } from "./api";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export enum AuthStatus {
  Unknown = 0,
  Authenticated = 1,
  Guest = 2,
}

export function useAuth() {
  const { account, setAccount } = useAccountStore();
  let status = AuthStatus.Unknown;

  switch (account) {
    case null:
      status = AuthStatus.Guest;
      break;
    case undefined:
      status = AuthStatus.Unknown;
      break;
    default:
      status = AuthStatus.Authenticated;
      break;
  }

  const authenticate = useCallback(() => {
    if (status === AuthStatus.Authenticated) {
      apiFetch<Account>("/users/me")
        .then(setAccount)
        .catch(() => setAccount(null));
    }
  }, []);

  const login = useCallback((email: string, password: string) => {
    apiFetch<{ token: string }>("/login_check", { email, password })
      .then((response) => {
        const token = response.token;

        // Décoder le token JWT
        const decodedToken = jwtDecode<Account>(token);

        // Stocker uniquement les informations nécessaires
        setAccount({
          id: decodedToken.id,
          email: decodedToken.email,
          username: decodedToken.username,
          nom: decodedToken.nom,
          prenom: decodedToken.prenom,
          favoris: decodedToken.favoris,
        });

        // En option : stocker aussi le token JWT si tu en as besoin pour les requêtes API suivantes
        localStorage.setItem("jwtToken", token);
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion :", error);
      });
  }, []);

  const addFavori = (idFavori: string) => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      console.error("Token JWT manquant");
      return;
    }

    axios
      .post(
        `http://127.0.0.1:8000/api/favoris/${idFavori}`,
        {},
        {
          headers: {
            Accept: "application/ld+json",
            "Content-Type": "application/ld+json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Ajout de la recette en favoris", response.data);
      })
      .catch((error) => {
        if (error.response) {
          // La requête a été faite et le serveur a répondu avec un code d'état
          // qui n'est pas dans la plage de 2xx
          console.error("Erreur lors de l'ajout :", error.response.data);
        } else if (error.request) {
          // La requête a été faite mais aucune réponse n'a été reçue
          console.error(
            "Erreur lors de l'ajout, aucune réponse reçue :",
            error.request
          );
        } else {
          // Quelque chose s'est produit lors de la configuration de la requête
          console.error("Erreur lors de l'ajout :", error.message);
        }
      });
  };

  const removeFavori = useCallback((idFavori: string) => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      console.error("Token JWT manquant");
      return;
    }
    axios
      .delete(`http://127.0.0.1:8000/api/favoris/${idFavori}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Suppression de la recette en favoris", response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression'", error);
      });
  }, []);

  const logout = useCallback(() => {
    setAccount(null);
    localStorage.removeItem("jwtToken");
  }, []);

  return {
    status,
    authenticate,
    login,
    logout,
    addFavori,
    removeFavori,
  };
}
