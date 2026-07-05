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
# @!attribute [rw] created_at
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
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] upvote
#   @return [Integer, nil]
#
# @!attribute [rw] used
#   @return [Boolean, nil]
#
# @!attribute [rw] user
#   @return [String, nil]
#
# @!attribute [rw] user_upvoted
#   @return [Boolean, nil]
Fact = Struct.new(
  :created_at,
  :deleted,
  :id,
  :text,
  :type,
  :updated_at,
  :upvote,
  :used,
  :user,
  :user_upvoted,
  keyword_init: true
)

# Request payload for Fact#load.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] text
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] upvote
#   @return [Integer, nil]
#
# @!attribute [rw] used
#   @return [Boolean, nil]
#
# @!attribute [rw] user
#   @return [String, nil]
#
# @!attribute [rw] user_upvoted
#   @return [Boolean, nil]
FactLoadMatch = Struct.new(
  :created_at,
  :deleted,
  :id,
  :text,
  :type,
  :updated_at,
  :upvote,
  :used,
  :user,
  :user_upvoted,
  keyword_init: true
)

# Request payload for Fact#list.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] deleted
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] text
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] upvote
#   @return [Integer, nil]
#
# @!attribute [rw] used
#   @return [Boolean, nil]
#
# @!attribute [rw] user
#   @return [String, nil]
#
# @!attribute [rw] user_upvoted
#   @return [Boolean, nil]
FactListMatch = Struct.new(
  :created_at,
  :deleted,
  :id,
  :text,
  :type,
  :updated_at,
  :upvote,
  :used,
  :user,
  :user_upvoted,
  keyword_init: true
)

# User entity data model.
#
# @!attribute [rw] created_at
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
# @!attribute [rw] updated_at
#   @return [String, nil]
User = Struct.new(
  :created_at,
  :email,
  :id,
  :name,
  :updated_at,
  keyword_init: true
)

# Request payload for User#list.
#
# @!attribute [rw] created_at
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
# @!attribute [rw] updated_at
#   @return [String, nil]
UserListMatch = Struct.new(
  :created_at,
  :email,
  :id,
  :name,
  :updated_at,
  keyword_init: true
)

