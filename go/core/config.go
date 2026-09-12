package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "CatFact",
			"slug": "cat-fact",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://cat-fact.herokuapp.com",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"fact": map[string]any{},
				"user": map[string]any{},
			},
		},
		"entity": map[string]any{
			"fact": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "date-time",
						"name": "createdAt",
						"short": "Timestamp when the fact was created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "deleted",
						"short": "Whether the fact has been deleted",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"short": "Unique identifier for the fact",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "text",
						"req": true,
						"short": "The fact text content",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"req": true,
						"short": "The type of animal the fact is about",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "updatedAt",
						"short": "Timestamp when the fact was last updated",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "upvotes",
						"short": "Number of upvotes the fact has received",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "used",
						"short": "Whether the fact has been used",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "user",
						"short": "User ID who submitted the fact",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "userUpvoted",
						"short": "Whether the current user has upvoted this fact",
						"type": "`$BOOLEAN`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "fact",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "amount",
											"orig": "amount",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "cat",
											"kind": "query",
											"name": "animal_type",
											"orig": "animal_type",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/facts",
								"segments": []any{
									map[string]any{
										"lit": "facts",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"amount",
										"animal_type",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"facts",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "amount",
											"orig": "amount",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "cat",
											"kind": "query",
											"name": "animal_type",
											"orig": "animal_type",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/facts/random",
								"segments": []any{
									map[string]any{
										"lit": "facts",
									},
									map[string]any{
										"lit": "random",
									},
								},
								"select": map[string]any{
									"$action": "random",
									"exist": []any{
										"amount",
										"animal_type",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"facts",
									"random",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"user": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "date-time",
						"name": "createdAt",
						"short": "Timestamp when the user account was created",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "email",
						"name": "email",
						"short": "User's email address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"short": "Unique identifier for the user",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"format": "date-time",
						"name": "updatedAt",
						"short": "Timestamp when the user account was last updated",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "user",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/users",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"users",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
