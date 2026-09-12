"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'CatFact',
        slug: "cat-fact",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://cat-fact.herokuapp.com",
        auth: {
            prefix: '',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            fact: {},
            user: {},
        }
    };
    entity = {
        "fact": {
            "fields": [
                {
                    "format": "date-time",
                    "name": "createdAt",
                    "short": "Timestamp when the fact was created",
                    "type": "`$STRING`"
                },
                {
                    "name": "deleted",
                    "short": "Whether the fact has been deleted",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "id",
                    "req": true,
                    "short": "Unique identifier for the fact",
                    "type": "`$STRING`"
                },
                {
                    "name": "text",
                    "req": true,
                    "short": "The fact text content",
                    "type": "`$STRING`"
                },
                {
                    "name": "type",
                    "req": true,
                    "short": "The type of animal the fact is about",
                    "type": "`$STRING`"
                },
                {
                    "format": "date-time",
                    "name": "updatedAt",
                    "short": "Timestamp when the fact was last updated",
                    "type": "`$STRING`"
                },
                {
                    "name": "upvotes",
                    "short": "Number of upvotes the fact has received",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "used",
                    "short": "Whether the fact has been used",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "user",
                    "short": "User ID who submitted the fact",
                    "type": "`$STRING`"
                },
                {
                    "name": "userUpvoted",
                    "short": "Whether the current user has upvoted this fact",
                    "type": "`$BOOLEAN`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "fact",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "amount",
                                        "orig": "amount",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": "cat",
                                        "kind": "query",
                                        "name": "animal_type",
                                        "orig": "animal_type",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/facts",
                            "segments": [
                                {
                                    "lit": "facts"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "amount",
                                    "animal_type"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "facts"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "amount",
                                        "orig": "amount",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": "cat",
                                        "kind": "query",
                                        "name": "animal_type",
                                        "orig": "animal_type",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/facts/random",
                            "segments": [
                                {
                                    "lit": "facts"
                                },
                                {
                                    "lit": "random"
                                }
                            ],
                            "select": {
                                "$action": "random",
                                "exist": [
                                    "amount",
                                    "animal_type"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "facts",
                                "random"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "user": {
            "fields": [
                {
                    "format": "date-time",
                    "name": "createdAt",
                    "short": "Timestamp when the user account was created",
                    "type": "`$STRING`"
                },
                {
                    "format": "email",
                    "name": "email",
                    "short": "User's email address",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "req": true,
                    "short": "Unique identifier for the user",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "type": "`$OBJECT`"
                },
                {
                    "format": "date-time",
                    "name": "updatedAt",
                    "short": "Timestamp when the user account was last updated",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "user",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/users",
                            "segments": [
                                {
                                    "lit": "users"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "users"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map