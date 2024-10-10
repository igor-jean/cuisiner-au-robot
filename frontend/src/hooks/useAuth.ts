import { useCallback } from "react";
import { useAccountStore } from "./store";
import { Account } from "./types"
import { apiFetch } from "./api";
import { jwtDecode } from 'jwt-decode';

export enum AuthStatus {
    Unknown = 0,
    Authenticated =1,
    Guest = 2,
}

export function useAuth() {
    const {account, setAccount} = useAccountStore()
    let status = AuthStatus.Unknown;

    switch (account) {
        case null:
            status = AuthStatus.Guest
            break;
        case undefined:
            status = AuthStatus.Unknown
            break;
        default:
            status = AuthStatus.Authenticated;
            break;
    }

    const authenticate = useCallback(() => {
        if(status === AuthStatus.Authenticated) {
            apiFetch<Account>("/users/me")
            .then(setAccount)
            .catch(() => setAccount(null));
        }
    }, []);
  

const login = useCallback((email: string, password: string) => {
    apiFetch<{ token: string }>("/login_check", { email, password })
        .then(response => {
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
            });

            // En option : stocker aussi le token JWT si tu en as besoin pour les requêtes API suivantes
            localStorage.setItem("jwtToken", token);
            window.location.href = '/';
        })
        .catch(error => {
            console.error("Erreur lors de la connexion :", error);
        });
}, []);

    
    

    const logout = useCallback(() => {
            setAccount(null);
            localStorage.removeItem('jwtToken');
    }, []);
    

    return {
        status,
        authenticate,
        login,
        logout,
    }
}