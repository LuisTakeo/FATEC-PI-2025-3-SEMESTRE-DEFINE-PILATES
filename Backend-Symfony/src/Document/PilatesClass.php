<?php

namespace App\Document;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Symfony\Component\Serializer\Annotation\Groups;

#[MongoDB\Document]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Get(),
        new Post(),
        new Put(),
        new Delete()
    ],
    normalizationContext: ['groups' => ['class:read']],
    denormalizationContext: ['groups' => ['class:write']]
)]
class PilatesClass
{
    #[MongoDB\Id]
    #[Groups(['class:read'])]
    private ?string $id = null;

    #[MongoDB\Field(type: 'string')]
    #[Groups(['class:read', 'class:write'])]
    private ?string $name = null;

    #[MongoDB\Field(type: 'string')]
    #[Groups(['class:read', 'class:write'])]
    private ?string $description = null;

    #[MongoDB\Field(type: 'int')]
    #[Groups(['class:read', 'class:write'])]
    private ?int $maxParticipants = null;

    #[MongoDB\Field(type: 'float')]
    #[Groups(['class:read', 'class:write'])]
    private ?float $price = null;

    #[MongoDB\Field(type: 'string')]
    #[Groups(['class:read', 'class:write'])]
    private ?string $level = null;

    #[MongoDB\Field(type: 'date')]
    #[Groups(['class:read', 'class:write'])]
    private ?\DateTime $scheduledAt = null;

    #[MongoDB\Field(type: 'date')]
    #[Groups(['class:read'])]
    private ?\DateTime $createdAt = null;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;
        return $this;
    }

    public function getMaxParticipants(): ?int
    {
        return $this->maxParticipants;
    }

    public function setMaxParticipants(int $maxParticipants): self
    {
        $this->maxParticipants = $maxParticipants;
        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;
        return $this;
    }

    public function getLevel(): ?string
    {
        return $this->level;
    }

    public function setLevel(string $level): self
    {
        $this->level = $level;
        return $this;
    }

    public function getScheduledAt(): ?\DateTime
    {
        return $this->scheduledAt;
    }

    public function setScheduledAt(\DateTime $scheduledAt): self
    {
        $this->scheduledAt = $scheduledAt;
        return $this;
    }

    public function getCreatedAt(): ?\DateTime
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTime $createdAt): self
    {
        $this->createdAt = $createdAt;
        return $this;
    }
}
