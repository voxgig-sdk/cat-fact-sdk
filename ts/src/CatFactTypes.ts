// Typed models for the CatFact SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Fact {
  createdAt?: string
  deleted?: boolean
  id: string
  text: string
  type: string
  updatedAt?: string
  upvotes?: number
  used?: boolean
  user?: string
  userUpvoted?: boolean
}

export interface FactLoadMatch {
  amount?: number
  animal_type?: string

  // Selects a custom action instead of the plain load:
  //   'random'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface FactListMatch {
  amount?: number
  animal_type?: string
}

export interface User {
  createdAt?: string
  email?: string
  id: string
  name?: Record<string, any>
  updatedAt?: string
}

export interface UserListMatch {
  createdAt?: string
  email?: string
  id?: string
  name?: Record<string, any>
  updatedAt?: string
}

