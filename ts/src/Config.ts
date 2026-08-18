
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


  main = {
    name: 'CatFact',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "type": "`$STRING`"
        },
        {
          "name": "deleted",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "id",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "text",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "type",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "updatedAt",
          "type": "`$STRING`"
        },
        {
          "name": "upvotes",
          "type": "`$INTEGER`"
        },
        {
          "name": "used",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "user",
          "type": "`$STRING`"
        },
        {
          "name": "userUpvoted",
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
          "type": "`$STRING`"
        },
        {
          "name": "email",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "type": "`$OBJECT`"
        },
        {
          "name": "updatedAt",
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

