<?php

// src/DataFixtures/AppFixtures.php
namespace App\DataFixtures;

use App\Entity\Categorie;
use App\Entity\Recette;
use App\Entity\Robot;
use App\Entity\Ingredient;
use App\Entity\IngredientPourRecette;
use App\Entity\EtapeDeLaRecette;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        // Créer des catégories
        $categories = [];
        $nomsCategories = ['Plat principal', 'Dessert', 'Entrée'];
        foreach ($nomsCategories as $nomCategorie) {
            $categorie = new Categorie();
            $categorie->setNom($nomCategorie);
            $manager->persist($categorie);
            $categories[] = $categorie;
        }

        // Créer des robots
        $robots = [];
        $nomsRobots = ['Cookeo', 'Thermomix'];
        foreach ($nomsRobots as $nomRobot) {
            $robot = new Robot();
            $robot->setNom($nomRobot)
                ->setImageUrl($faker->imageUrl());
            $manager->persist($robot);
            $robots[] = $robot;
        }

        // Créer des recettes
        for ($i = 0; $i < 10; $i++) {
            $recette = new Recette();
            $recette->setTitre($faker->sentence(3))
                ->setDescription($faker->paragraph())
                ->setTempsPreparation($faker->numberBetween(10, 60))
                ->setTempsCuisson($faker->numberBetween(10, 120))
                ->setDifficulte($faker->numberBetween(1, 5))
                ->setImageUrl("img-par-dafaut.jpg")
                ->setCategorie($categories[array_rand($categories)])
                ->setRobot($robots[array_rand($robots)])
                ->setCreatedAt(new \DateTimeImmutable())
                ->setUpdatedAt(new \DateTimeImmutable());
            $manager->persist($recette);

            // Créer des ingrédients pour chaque recette
            for ($j = 0; $j < 5; $j++) {
                $ingredient = new Ingredient();
                $ingredient->setNom($faker->word());
                $manager->persist($ingredient);

                $ingredientRecette = new IngredientPourRecette();
                $ingredientRecette->setRecette($recette)
                    ->setIngredient($ingredient)
                    ->setQuantite($faker->randomFloat(2, 1, 500))
                    ->setUnite($faker->randomElement(['g', 'ml', 'unités']));
                $manager->persist($ingredientRecette);
            }

            // Créer des étapes pour chaque recette
            for ($k = 1; $k <= 3; $k++) {
                $etape = new EtapeDeLaRecette();
                $etape->setRecette($recette)
                    ->setEtape($k)
                    ->setDescription($faker->sentence());
                $manager->persist($etape);
            }
        }

        $manager->flush();
    }
}
