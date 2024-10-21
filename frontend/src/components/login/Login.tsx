import React from "react";
import { FormEventHandler } from "react";
import { AuthStatus, useAuth } from "../../hooks/useAuth";

const Login = () => {
  const { login, status } = useAuth();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    login(data.get("email")!.toString(), data.get("password")!.toString());
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <p className="form-title">Connectez-vous à votre compte</p>
        <div className="input-container">
          <input type="email" placeholder="Email" name="email" required />
          <span></span>
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            required
          />
        </div>
        <button type="submit" className="submit">
          Se connecter
        </button>

        <p className="signup-link">
          Pas de compte ?<a href="">S'inscrire</a>
        </p>
      </form>

      {status === AuthStatus.Authenticated && (
        <>
          <h3>Connecté !</h3>
        </>
      )}
    </div>
  );
};

export default Login;
