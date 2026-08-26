# CatFact SDK configuration


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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://cat-fact.herokuapp.com",
            "auth": {
                "prefix": "",
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
            "short": "Timestamp when the fact was created",
            "type": "`$STRING`",
          },
          {
            "name": "deleted",
            "short": "Whether the fact has been deleted",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "id",
            "req": True,
            "short": "Unique identifier for the fact",
            "type": "`$STRING`",
          },
          {
            "name": "text",
            "req": True,
            "short": "The fact text content",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "req": True,
            "short": "The type of animal the fact is about",
            "type": "`$STRING`",
          },
          {
            "name": "updatedAt",
            "short": "Timestamp when the fact was last updated",
            "type": "`$STRING`",
          },
          {
            "name": "upvotes",
            "short": "Number of upvotes the fact has received",
            "type": "`$INTEGER`",
          },
          {
            "name": "used",
            "short": "Whether the fact has been used",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "user",
            "short": "User ID who submitted the fact",
            "type": "`$STRING`",
          },
          {
            "name": "userUpvoted",
            "short": "Whether the current user has upvoted this fact",
            "type": "`$BOOLEAN`",
          },
        ],
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
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "cat",
                      "kind": "query",
                      "name": "animal_type",
                      "orig": "animal_type",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/facts",
                "parts": [
                  "facts",
                ],
                "select": {
                  "exist": [
                    "amount",
                    "animal_type",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "cat",
                      "kind": "query",
                      "name": "animal_type",
                      "orig": "animal_type",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/facts/random",
                "parts": [
                  "facts",
                  "random",
                ],
                "select": {
                  "$action": "random",
                  "exist": [
                    "amount",
                    "animal_type",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
            "short": "Timestamp when the user account was created",
            "type": "`$STRING`",
          },
          {
            "name": "email",
            "short": "User's email address",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "req": True,
            "short": "Unique identifier for the user",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$OBJECT`",
          },
          {
            "name": "updatedAt",
            "short": "Timestamp when the user account was last updated",
            "type": "`$STRING`",
          },
        ],
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
                "parts": [
                  "users",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
