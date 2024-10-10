<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Core\User\UserInterface;

class UserController extends AbstractController
{



    #[Route("/api/users/me", name: "get_current_user", methods: "GET")]
    public function me(): JsonResponse
    {

        $user = $this->getUser();

        // Vérification si l'utilisateur est bien une instance de User
        if (!$user instanceof \App\Entity\User) {
            return new JsonResponse(['error' => 'User not found'], 404);
        }

        return new JsonResponse([
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'nom' => $user->getNom(),
            'prenom' => $user->getPrenom(),
        ]);
    }
}
