# CatFact SDK configuration

module CatFactConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "CatFact",
        "slug" => "cat-fact",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://cat-fact.herokuapp.com",
        "auth" => {
          "prefix" => "",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "fact" => {},
          "user" => {},
        },
      },
      "entity" => {
        "fact" => {
          "fields" => [
            {
              "format" => "date-time",
              "name" => "createdAt",
              "short" => "Timestamp when the fact was created",
              "type" => "`$STRING`",
            },
            {
              "name" => "deleted",
              "short" => "Whether the fact has been deleted",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "id",
              "req" => true,
              "short" => "Unique identifier for the fact",
              "type" => "`$STRING`",
            },
            {
              "name" => "text",
              "req" => true,
              "short" => "The fact text content",
              "type" => "`$STRING`",
            },
            {
              "name" => "type",
              "req" => true,
              "short" => "The type of animal the fact is about",
              "type" => "`$STRING`",
            },
            {
              "format" => "date-time",
              "name" => "updatedAt",
              "short" => "Timestamp when the fact was last updated",
              "type" => "`$STRING`",
            },
            {
              "name" => "upvotes",
              "short" => "Number of upvotes the fact has received",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "used",
              "short" => "Whether the fact has been used",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "user",
              "short" => "User ID who submitted the fact",
              "type" => "`$STRING`",
            },
            {
              "name" => "userUpvoted",
              "short" => "Whether the current user has upvoted this fact",
              "type" => "`$BOOLEAN`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "fact",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "amount",
                        "orig" => "amount",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => "cat",
                        "kind" => "query",
                        "name" => "animal_type",
                        "orig" => "animal_type",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/facts",
                  "segments" => [
                    {
                      "lit" => "facts",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "amount",
                      "animal_type",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "facts",
                  ],
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "amount",
                        "orig" => "amount",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => "cat",
                        "kind" => "query",
                        "name" => "animal_type",
                        "orig" => "animal_type",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/facts/random",
                  "segments" => [
                    {
                      "lit" => "facts",
                    },
                    {
                      "lit" => "random",
                    },
                  ],
                  "select" => {
                    "$action" => "random",
                    "exist" => [
                      "amount",
                      "animal_type",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "facts",
                    "random",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "user" => {
          "fields" => [
            {
              "format" => "date-time",
              "name" => "createdAt",
              "short" => "Timestamp when the user account was created",
              "type" => "`$STRING`",
            },
            {
              "format" => "email",
              "name" => "email",
              "short" => "User's email address",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "req" => true,
              "short" => "Unique identifier for the user",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "type" => "`$OBJECT`",
            },
            {
              "format" => "date-time",
              "name" => "updatedAt",
              "short" => "Timestamp when the user account was last updated",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "user",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/users",
                  "segments" => [
                    {
                      "lit" => "users",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "users",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    CatFactFeatures.make_feature(name)
  end
end
