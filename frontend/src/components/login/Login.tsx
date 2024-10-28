import React, { useTransition, useState } from "react";
import { FormEventHandler } from "react";
import { AuthStatus, useAuth } from "../../hooks/useAuth";
import { ErrorBoundary } from "react-error-boundary";

const Login = () => {
  const { login, status } = useAuth();
  const [pending, startTransition] = useTransition();
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    try {
      setLoginError(null); // Réinitialiser l'erreur avant chaque tentative
      await login(
        data.get("email")!.toString(),
        data.get("password")!.toString()
      );
    } catch (error: any) {
      // Capture et affichage de l'erreur
      setLoginError(error.message);
    }
  };

  return (
    <div className="container">
      <ErrorBoundary
        fallback={
          <p className="error-message">
            Une erreur inattendue est survenue. Merci de réessayer.
          </p>
        }
      >
        <form
          onSubmit={(e) => {
            startTransition(() => {
              handleSubmit(e);
            });
          }}
          className="form"
        >
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
          <button type="submit" className="submit" disabled={pending}>
            Se connecter
          </button>
          {loginError && <p className="error-message">{loginError}</p>}

          <p className="signup-link">
            Pas de compte ?<a href="">S'inscrire</a>
          </p>
        </form>
      </ErrorBoundary>
    </div>
  );
};

export default Login;
