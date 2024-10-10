<?php

namespace App\EventSubscriber;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\HttpFoundation\JsonResponse;

#[AsEventListener(event: "lexik_jwt_authentication.on_jwt_created", method: 'onJWTCreated')]
final class JWTCreatedListener
{
    public function onJWTCreated(JWTCreatedEvent $event): void
    {
        $payload = $event->getData();
        $user = $event->getUser();

        if ($user instanceof \App\Entity\User) {
            $payload['email'] = $event->getUser()->getUserIdentifier();
            $payload['id'] = $user->getId();
            $payload['nom'] = $user->getNom();
            $payload['prenom'] = $user->getPrenom();

            $event->setData($payload);
        }
    }
}
