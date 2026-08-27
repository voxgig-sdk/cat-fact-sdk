<?php
declare(strict_types=1);

// Typed models for the CatFact SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Fact entity data model. */
class Fact
{
    public ?string $createdAt = null;
    public ?bool $deleted = null;
    public string $id;
    public string $text;
    public string $type;
    public ?string $updatedAt = null;
    public ?int $upvotes = null;
    public ?bool $used = null;
    public ?string $user = null;
    public ?bool $userUpvoted = null;
}

/** Request payload for Fact#load. */
class FactLoadMatch
{
    public ?int $amount = null;
    public ?string $animal_type = null;
}

/** Request payload for Fact#list. */
class FactListMatch
{
    public ?int $amount = null;
    public ?string $animal_type = null;
}

/** User entity data model. */
class User
{
    public ?string $createdAt = null;
    public ?string $email = null;
    public string $id;
    public ?array $name = null;
    public ?string $updatedAt = null;
}

/** Request payload for User#list. */
class UserListMatch
{
    public ?string $createdAt = null;
    public ?string $email = null;
    public ?string $id = null;
    public ?array $name = null;
    public ?string $updatedAt = null;
}

