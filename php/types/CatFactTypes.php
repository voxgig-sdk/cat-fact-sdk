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
    public ?string $created_at = null;
    public ?bool $deleted = null;
    public string $id;
    public string $text;
    public string $type;
    public ?string $updated_at = null;
    public ?int $upvote = null;
    public ?bool $used = null;
    public ?string $user = null;
    public ?bool $user_upvoted = null;
}

/** Match filter for Fact#load (any subset of Fact fields). */
class FactLoadMatch
{
    public ?string $created_at = null;
    public ?bool $deleted = null;
    public ?string $id = null;
    public ?string $text = null;
    public ?string $type = null;
    public ?string $updated_at = null;
    public ?int $upvote = null;
    public ?bool $used = null;
    public ?string $user = null;
    public ?bool $user_upvoted = null;
}

/** Match filter for Fact#list (any subset of Fact fields). */
class FactListMatch
{
    public ?string $created_at = null;
    public ?bool $deleted = null;
    public ?string $id = null;
    public ?string $text = null;
    public ?string $type = null;
    public ?string $updated_at = null;
    public ?int $upvote = null;
    public ?bool $used = null;
    public ?string $user = null;
    public ?bool $user_upvoted = null;
}

/** User entity data model. */
class User
{
    public ?string $created_at = null;
    public ?string $email = null;
    public string $id;
    public ?array $name = null;
    public ?string $updated_at = null;
}

/** Match filter for User#list (any subset of User fields). */
class UserListMatch
{
    public ?string $created_at = null;
    public ?string $email = null;
    public ?string $id = null;
    public ?array $name = null;
    public ?string $updated_at = null;
}

