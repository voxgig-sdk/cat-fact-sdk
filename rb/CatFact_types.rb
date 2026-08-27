# frozen_string_literal: true

# Typed models for the CatFact SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Fact entity data model.
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] text
#   @return [String]
#
# @!attribute [rw] type
#   @return [String]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
#
# @!attribute [rw] upvotes
#   @return [Integer, nil]
#
# @!attribute [rw] used
#   @return [Boolean, nil]
#
# @!attribute [rw] user
#   @return [String, nil]
#
# @!attribute [rw] userUpvoted
#   @return [Boolean, nil]
Fact = Struct.new(
  :createdAt,
  :deleted,
  :id,
  :text,
  :type,
  :updatedAt,
  :upvotes,
  :used,
  :user,
  :userUpvoted,
  keyword_init: true
)

# Request payload for Fact#load.
#
# @!attribute [rw] amount
#   @return [Integer, nil]
#
# @!attribute [rw] animal_type
#   @return [String, nil]
FactLoadMatch = Struct.new(
  :amount,
  :animal_type,
  keyword_init: true
)

# Request payload for Fact#list.
#
# @!attribute [rw] amount
#   @return [Integer, nil]
#
# @!attribute [rw] animal_type
#   @return [String, nil]
FactListMatch = Struct.new(
  :amount,
  :animal_type,
  keyword_init: true
)

# User entity data model.
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [Hash, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
User = Struct.new(
  :createdAt,
  :email,
  :id,
  :name,
  :updatedAt,
  keyword_init: true
)

# Request payload for User#list.
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [Hash, nil]
#
# @!attribute [rw] updatedAt
#   @return [String, nil]
UserListMatch = Struct.new(
  :createdAt,
  :email,
  :id,
  :name,
  :updatedAt,
  keyword_init: true
)

