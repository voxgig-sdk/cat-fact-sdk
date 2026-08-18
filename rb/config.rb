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
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
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
              "name" => "createdAt",
              "type" => "`$STRING`",
            },
            {
              "name" => "deleted",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "id",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "text",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "type",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "updatedAt",
              "type" => "`$STRING`",
            },
            {
              "name" => "upvotes",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "used",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "user",
              "type" => "`$STRING`",
            },
            {
              "name" => "userUpvoted",
              "type" => "`$BOOLEAN`",
            },
          ],
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
                  "parts" => [
                    "facts",
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
                  "parts" => [
                    "facts",
                    "random",
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
              "name" => "createdAt",
              "type" => "`$STRING`",
            },
            {
              "name" => "email",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "updatedAt",
              "type" => "`$STRING`",
            },
          ],
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
                  "parts" => [
                    "users",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
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
