# CatFact SDK

Fetch random cat facts and user-submitted trivia from a free, no-auth public API

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Cat Fact API

Cat Fact is a small public API that returns short feline trivia entries. It is the data side of the open-source [Cat Facts project by Alex Wohlbruck](https://github.com/alexwohlbruck/cat-facts), which also powers an SMS bot and a community submission flow.

What you can pull from the API:

- Random or listed cat facts, each with a text body and metadata.
- User records associated with submitted facts.

The service is hosted on Heroku at `https://cat-fact.herokuapp.com` and requires no authentication or API key. As a free hobby deployment it may sleep between requests or return transient errors, so clients should be resilient to retries.

## Try it

**TypeScript**
```bash
npm install cat-fact
```

**Python**
```bash
pip install cat-fact-sdk
```

**PHP**
```bash
composer require voxgig/cat-fact-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/cat-fact-sdk/go
```

**Ruby**
```bash
gem install cat-fact-sdk
```

**Lua**
```bash
luarocks install cat-fact-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { CatFactSDK } from 'cat-fact'

const client = new CatFactSDK({})

// List all facts
const facts = await client.Fact().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o cat-fact-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "cat-fact": {
      "command": "/abs/path/to/cat-fact-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Fact** | A single cat trivia entry — the primary resource served by the API, exposing the fact text along with submission metadata. | `/facts` |
| **User** | A contributor account associated with submitted facts in the upstream Cat Facts project. | `/users` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from catfact_sdk import CatFactSDK

client = CatFactSDK({})

# List all facts
facts, err = client.Fact(None).list(None, None)

# Load a specific fact
fact, err = client.Fact(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'catfact_sdk.php';

$client = new CatFactSDK([]);

// List all facts
[$facts, $err] = $client->Fact(null)->list(null, null);

// Load a specific fact
[$fact, $err] = $client->Fact(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/cat-fact-sdk/go"

client := sdk.NewCatFactSDK(map[string]any{})

// List all facts
facts, err := client.Fact(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "CatFact_sdk"

client = CatFactSDK.new({})

# List all facts
facts, err = client.Fact(nil).list(nil, nil)

# Load a specific fact
fact, err = client.Fact(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("cat-fact_sdk")

local client = sdk.new({})

-- List all facts
local facts, err = client:Fact(nil):list(nil, nil)

-- Load a specific fact
local fact, err = client:Fact(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = CatFactSDK.test()
const result = await client.Fact().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = CatFactSDK.test(None, None)
result, err = client.Fact(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = CatFactSDK::test(null, null);
[$result, $err] = $client->Fact(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Fact(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = CatFactSDK.test(nil, nil)
result, err = client.Fact(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Fact(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Cat Fact API

- Upstream: [https://cat-fact.herokuapp.com](https://cat-fact.herokuapp.com)
- API docs: [https://alexwohlbruck.github.io/cat-facts/](https://alexwohlbruck.github.io/cat-facts/)

- The upstream Cat Facts project by Alex Wohlbruck is published under the Apache-2.0 licence.
- No licence is asserted on the API response data itself; treat facts as community-contributed content.
- Attribution to the upstream project is appreciated when redistributing facts.
- The public endpoint is best-effort and offered without warranty.

---

Generated from the Cat Fact API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
