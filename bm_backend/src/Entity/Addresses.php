<?php

namespace App\Entity;

use App\Repository\AddressesRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AddressesRepository::class)]
class Addresses
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $Street_Type = null;

    #[ORM\Column(length: 255)]
    private ?string $Name = null;

    #[ORM\Column]
    private ?int $Zip_Code = null;

    #[ORM\Column(length: 255)]
    private ?string $City = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStreetType(): ?string
    {
        return $this->Street_Type;
    }

    public function setStreetType(string $Street_Type): static
    {
        $this->Street_Type = $Street_Type;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->Name;
    }

    public function setName(string $Name): static
    {
        $this->Name = $Name;

        return $this;
    }

    public function getZipCode(): ?int
    {
        return $this->Zip_Code;
    }

    public function setZipCode(int $Zip_Code): static
    {
        $this->Zip_Code = $Zip_Code;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->City;
    }

    public function setCity(string $City): static
    {
        $this->City = $City;

        return $this;
    }
}
