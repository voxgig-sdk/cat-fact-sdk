-- Typed models for the CatFact SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Fact
---@field created_at? string
---@field deleted? boolean
---@field id string
---@field text string
---@field type string
---@field updated_at? string
---@field upvote? number
---@field used? boolean
---@field user? string
---@field user_upvoted? boolean

---@class FactLoadMatch

---@class FactListMatch

---@class User
---@field created_at? string
---@field email? string
---@field id string
---@field name? table
---@field updated_at? string

---@class UserListMatch

local M = {}

return M
