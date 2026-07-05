// Typed models for the CatFact SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Fact {
  created_at?: string
  deleted?: boolean
  id: string
  text: string
  type: string
  updated_at?: string
  upvote?: number
  used?: boolean
  user?: string
  user_upvoted?: boolean
}

export interface FactLoadMatch {
  created_at?: string
  deleted?: boolean
  id: string
  text?: string
  type?: string
  updated_at?: string
  upvote?: number
  used?: boolean
  user?: string
  user_upvoted?: boolean
}

export interface FactListMatch {
  created_at?: string
  deleted?: boolean
  id?: string
  text?: string
  type?: string
  updated_at?: string
  upvote?: number
  used?: boolean
  user?: string
  user_upvoted?: boolean
}

export interface User {
  created_at?: string
  email?: string
  id: string
  name?: Record<string, any>
  updated_at?: string
}

export interface UserListMatch {
  created_at?: string
  email?: string
  id?: string
  name?: Record<string, any>
  updated_at?: string
}

