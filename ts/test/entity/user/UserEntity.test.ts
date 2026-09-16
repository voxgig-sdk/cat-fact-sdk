

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date-time","name":"createdAt","req":false,"short":"Timestamp when the user account was created","type":"`$STRING`","index$":0},{"active":true,"format":"email","name":"email","req":false,"short":"User's email address","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":true,"short":"Unique identifier for the user","type":"`$STRING`","index$":2},{"active":true,"name":"name","req":false,"type":"`$OBJECT`","index$":3},{"active":true,"format":"date-time","name":"updatedAt","req":false,"short":"Timestamp when the user account was last updated","type":"`$STRING`","index$":4}],"id":{"field":"id","name":"id"},"name":"user","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /users","json":"{\"operationId\":\"getUsers\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"description\":\"A user of the Cat Facts site\",\"properties\":{\"_id\":{\"description\":\"Unique identifier for the user\",\"type\":\"string\"},\"createdAt\":{\"description\":\"Timestamp when the user account was created\",\"format\":\"date-time\",\"type\":\"string\"},\"email\":{\"description\":\"User's email address\",\"format\":\"email\",\"type\":\"string\"},\"name\":{\"properties\":{\"first\":{\"description\":\"User's first name\",\"type\":\"string\"},\"last\":{\"description\":\"User's last name\",\"type\":\"string\"}},\"type\":\"object\"},\"updatedAt\":{\"description\":\"Timestamp when the user account was last updated\",\"format\":\"date-time\",\"type\":\"string\"}},\"required\":[\"_id\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with user data\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"message\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - Authentication required\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"message\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"cookieAuth\":[]}],\"securitySchemes\":{\"cookieAuth\":{\"description\":\"Session cookie authentication. Requires logging in manually on the website.\",\"in\":\"cookie\",\"name\":\"connect.sid\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/users","segments":[{"lit":"users"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"user","name__orig":"user","Name":"User","name_":"user","name-":"user","NAME":"USER","index$":1}, {"active":true,"entity":"user","key$":"BasicUserFlow","kind":"basic","name":"BasicUserFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"user_ref01"}}],"index$":0}]}, 'User')
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
  
