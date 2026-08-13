-- Typed models for the CatFact SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Fact
---@field createdAt? string
---@field deleted? boolean
---@field id string
---@field text string
---@field type string
---@field updatedAt? string
---@field upvotes? number
---@field used? boolean
---@field user? string
---@field userUpvoted? boolean

---@class FactLoadMatch
---@field createdAt? string
---@field deleted? boolean
---@field id string
---@field text? string
---@field type? string
---@field updatedAt? string
---@field upvotes? number
---@field used? boolean
---@field user? string
---@field userUpvoted? boolean

---@class FactListMatch
---@field createdAt? string
---@field deleted? boolean
---@field id? string
---@field text? string
---@field type? string
---@field updatedAt? string
---@field upvotes? number
---@field used? boolean
---@field user? string
---@field userUpvoted? boolean

---@class User
---@field createdAt? string
---@field email? string
---@field id string
---@field name? table
---@field updatedAt? string

---@class UserListMatch
---@field createdAt? string
---@field email? string
---@field id? string
---@field name? table
---@field updatedAt? string

local M = {}

return M
