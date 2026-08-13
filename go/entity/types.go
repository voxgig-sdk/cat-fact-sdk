// Typed models for the CatFact SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/cat-fact-sdk/go/core"
)

// Fact is the typed data model for the fact entity.
type Fact struct {
	CreatedAt *string `json:"createdAt,omitempty"`
	Deleted *bool `json:"deleted,omitempty"`
	Id string `json:"id"`
	Text string `json:"text"`
	Type string `json:"type"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
	Upvotes *int `json:"upvotes,omitempty"`
	Used *bool `json:"used,omitempty"`
	User *string `json:"user,omitempty"`
	UserUpvoted *bool `json:"userUpvoted,omitempty"`
}

// FactLoadMatch is the typed request payload for Fact.LoadTyped.
type FactLoadMatch struct {
	CreatedAt *string `json:"createdAt,omitempty"`
	Deleted *bool `json:"deleted,omitempty"`
	Id string `json:"id"`
	Text *string `json:"text,omitempty"`
	Type *string `json:"type,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
	Upvotes *int `json:"upvotes,omitempty"`
	Used *bool `json:"used,omitempty"`
	User *string `json:"user,omitempty"`
	UserUpvoted *bool `json:"userUpvoted,omitempty"`
}

// FactListMatch is the typed request payload for Fact.ListTyped.
type FactListMatch struct {
	CreatedAt *string `json:"createdAt,omitempty"`
	Deleted *bool `json:"deleted,omitempty"`
	Id *string `json:"id,omitempty"`
	Text *string `json:"text,omitempty"`
	Type *string `json:"type,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
	Upvotes *int `json:"upvotes,omitempty"`
	Used *bool `json:"used,omitempty"`
	User *string `json:"user,omitempty"`
	UserUpvoted *bool `json:"userUpvoted,omitempty"`
}

// User is the typed data model for the user entity.
type User struct {
	CreatedAt *string `json:"createdAt,omitempty"`
	Email *string `json:"email,omitempty"`
	Id string `json:"id"`
	Name *map[string]any `json:"name,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
}

// UserListMatch is the typed request payload for User.ListTyped.
type UserListMatch struct {
	CreatedAt *string `json:"createdAt,omitempty"`
	Email *string `json:"email,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *map[string]any `json:"name,omitempty"`
	UpdatedAt *string `json:"updatedAt,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
