# Typed models for the CatFact SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class FactRequired(TypedDict):
    id: str
    text: str
    type: str


class Fact(FactRequired, total=False):
    created_at: str
    deleted: bool
    updated_at: str
    upvote: int
    used: bool
    user: str
    user_upvoted: bool


class FactLoadMatch(TypedDict, total=False):
    created_at: str
    deleted: bool
    id: str
    text: str
    type: str
    updated_at: str
    upvote: int
    used: bool
    user: str
    user_upvoted: bool


class FactListMatch(TypedDict, total=False):
    created_at: str
    deleted: bool
    id: str
    text: str
    type: str
    updated_at: str
    upvote: int
    used: bool
    user: str
    user_upvoted: bool


class UserRequired(TypedDict):
    id: str


class User(UserRequired, total=False):
    created_at: str
    email: str
    name: dict
    updated_at: str


class UserListMatch(TypedDict, total=False):
    created_at: str
    email: str
    id: str
    name: dict
    updated_at: str
