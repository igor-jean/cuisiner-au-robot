import React from 'react';
import { FormEventHandler } from 'react';
import { AuthStatus, useAuth } from '../../hooks/useAuth';

const Login = () => {
    const { login, status } = useAuth();

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
 
        login(
            data.get("email")!.toString(),
            data.get("password")!.toString()
        );  
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>Email</p>
                <input type="email" name="email" required defaultValue={"admin@admin.fr"}/>
                <p>Mot de passe</p>
                <input type="password" name="password" defaultValue={'admin'} required />
                <input type="submit" value="Se connecter" />
            </form>
            {
                status === AuthStatus.Authenticated && 
                <>
                    <h3>Connecté  !</h3>
                </>
            }
        </div>
    );
};

export default Login;
