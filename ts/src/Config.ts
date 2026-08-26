
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'CatFact',
        slug: "cat-fact",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://cat-fact.herokuapp.com",

    auth: {
      prefix: '',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      fact: {
      },

      user: {
      },

    }
  }


  entity = {
    "fact": {
      "fields": [
        {
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
              "parts": [
                "facts"
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
              }
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
              "parts": [
                "facts",
                "random"
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
          "short": "Timestamp when the user account was created",
          "type": "`$STRING`"
        },
        {
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
          "name": "updatedAt",
          "short": "Timestamp when the user account was last updated",
          "type": "`$STRING`"
        }
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
                "users"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

