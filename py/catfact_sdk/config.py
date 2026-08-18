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
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
            "type": "`$STRING`",
          },
          {
            "name": "deleted",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "text",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "updatedAt",
            "type": "`$STRING`",
          },
          {
            "name": "upvotes",
            "type": "`$INTEGER`",
          },
          {
            "name": "used",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "user",
            "type": "`$STRING`",
          },
          {
            "name": "userUpvoted",
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
            "type": "`$STRING`",
          },
          {
            "name": "email",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$OBJECT`",
          },
          {
            "name": "updatedAt",
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
