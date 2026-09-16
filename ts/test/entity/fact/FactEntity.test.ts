

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { CatFactSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('FactEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CAT_FACT_TEST_LIVE=TRUE.
  afterEach(liveDelay('CAT_FACT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CatFactSDK.test()
    const ent = testsdk.Fact()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CAT_FACT_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'fact.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date-time","name":"createdAt","req":false,"short":"Timestamp when the fact was created","type":"`$STRING`","index$":0},{"active":true,"name":"deleted","req":false,"short":"Whether the fact has been deleted","type":"`$BOOLEAN`","index$":1},{"active":true,"name":"id","req":true,"short":"Unique identifier for the fact","type":"`$STRING`","index$":2},{"active":true,"name":"text","req":true,"short":"The fact text content","type":"`$STRING`","index$":3},{"active":true,"name":"type","req":true,"short":"The type of animal the fact is about","type":"`$STRING`","index$":4},{"active":true,"format":"date-time","name":"updatedAt","req":false,"short":"Timestamp when the fact was last updated","type":"`$STRING`","index$":5},{"active":true,"name":"upvotes","req":false,"short":"Number of upvotes the fact has received","type":"`$INTEGER`","index$":6},{"active":true,"name":"used","req":false,"short":"Whether the fact has been used","type":"`$BOOLEAN`","index$":7},{"active":true,"name":"user","req":false,"short":"User ID who submitted the fact","type":"`$STRING`","index$":8},{"active":true,"name":"userUpvoted","req":false,"short":"Whether the current user has upvoted this fact","type":"`$BOOLEAN`","index$":9}],"id":{"field":"id","name":"id"},"name":"fact","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":1,"kind":"query","name":"amount","orig":"amount","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":"cat","kind":"query","name":"animal_type","orig":"animal_type","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /facts","json":"{\"operationId\":\"getFacts\",\"parameters\":[{\"description\":\"Filter facts by animal type\",\"in\":\"query\",\"name\":\"animal_type\",\"required\":false,\"schema\":{\"default\":\"cat\",\"type\":\"string\"}},{\"description\":\"Number of facts to return\",\"in\":\"query\",\"name\":\"amount\",\"required\":false,\"schema\":{\"default\":1,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"description\":\"An animal fact\",\"properties\":{\"_id\":{\"description\":\"Unique identifier for the fact\",\"type\":\"string\"},\"createdAt\":{\"description\":\"Timestamp when the fact was created\",\"format\":\"date-time\",\"type\":\"string\"},\"deleted\":{\"description\":\"Whether the fact has been deleted\",\"type\":\"boolean\"},\"text\":{\"description\":\"The fact text content\",\"type\":\"string\"},\"type\":{\"description\":\"The type of animal the fact is about\",\"example\":\"cat\",\"type\":\"string\"},\"updatedAt\":{\"description\":\"Timestamp when the fact was last updated\",\"format\":\"date-time\",\"type\":\"string\"},\"upvotes\":{\"description\":\"Number of upvotes the fact has received\",\"type\":\"integer\"},\"used\":{\"description\":\"Whether the fact has been used\",\"type\":\"boolean\"},\"user\":{\"description\":\"User ID who submitted the fact\",\"type\":\"string\"},\"userUpvoted\":{\"description\":\"Whether the current user has upvoted this fact\",\"type\":\"boolean\"}},\"required\":[\"_id\",\"text\",\"type\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with cat facts\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"message\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySchemes\":{\"cookieAuth\":{\"description\":\"Session cookie authentication. Requires logging in manually on the website.\",\"in\":\"cookie\",\"name\":\"connect.sid\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/facts","segments":[{"lit":"facts"}],"select":{"exist":["amount","animal_type"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":1,"kind":"query","name":"amount","orig":"amount","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":"cat","kind":"query","name":"animal_type","orig":"animal_type","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /facts/random","json":"{\"operationId\":\"getRandomFact\",\"parameters\":[{\"description\":\"Filter facts by animal type\",\"in\":\"query\",\"name\":\"animal_type\",\"required\":false,\"schema\":{\"default\":\"cat\",\"type\":\"string\"}},{\"description\":\"Number of facts to return\",\"in\":\"query\",\"name\":\"amount\",\"required\":false,\"schema\":{\"default\":1,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An animal fact\",\"properties\":{\"_id\":{\"description\":\"Unique identifier for the fact\",\"type\":\"string\"},\"createdAt\":{\"description\":\"Timestamp when the fact was created\",\"format\":\"date-time\",\"type\":\"string\"},\"deleted\":{\"description\":\"Whether the fact has been deleted\",\"type\":\"boolean\"},\"text\":{\"description\":\"The fact text content\",\"type\":\"string\"},\"type\":{\"description\":\"The type of animal the fact is about\",\"example\":\"cat\",\"type\":\"string\"},\"updatedAt\":{\"description\":\"Timestamp when the fact was last updated\",\"format\":\"date-time\",\"type\":\"string\"},\"upvotes\":{\"description\":\"Number of upvotes the fact has received\",\"type\":\"integer\"},\"used\":{\"description\":\"Whether the fact has been used\",\"type\":\"boolean\"},\"user\":{\"description\":\"User ID who submitted the fact\",\"type\":\"string\"},\"userUpvoted\":{\"description\":\"Whether the current user has upvoted this fact\",\"type\":\"boolean\"}},\"required\":[\"_id\",\"text\",\"type\"],\"type\":\"object\"}}},\"description\":\"Successful response with random cat fact(s)\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"message\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySchemes\":{\"cookieAuth\":{\"description\":\"Session cookie authentication. Requires logging in manually on the website.\",\"in\":\"cookie\",\"name\":\"connect.sid\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/facts/random","segments":[{"lit":"facts"},{"lit":"random"}],"select":{"$action":"random","exist":["amount","animal_type"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"fact","name__orig":"fact","Name":"Fact","name_":"fact","name-":"fact","NAME":"FACT","index$":0}, {"active":true,"entity":"fact","key$":"BasicFactFlow","kind":"basic","name":"BasicFactFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"fact_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"fact_ref01","srcdatavar":"fact_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-fact_ref01"}}],"index$":1}]}, 'Fact')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let fact_ref01_data = Object.values(setup.data.existing.fact)[0] as any

    // LIST
    const fact_ref01_ent = client.Fact()
    const fact_ref01_match: any = {}

    const fact_ref01_list = (await fact_ref01_ent.list(fact_ref01_match)).map((e: any) => e.data())


    // LOAD
    const fact_ref01_match_dt0: any = {}
    fact_ref01_match_dt0.id = fact_ref01_data.id
    const fact_ref01_data_dt0 = (await fact_ref01_ent.load(fact_ref01_match_dt0)).data()
    assert(fact_ref01_data_dt0.id === fact_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/fact/FactTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = CatFactSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['fact01','fact02','fact03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CAT_FACT_TEST_FACT_ENTID': idmap,
    'CAT_FACT_TEST_LIVE': 'FALSE',
    'CAT_FACT_TEST_EXPLAIN': 'FALSE',
    'CAT_FACT_APIKEY': '',
  })

  idmap = env['CAT_FACT_TEST_FACT_ENTID']

  const live = 'TRUE' === env.CAT_FACT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CAT_FACT_TEST_FACT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new CatFactSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.CAT_FACT_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.CAT_FACT_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
