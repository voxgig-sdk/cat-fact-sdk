// Typed models for the CatFact SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Fact is the typed data model for the fact entity.
type Fact struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Deleted *bool `json:"deleted,omitempty"`
	Id string `json:"id"`
	Text string `json:"text"`
	Type string `json:"type"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Upvote *int `json:"upvote,omitempty"`
	Used *bool `json:"used,omitempty"`
	User *string `json:"user,omitempty"`
	UserUpvoted *bool `json:"user_upvoted,omitempty"`
}

// FactLoadMatch is the typed request payload for Fact.LoadTyped.
type FactLoadMatch struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Deleted *bool `json:"deleted,omitempty"`
	Id string `json:"id"`
	Text *string `json:"text,omitempty"`
	Type *string `json:"type,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Upvote *int `json:"upvote,omitempty"`
	Used *bool `json:"used,omitempty"`
	User *string `json:"user,omitempty"`
	UserUpvoted *bool `json:"user_upvoted,omitempty"`
}

// FactListMatch is the typed request payload for Fact.ListTyped.
type FactListMatch struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Deleted *bool `json:"deleted,omitempty"`
	Id *string `json:"id,omitempty"`
	Text *string `json:"text,omitempty"`
	Type *string `json:"type,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
	Upvote *int `json:"upvote,omitempty"`
	Used *bool `json:"used,omitempty"`
	User *string `json:"user,omitempty"`
	UserUpvoted *bool `json:"user_upvoted,omitempty"`
}

// User is the typed data model for the user entity.
type User struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Email *string `json:"email,omitempty"`
	Id string `json:"id"`
	Name *map[string]any `json:"name,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

// UserListMatch is the typed request payload for User.ListTyped.
type UserListMatch struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Email *string `json:"email,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *map[string]any `json:"name,omitempty"`
	UpdatedAt *string `json:"updated_at,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
