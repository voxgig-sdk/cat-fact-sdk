"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
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
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://cat-fact.herokuapp.com",
        auth: {
            prefix: '',
            in: 'cookie',
            name: 'connect.sid',
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
                    "name": "createdAt",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "short": "Timestamp when the fact was created",
                    "format": "date-time"
                },
                {
                    "name": "deleted",
                    "title": "Deleted",
                    "type": "`$BOOLEAN`",
                    "short": "Whether the fact has been deleted"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Unique identifier for the fact"
                },
                {
                    "name": "text",
                    "title": "Text",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The fact text content"
                },
                {
                    "name": "type",
                    "title": "Type",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "The type of animal the fact is about"
                },
                {
                    "name": "updatedAt",
                    "title": "Updated At",
                    "type": "`$STRING`",
                    "short": "Timestamp when the fact was last updated",
                    "format": "date-time"
                },
                {
                    "name": "upvotes",
                    "title": "Upvotes",
                    "type": "`$INTEGER`",
                    "short": "Number of upvotes the fact has received"
                },
                {
                    "name": "used",
                    "title": "Used",
                    "type": "`$BOOLEAN`",
                    "short": "Whether the fact has been used"
                },
                {
                    "name": "user",
                    "title": "User",
                    "type": "`$STRING`",
                    "short": "User ID who submitted the fact"
                },
                {
                    "name": "userUpvoted",
                    "title": "User Upvoted",
                    "type": "`$BOOLEAN`",
                    "short": "Whether the current user has upvoted this fact"
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/facts",
                            "segments": [
                                {
                                    "lit": "facts"
                                }
                            ],
                            "parts": [
                                "facts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "amount",
                                        "orig": "amount",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "animal_type",
                                        "orig": "animal_type",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "cat"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "amount",
                                    "animal_type"
                                ]
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
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
                            "parts": [
                                "facts",
                                "random"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "amount",
                                        "orig": "amount",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "animal_type",
                                        "orig": "animal_type",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "cat"
                                    }
                                ]
                            },
                            "select": {
                                "$action": "random",
                                "exist": [
                                    "amount",
                                    "animal_type"
                                ]
                            }
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
                    "name": "createdAt",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "short": "Timestamp when the user account was created",
                    "format": "date-time"
                },
                {
                    "name": "email",
                    "title": "Email",
                    "type": "`$STRING`",
                    "short": "User's email address",
                    "format": "email"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Unique identifier for the user"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "updatedAt",
                    "title": "Updated At",
                    "type": "`$STRING`",
                    "short": "Timestamp when the user account was last updated",
                    "format": "date-time"
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/users",
                            "segments": [
                                {
                                    "lit": "users"
                                }
                            ],
                            "parts": [
                                "users"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
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