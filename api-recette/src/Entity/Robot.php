<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\RobotRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: RobotRepository::class)]
#[ApiResource(normalizationContext: ['groups' => ['recette-detail', 'robot_list']])]
class Robot
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['robot_list'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['robot_list'])]
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    #[Groups(['robot_list'])]
    private ?string $image_url = null;

    #[ORM\OneToMany(mappedBy: 'robot', targetEntity: Recette::class)]
    private Collection $recettes;

    public function __construct()
    {
        $this->recettes = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getImageUrl(): ?string
    {
        return $this->image_url;
    }

    public function setImageUrl(string $image_url): static
    {
        $this->image_url = $image_url;

        return $this;
    }

    #[Groups(['recette-detail'])]
    public function getRecettes(): Collection
    {
        return $this->recettes;
    }
}
