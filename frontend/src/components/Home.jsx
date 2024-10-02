import HomeSlider from './HomeSlider';
import Navbar from './Navbar';

const Home = () => {
    return (
        <div>
            <Navbar/>
            <header>
                <div className="">
                    <h1>Cuisiner avec mon robot</h1>
                    <p>Découvrez des recettes qui feront danser vos papilles !</p>
                    <button className="button">
                        <span className="button__icon-wrapper">
                            <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="button__icon-svg" width="10">
                                <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor"></path>
                            </svg>

                            <svg viewBox="0 0 14 15" fill="none" width="10" xmlns="http://www.w3.org/2000/svg" className="button__icon-svg button__icon-svg--copy">
                                <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor"></path>
                            </svg>
                        </span>
                        <a href="">Explorez maintenant !</a>
                    </button>
                </div>
            </header>
            <section className="home-text">
                <div className="container">
                    <h2>Bienvenue dans l&apos;univers des recettes pour robots !</h2>
                    <p>
                        Transformez votre cuisine avec des idées innovantes et des recettes exclusives, spécialement conçues pour votre robot de cuisine préféré.Nous vous invitons à découvrir une plateforme où la créativité culinaire rencontre la technologie. Que vous soyez un cuisinier amateur ou un expert, notre application est là pour vous simplifier la vie en cuisine tout en vous inspirant.
                    </p>
                    <h3>Comment profiter pleinement de cette aventure ?</h3>
                    <ul>
                        <li>Connectez-vous à votre espace personnalisé pour accéder à vos recettes préférées et découvrir de nouvelles idées adaptées à vos goûts.</li>
                        <li>Proposez vos propres recettes et rejoignez une communauté passionnée prête à partager et échanger des astuces culinaires.</li>
                        <li>Naviguez facilement dans notre interface intuitive, et trouvez des recettes faites sur mesure pour votre robot de cuisine.</li>
                    </ul>
                    <h3>Pourquoi choisir notre application ?</h3>
                    <ul>
                        <li><strong>Recettes sur mesure</strong> : Que vous soyez fan de plats rapides ou d&apos;aventures culinaires complexes, vous trouverez ici de quoi satisfaire toutes vos envies.</li>
                        <li><strong>Partagez et inspirez</strong> : Devenez une source d&apos;inspiration pour d&apos;autres utilisateurs en partageant vos meilleures recettes.</li>
                        <li><strong>Un support pour tous vos robots</strong> : Thermomix, Monsieur Cuisine, et bien plus encore ! Chaque recette est soigneusement adaptée pour garantir des résultats impeccables.</li>
                    </ul>
                    <p>Entrez dans le monde des recettes connectées, et laissez votre robot vous aider à créer des plats délicieux et variés chaque jour !</p>
                </div>
            </section>
            <section className="user-action-panel">
                <div className="container">
                        <h3>N&apos;attendez plus pour vous inscrire !</h3>
                        <p>Rejoignez notre communauté pour profiter de nombreux avantages :</p>
                        <ul>
                            <li>
                                <strong>- Proposez vos propres recettes :</strong>
                                Partagez vos créations culinaires avec d&apos;autres passionnés de cuisine.</li>
                            <li>
                                <strong>- Ajoutez des recettes à vos favoris :</strong>
                                Sauvegardez vos recettes préférées pour les retrouver facilement.</li>
                        </ul>
                        <p>
                            <a href="">Inscrivez-vous maintenant</a>
                            et commencez à explorer toutes les possibilités offertes par votre robot culinaire !
                        </p>
                </div>
            </section>
            <HomeSlider/>
            <section className="meal-planning-feature">
                <div className="container feature-description">
                    <h3>Organisez vos repas avec simplicité grâce à notre outil de planification de menus !</h3>
                    <p>
                        Avec notre fonctionnalité de <strong>favoris</strong> et de <strong>planification de menus</strong>, vous pouvez gérer vos repas de manière pratique et efficace.
                    </p>
                    <ol>
                        <li>
                            <strong>1- Ajoutez des recettes à vos favoris :</strong> Trouvez des recettes que vous aimez et enregistrez-les dans vos favoris en un clic. Ainsi, vous les avez toujours à portée de main.
                        </li>
                        <li>
                            <strong>2- Créez votre semaine de menus :</strong> Lorsque vous êtes prêt à planifier vos repas, cliquez sur le lien &quot;Créer ma semaine de menu&quot;. Sélectionnez les recettes que vous souhaitez préparer chaque jour de la semaine. C&quot;est simple et rapide !
                        </li>
                        <li>
                            <strong>3- Validez et obtenez votre liste de courses :</strong> Une fois votre menu hebdomadaire finalisé, validez-le pour générer automatiquement une liste de courses comprenant tous les ingrédients nécessaires. Vous recevrez également un tableau récapitulatif de vos menus, pour un aperçu clair de votre semaine.
                        </li>
                    </ol>

                    <p>Avec cette fonctionnalité, vous pouvez non seulement gagner du temps dans la planification de vos repas, mais aussi vous assurer que rien ne manque pour préparer vos plats favoris !</p>
                </div>
            </section>
        </div>
    );
};

export default Home;