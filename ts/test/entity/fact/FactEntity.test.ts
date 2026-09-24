

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":false,"sh":"Timestamp when the fact was created","t":"`$STRING`","key$":"createdAt","index$":0},"deleted":{"a":true,"h":"Deleted","n":"deleted","r":false,"sh":"Whether the fact has been deleted","t":"`$BOOLEAN`","key$":"deleted","index$":1},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Unique identifier for the fact","t":"`$STRING`","key$":"id","index$":2},"text":{"a":true,"h":"Text","n":"text","r":true,"sh":"The fact text content","t":"`$STRING`","key$":"text","index$":3},"type":{"a":true,"h":"Type","n":"type","r":true,"sh":"The type of animal the fact is about","t":"`$STRING`","key$":"type","index$":4},"updatedAt":{"a":true,"fo":"date-time","h":"Updated At","n":"updatedAt","r":false,"sh":"Timestamp when the fact was last updated","t":"`$STRING`","key$":"updatedAt","index$":5},"upvotes":{"a":true,"h":"Upvotes","n":"upvotes","r":false,"sh":"Number of upvotes the fact has received","t":"`$INTEGER`","key$":"upvotes","index$":6},"used":{"a":true,"h":"Used","n":"used","r":false,"sh":"Whether the fact has been used","t":"`$BOOLEAN`","key$":"used","index$":7},"user":{"a":true,"h":"User","n":"user","r":false,"sh":"User ID who submitted the fact","t":"`$STRING`","key$":"user","index$":8},"userUpvoted":{"a":true,"h":"User Upvoted","n":"userUpvoted","r":false,"sh":"Whether the current user has upvoted this fact","t":"`$BOOLEAN`","key$":"userUpvoted","index$":9}},"id":{"field":"id","name":"id"},"name":"fact","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /facts","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"amount","or":"amount","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":"cat","k":"query","n":"animal_type","or":"animal_type","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/facts","q":{"exist":["amount","animal_type"]},"r":{},"s":[{"lit":"facts"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /facts/random","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"amount","or":"amount","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":"cat","k":"query","n":"animal_type","or":"animal_type","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/facts/random","q":{"$action":"random","exist":["amount","animal_type"]},"r":{},"s":[{"lit":"facts"},{"lit":"random"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"fact","name__orig":"fact","Name":"Fact","name_":"fact","name-":"fact","NAME":"FACT","index$":0}, {"active":true,"entity":"fact","key$":"BasicFactFlow","kind":"basic","name":"BasicFactFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"fact_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"fact_ref01","srcdatavar":"fact_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-fact_ref01"}}],"index$":1}]}, 'Fact', {"GET /facts":{"protocol":"http","operationId":"getFacts","responses":{"200":{"description":"Successful response with cat facts","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","description":"An animal fact","properties":{"_id":{"description":"Unique identifier for the fact","key$":"_id","type":"string"},"text":{"description":"The fact text content","key$":"text","type":"string"},"type":{"description":"The type of animal the fact is about","example":"cat","key$":"type","type":"string"},"user":{"description":"User ID who submitted the fact","key$":"user","type":"string"},"upvotes":{"description":"Number of upvotes the fact has received","key$":"upvotes","type":"integer"},"userUpvoted":{"description":"Whether the current user has upvoted this fact","key$":"userUpvoted","type":"boolean"},"createdAt":{"description":"Timestamp when the fact was created","format":"date-time","key$":"createdAt","type":"string"},"updatedAt":{"description":"Timestamp when the fact was last updated","format":"date-time","key$":"updatedAt","type":"string"},"deleted":{"description":"Whether the fact has been deleted","key$":"deleted","type":"boolean"},"used":{"description":"Whether the fact has been used","key$":"used","type":"boolean"}},"required":["_id","text","type"],"x-ref":"#/components/schemas/Fact","index$":0}}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","description":"Error response","properties":{"message":{"type":"string","description":"Error message"},"status":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"animal_type","in":"query","description":"Filter facts by animal type","required":false,"schema":{"type":"string","default":"cat"},"index$":0},{"name":"amount","in":"query","description":"Number of facts to return","required":false,"schema":{"type":"integer","default":1,"minimum":1},"index$":1}],"securitySource":"unspecified","securitySchemes":{"cookieAuth":{"type":"apiKey","in":"cookie","name":"connect.sid","description":"Session cookie authentication. Requires logging in manually on the website."}}},"GET /facts/random":{"protocol":"http","operationId":"getRandomFact","responses":{"200":{"description":"Successful response with random cat fact(s)","content":{"application/json":{"schema":{"type":"object","description":"An animal fact","properties":{"_id":{"description":"Unique identifier for the fact","key$":"_id","type":"string"},"text":{"description":"The fact text content","key$":"text","type":"string"},"type":{"description":"The type of animal the fact is about","example":"cat","key$":"type","type":"string"},"user":{"description":"User ID who submitted the fact","key$":"user","type":"string"},"upvotes":{"description":"Number of upvotes the fact has received","key$":"upvotes","type":"integer"},"userUpvoted":{"description":"Whether the current user has upvoted this fact","key$":"userUpvoted","type":"boolean"},"createdAt":{"description":"Timestamp when the fact was created","format":"date-time","key$":"createdAt","type":"string"},"updatedAt":{"description":"Timestamp when the fact was last updated","format":"date-time","key$":"updatedAt","type":"string"},"deleted":{"description":"Whether the fact has been deleted","key$":"deleted","type":"boolean"},"used":{"description":"Whether the fact has been used","key$":"used","type":"boolean"}},"required":["_id","text","type"],"x-ref":"#/components/schemas/Fact","index$":0}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","description":"Error response","properties":{"message":{"type":"string","description":"Error message"},"status":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"animal_type","in":"query","description":"Filter facts by animal type","required":false,"schema":{"type":"string","default":"cat"},"index$":0},{"name":"amount","in":"query","description":"Number of facts to return","required":false,"schema":{"type":"integer","default":1,"minimum":1},"index$":1}],"securitySource":"unspecified","securitySchemes":{"cookieAuth":{"type":"apiKey","in":"cookie","name":"connect.sid","description":"Session cookie authentication. Requires logging in manually on the website."}}}})
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
  
