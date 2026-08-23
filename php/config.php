<?php
declare(strict_types=1);

// CatFact SDK configuration

class CatFactConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "CatFact",
                "slug" => "cat-fact",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://cat-fact.herokuapp.com",
                "auth" => [
                    "prefix" => "",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "fact" => [],
                    "user" => [],
                ],
            ],
            "entity" => [
        'fact' => [
          'fields' => [
            [
              'name' => 'createdAt',
              'short' => 'Timestamp when the fact was created',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'deleted',
              'short' => 'Whether the fact has been deleted',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'id',
              'req' => true,
              'short' => 'Unique identifier for the fact',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'text',
              'req' => true,
              'short' => 'The fact text content',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'type',
              'req' => true,
              'short' => 'The type of animal the fact is about',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'updatedAt',
              'short' => 'Timestamp when the fact was last updated',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'upvotes',
              'short' => 'Number of upvotes the fact has received',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'used',
              'short' => 'Whether the fact has been used',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'user',
              'short' => 'User ID who submitted the fact',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'userUpvoted',
              'short' => 'Whether the current user has upvoted this fact',
              'type' => '`$BOOLEAN`',
            ],
          ],
          'name' => 'fact',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'amount',
                        'orig' => 'amount',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 'cat',
                        'kind' => 'query',
                        'name' => 'animal_type',
                        'orig' => 'animal_type',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/facts',
                  'parts' => [
                    'facts',
                  ],
                  'select' => [
                    'exist' => [
                      'amount',
                      'animal_type',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'amount',
                        'orig' => 'amount',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 'cat',
                        'kind' => 'query',
                        'name' => 'animal_type',
                        'orig' => 'animal_type',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/facts/random',
                  'parts' => [
                    'facts',
                    'random',
                  ],
                  'select' => [
                    '$action' => 'random',
                    'exist' => [
                      'amount',
                      'animal_type',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'user' => [
          'fields' => [
            [
              'name' => 'createdAt',
              'short' => 'Timestamp when the user account was created',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'email',
              'short' => 'User\'s email address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'req' => true,
              'short' => 'Unique identifier for the user',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'updatedAt',
              'short' => 'Timestamp when the user account was last updated',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'user',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/users',
                  'parts' => [
                    'users',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return CatFactFeatures::make_feature($name);
    }
}
