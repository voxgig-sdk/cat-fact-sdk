# CatFact SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "CatFact",
            "slug": "cat-fact",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://cat-fact.herokuapp.com",
            "auth": {
                "prefix": "",
                "in": "cookie",
                "name": "connect.sid",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "fact": {},
                "user": {},
            },
        },
        "entity": {
      "fact": {
        "fields": [
          {
            "name": "createdAt",
            "title": "Created At",
            "type": "`$STRING`",
            "short": "Timestamp when the fact was created",
            "format": "date-time",
          },
          {
            "name": "deleted",
            "title": "Deleted",
            "type": "`$BOOLEAN`",
            "short": "Whether the fact has been deleted",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Unique identifier for the fact",
          },
          {
            "name": "text",
            "title": "Text",
            "type": "`$STRING`",
            "req": True,
            "short": "The fact text content",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "req": True,
            "short": "The type of animal the fact is about",
          },
          {
            "name": "updatedAt",
            "title": "Updated At",
            "type": "`$STRING`",
            "short": "Timestamp when the fact was last updated",
            "format": "date-time",
          },
          {
            "name": "upvotes",
            "title": "Upvotes",
            "type": "`$INTEGER`",
            "short": "Number of upvotes the fact has received",
          },
          {
            "name": "used",
            "title": "Used",
            "type": "`$BOOLEAN`",
            "short": "Whether the fact has been used",
          },
          {
            "name": "user",
            "title": "User",
            "type": "`$STRING`",
            "short": "User ID who submitted the fact",
          },
          {
            "name": "userUpvoted",
            "title": "User Upvoted",
            "type": "`$BOOLEAN`",
            "short": "Whether the current user has upvoted this fact",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "facts",
                  },
                ],
                "parts": [
                  "facts",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "amount",
                      "orig": "amount",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "animal_type",
                      "orig": "animal_type",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "cat",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "amount",
                    "animal_type",
                  ],
                },
              },
            ],
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
                    "lit": "facts",
                  },
                  {
                    "lit": "random",
                  },
                ],
                "parts": [
                  "facts",
                  "random",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "amount",
                      "orig": "amount",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "animal_type",
                      "orig": "animal_type",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "cat",
                    },
                  ],
                },
                "select": {
                  "$action": "random",
                  "exist": [
                    "amount",
                    "animal_type",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "user": {
        "fields": [
          {
            "name": "createdAt",
            "title": "Created At",
            "type": "`$STRING`",
            "short": "Timestamp when the user account was created",
            "format": "date-time",
          },
          {
            "name": "email",
            "title": "Email",
            "type": "`$STRING`",
            "short": "User's email address",
            "format": "email",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
            "short": "Unique identifier for the user",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$OBJECT`",
          },
          {
            "name": "updatedAt",
            "title": "Updated At",
            "type": "`$STRING`",
            "short": "Timestamp when the user account was last updated",
            "format": "date-time",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "users",
                  },
                ],
                "parts": [
                  "users",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
