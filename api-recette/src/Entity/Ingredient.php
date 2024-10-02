<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\IngredientPourRecette;
use App\Repository\IngredientRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

#[ORM\Entity(repositoryClass: IngredientRepository::class)]
#[ApiResource]
class Ingredient
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private ?string $nom = null;

    /**
     * @var Collection<int, IngredientPourRecette>
     */
    #[ORM\OneToMany(targetEntity: IngredientPourRecette::class, mappedBy: 'ingredient')]
    private Collection $ingredientPourRecette;

    public function __construct()
    {
        $this->ingredientPourRecette = new ArrayCollection();
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

    /**
     * @return Collection<int, IngredientPourRecette>
     */
    public function getIngredientPourRecette(): Collection
    {
        return $this->ingredientPourRecette;
    }

    public function addIngredientPourRecette(IngredientPourRecette $ingredientPourRecette): static
    {
        if (!$this->ingredientPourRecette->contains($ingredientPourRecette)) {
            $this->ingredientPourRecette->add($ingredientPourRecette);
            $ingredientPourRecette->setIngredient($this);
        }

        return $this;
    }

    public function removeIngredientPourRecette(IngredientPourRecette $ingredientPourRecette): static
    {
        if ($this->ingredientPourRecette->removeElement($ingredientPourRecette)) {
            // set the owning side to null (unless already changed)
            if ($ingredientPourRecette->getIngredient() === $this) {
                $ingredientPourRecette->setIngredient(null);
            }
        }

        return $this;
    }
}
