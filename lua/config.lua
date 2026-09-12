-- CatFact SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "CatFact",
      slug = "cat-fact",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://cat-fact.herokuapp.com",
      auth = {
        prefix = "",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["fact"] = {},
        ["user"] = {},
      },
    },
    entity = {
      ["fact"] = {
        ["fields"] = {
          {
            ["format"] = "date-time",
            ["name"] = "createdAt",
            ["short"] = "Timestamp when the fact was created",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "deleted",
            ["short"] = "Whether the fact has been deleted",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "id",
            ["req"] = true,
            ["short"] = "Unique identifier for the fact",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "text",
            ["req"] = true,
            ["short"] = "The fact text content",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["req"] = true,
            ["short"] = "The type of animal the fact is about",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "date-time",
            ["name"] = "updatedAt",
            ["short"] = "Timestamp when the fact was last updated",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "upvotes",
            ["short"] = "Number of upvotes the fact has received",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "used",
            ["short"] = "Whether the fact has been used",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "user",
            ["short"] = "User ID who submitted the fact",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "userUpvoted",
            ["short"] = "Whether the current user has upvoted this fact",
            ["type"] = "`$BOOLEAN`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "fact",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "amount",
                      ["orig"] = "amount",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = "cat",
                      ["kind"] = "query",
                      ["name"] = "animal_type",
                      ["orig"] = "animal_type",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/facts",
                ["segments"] = {
                  {
                    ["lit"] = "facts",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "amount",
                    "animal_type",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "facts",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 1,
                      ["kind"] = "query",
                      ["name"] = "amount",
                      ["orig"] = "amount",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = "cat",
                      ["kind"] = "query",
                      ["name"] = "animal_type",
                      ["orig"] = "animal_type",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/facts/random",
                ["segments"] = {
                  {
                    ["lit"] = "facts",
                  },
                  {
                    ["lit"] = "random",
                  },
                },
                ["select"] = {
                  ["$action"] = "random",
                  ["exist"] = {
                    "amount",
                    "animal_type",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "facts",
                  "random",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["user"] = {
        ["fields"] = {
          {
            ["format"] = "date-time",
            ["name"] = "createdAt",
            ["short"] = "Timestamp when the user account was created",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "email",
            ["name"] = "email",
            ["short"] = "User's email address",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["req"] = true,
            ["short"] = "Unique identifier for the user",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["type"] = "`$OBJECT`",
          },
          {
            ["format"] = "date-time",
            ["name"] = "updatedAt",
            ["short"] = "Timestamp when the user account was last updated",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "user",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/users",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "users",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
