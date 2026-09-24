

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


describe('UserEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CAT_FACT_TEST_LIVE=TRUE.
  afterEach(liveDelay('CAT_FACT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CatFactSDK.test()
    const ent = testsdk.User()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CAT_FACT_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'user.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":false,"sh":"Timestamp when the user account was created","t":"`$STRING`","key$":"createdAt","index$":0},"email":{"a":true,"fo":"email","h":"Email","n":"email","r":false,"sh":"User's email address","t":"`$STRING`","key$":"email","index$":1},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Unique identifier for the user","t":"`$STRING`","key$":"id","index$":2},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$OBJECT`","key$":"name","index$":3},"updatedAt":{"a":true,"fo":"date-time","h":"Updated At","n":"updatedAt","r":false,"sh":"Timestamp when the user account was last updated","t":"`$STRING`","key$":"updatedAt","index$":4}},"id":{"field":"id","name":"id"},"name":"user","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /users","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/users","q":{},"r":{},"s":[{"lit":"users"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"user","name__orig":"user","Name":"User","name_":"user","name-":"user","NAME":"USER","index$":1}, {"active":true,"entity":"user","key$":"BasicUserFlow","kind":"basic","name":"BasicUserFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"user_ref01"}}],"index$":0}]}, 'User', {"GET /users":{"protocol":"http","operationId":"getUsers","responses":{"200":{"description":"Successful response with user data","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","description":"A user of the Cat Facts site","properties":{"_id":{"type":"string","description":"Unique identifier for the user","key$":"_id"},"name":{"type":"object","properties":{"first":{"type":"string","description":"User's first name"},"last":{"type":"string","description":"User's last name"}},"key$":"name"},"email":{"type":"string","format":"email","description":"User's email address","key$":"email"},"createdAt":{"type":"string","format":"date-time","description":"Timestamp when the user account was created","key$":"createdAt"},"updatedAt":{"type":"string","format":"date-time","description":"Timestamp when the user account was last updated","key$":"updatedAt"}},"required":["_id"],"x-ref":"#/components/schemas/User","index$":0}}}}},"401":{"description":"Unauthorized - Authentication required","content":{"application/json":{"schema":{"type":"object","description":"Error response","properties":{"message":{"type":"string","description":"Error message"},"status":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","description":"Error response","properties":{"message":{"type":"string","description":"Error message"},"status":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"security":[{"cookieAuth":[]}],"securitySource":"operation","securitySchemes":{"cookieAuth":{"type":"apiKey","in":"cookie","name":"connect.sid","description":"Session cookie authentication. Requires logging in manually on the website."}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let user_ref01_data = Object.values(setup.data.existing.user)[0] as any

    // LIST
    const user_ref01_ent = client.User()
    const user_ref01_match: any = {}

    const user_ref01_list = (await user_ref01_ent.list(user_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/user/UserTestData.json')

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
    ['user01','user02','user03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CAT_FACT_TEST_USER_ENTID': idmap,
    'CAT_FACT_TEST_LIVE': 'FALSE',
    'CAT_FACT_TEST_EXPLAIN': 'FALSE',
    'CAT_FACT_APIKEY': '',
  })

  idmap = env['CAT_FACT_TEST_USER_ENTID']

  const live = 'TRUE' === env.CAT_FACT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CAT_FACT_TEST_USER_ENTID']
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
  
