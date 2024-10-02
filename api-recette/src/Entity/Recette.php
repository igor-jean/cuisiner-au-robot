<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use App\Entity\EtapeDeLaRecette;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Entity\IngredientPourRecette;
use App\Repository\RecetteRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: RecetteRepository::class)]
#[ApiResource]
#[ApiFilter(SearchFilter::class, properties: ['robot' => 'exact', 'categorie' => 'exact'])]
class Recette
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['recette-detail'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['recette-detail'])]
    private ?string $titre = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['recette-detail'])]
    private ?string $description = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['recette-detail'])]
    private ?int $temps_preparation = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['recette-detail'])]
    private ?int $temps_cuisson = null;

    #[ORM\Column]
    #[Groups(['recette-detail'])]
    private ?int $difficulte = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['recette-detail'])]
    private ?string $image_url = null;

    #[ORM\OneToMany(mappedBy: 'recette', targetEntity: IngredientPourRecette::class)]
    private Collection $ingredientPourRecettes;

    #[ORM\OneToMany(mappedBy: 'recette', targetEntity: EtapeDeLaRecette::class)]
    private Collection $etapeDeLaRecettes;

    #[ORM\ManyToOne(inversedBy: 'recette')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Categorie $categorie = null;

    #[ORM\ManyToOne(inversedBy: 'recette')]
    private ?Robot $robot = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $updated_at = null;

    public function __construct()
    {
        $this->ingredientPourRecettes = new ArrayCollection();
        $this->etapeDeLaRecettes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(string $titre): static
    {
        $this->titre = $titre;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getTempsPreparation(): ?int
    {
        return $this->temps_preparation;
    }

    public function setTempsPreparation(?int $temps_preparation): static
    {
        $this->temps_preparation = $temps_preparation;

        return $this;
    }

    public function getTempsCuisson(): ?int
    {
        return $this->temps_cuisson;
    }

    public function setTempsCuisson(?int $temps_cuisson): static
    {
        $this->temps_cuisson = $temps_cuisson;

        return $this;
    }

    public function getDifficulte(): ?int
    {
        return $this->difficulte;
    }

    public function setDifficulte(int $difficulte): static
    {
        $this->difficulte = $difficulte;

        return $this;
    }

    public function getImageUrl(): ?string
    {
        return $this->image_url;
    }

    public function setImageUrl(?string $image_url): static
    {
        $this->image_url = $image_url;

        return $this;
    }

    /**
     * @return Collection<int, IngredientPourRecette>
     */
    public function getIngredientPourRecettes(): Collection
    {
        return $this->ingredientPourRecettes;
    }

    public function addIngredientPourRecette(IngredientPourRecette $ingredientPourRecette): static
    {
        if (!$this->ingredientPourRecettes->contains($ingredientPourRecette)) {
            $this->ingredientPourRecettes->add($ingredientPourRecette);
            $ingredientPourRecette->setRecette($this);
        }

        return $this;
    }

    public function removeIngredientPourRecette(IngredientPourRecette $ingredientPourRecette): static
    {
        if ($this->ingredientPourRecettes->removeElement($ingredientPourRecette)) {
            // set the owning side to null (unless already changed)
            if ($ingredientPourRecette->getRecette() === $this) {
                $ingredientPourRecette->setRecette(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, EtapeDeLaRecette>
     */
    public function getEtapeDeLaRecettes(): Collection
    {
        return $this->etapeDeLaRecettes;
    }

    public function addEtapeDeLaRecette(EtapeDeLaRecette $etapeDeLaRecette): static
    {
        if (!$this->etapeDeLaRecettes->contains($etapeDeLaRecette)) {
            $this->etapeDeLaRecettes->add($etapeDeLaRecette);
            $etapeDeLaRecette->setRecette($this);
        }

        return $this;
    }

    public function removeEtapeDeLaRecette(EtapeDeLaRecette $etapeDeLaRecette): static
    {
        if ($this->etapeDeLaRecettes->removeElement($etapeDeLaRecette)) {
            // set the owning side to null (unless already changed)
            if ($etapeDeLaRecette->getRecette() === $this) {
                $etapeDeLaRecette->setRecette(null);
            }
        }

        return $this;
    }

    public function getCategorie(): ?Categorie
    {
        return $this->categorie;
    }

    public function setCategorie(?Categorie $categorie): static
    {
        $this->categorie = $categorie;

        return $this;
    }

    public function getRobot(): ?Robot
    {
        return $this->robot;
    }

    public function setRobot(?Robot $robot): static
    {
        $this->robot = $robot;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(\DateTimeImmutable $updated_at): static
    {
        $this->updated_at = $updated_at;

        return $this;
    }
}
