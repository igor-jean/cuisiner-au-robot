<?php

namespace App\Controller;

use App\Repository\RecetteRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController
{


    #[Route("/api/users/me", name: "get_current_user", methods: "GET")]
    public function me(RecetteRepository $recetteRepository): JsonResponse
    {
        $user = $this->getUser();
        
        if (!$user instanceof \App\Entity\User) {
            return new JsonResponse(['error' => 'User not found'], 404);
        }
    
        $recetteIds = $user->getFavoris();
        $favorisArray = [];
        foreach ($recetteIds as $id) {
            $recette = $recetteRepository->find($id); 
            if ($recette) { 
                $favorisArray[] = [
                    'id' => $recette->getId(),
                    'titre' => $recette->getTitre(),
                    'description' => $recette->getDescription(),
                    'temps_preparation' => $recette->getTempsPreparation(),
                    'temps_cuisson' => $recette->getTempsCuisson(),
                    'difficulte' => $recette->getDifficulte(),
                    'image_url' => $recette->getImageUrl(),
                ];
            }
        }
    
        return new JsonResponse([
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'nom' => $user->getNom(),
            'prenom' => $user->getPrenom(),
            'avatar_url' => $user->getAvatarUrl(),
            'favoris' =>   $favorisArray,
        ]);
    }
    

    #[Route('api/favoris/{recetteId}', methods: ['POST'])]
    public function addFavori(int $recetteId, UserInterface $user, RecetteRepository $recetteRepository, EntityManagerInterface $em): JsonResponse
    {
        $recette = $recetteRepository->find($recetteId);
        if (!$recette) {
            return new JsonResponse(['status' => 'Recette non trouvée!'], Response::HTTP_NOT_FOUND);
        }

        if (!$user instanceof \App\Entity\User) {
            return new JsonResponse(['status' => 'Utilisateur non valide!'], Response::HTTP_UNAUTHORIZED);
        }

        $user->addFavori($recetteId);

        $em->persist($user);

        try {
            $em->flush(); 
            return new JsonResponse(['status' => 'Recette ajoutée aux favoris!']);
        } catch (\Exception $e) {
            return new JsonResponse(['status' => 'Erreur lors de l\'ajout : ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('api/favoris/{recetteId}', methods: ['DELETE'])]
    public function removeFavori(int $recetteId, UserInterface $user, EntityManagerInterface $em): JsonResponse
    {
        if (!in_array($recetteId, $user->getFavoris(), true)) {
            return new JsonResponse(['status' => 'Favori non trouvé!'], Response::HTTP_NOT_FOUND);
        }

        $user->removeFavori($recetteId);

        $em->persist($user);
        
        try {
            $em->flush();
            return new JsonResponse(['status' => 'Recette retirée des favoris!']);
        } catch (\Exception $e) {
            return new JsonResponse(['status' => 'Erreur lors du retrait : ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    
}
