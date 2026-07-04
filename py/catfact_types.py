# Typed models for the CatFact SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Fact:
    id: str
    text: str
    type: str
    created_at: Optional[str] = None
    deleted: Optional[bool] = None
    updated_at: Optional[str] = None
    upvote: Optional[int] = None
    used: Optional[bool] = None
    user: Optional[str] = None
    user_upvoted: Optional[bool] = None


@dataclass
class FactLoadMatch:
    created_at: Optional[str] = None
    deleted: Optional[bool] = None
    id: Optional[str] = None
    text: Optional[str] = None
    type: Optional[str] = None
    updated_at: Optional[str] = None
    upvote: Optional[int] = None
    used: Optional[bool] = None
    user: Optional[str] = None
    user_upvoted: Optional[bool] = None


@dataclass
class FactListMatch:
    created_at: Optional[str] = None
    deleted: Optional[bool] = None
    id: Optional[str] = None
    text: Optional[str] = None
    type: Optional[str] = None
    updated_at: Optional[str] = None
    upvote: Optional[int] = None
    used: Optional[bool] = None
    user: Optional[str] = None
    user_upvoted: Optional[bool] = None


@dataclass
class User:
    id: str
    created_at: Optional[str] = None
    email: Optional[str] = None
    name: Optional[dict] = None
    updated_at: Optional[str] = None


@dataclass
class UserListMatch:
    created_at: Optional[str] = None
    email: Optional[str] = None
    id: Optional[str] = None
    name: Optional[dict] = None
    updated_at: Optional[str] = None

