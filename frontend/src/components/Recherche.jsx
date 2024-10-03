import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import ChoixDuRobot from './recherche-components/ChoixDuRobot';

const Recherche = () => {
    return (
        <div>
            <Navbar/>
            <div className='presentation-recherche'>
                <div className="container">
                    <h1>Explorez des Recettes Innovantes pour Vos Robots de Cuisine !</h1>
                    <p>
                        Bienvenue dans notre moteur de recherche culinaire, conçu spécialement pour vous aider à tirer le meilleur
                        parti de vos robots de cuisine. Que vous ayez un Thermomix, un Monsieur Cuisine ou un autre robot
                        culinaire, vous trouverez ici des recettes adaptées à vos besoins.
                    </p>
                    <div className="details">
                        <details>
                            <summary>
                                Comment ça marche ?
                            </summary>
                            <ol>
                                <li><strong>Choisissez votre robot de cuisine :</strong> Sélectionnez le modèle que vous utilisez pour obtenir des recettes compatibles.</li>
                                <li><strong>Trouvez des recettes selon vos envies :</strong> Cherchez par catégories, ingrédients ou mot-clé dans notre barre de recherche intuitive.</li>
                                <li><strong>Inspirez-vous, cuisinez et partagez :</strong> Une fois la recette trouvée, ajoutez-la à vos favoris ou proposez vos créations à notre communauté !</li>
                            </ol>
                        </details>
                        
                        <details>
                            <summary>
                                Pourquoi utiliser notre moteur de recherche ?
                            </summary>
                            <ul>
                                <li><strong>Rapide et intuitif :</strong> Trouvez la recette parfaite en quelques clics.</li>
                                <li><strong>Une cuisine sans stress :</strong> Des recettes adaptées à votre robot pour des résultats impeccables.</li>
                                <li><strong>Une communauté engagée :</strong> Partagez vos meilleures recettes et inspirez les autres.</li>
                            </ul>
                        </details>
                    </div>
                    <p>Lancez-vous et laissez votre créativité s&apos;exprimer en cuisine !</p>
                </div>
            </div>
            <ChoixDuRobot/>
            <Outlet/>
        </div>
    );
};

export default Recherche;