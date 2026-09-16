"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('FactEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CAT_FACT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CAT_FACT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CatFactSDK.test();
        const ent = testsdk.Fact();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CAT_FACT_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'fact.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "date-time", "name": "createdAt", "req": false, "short": "Timestamp when the fact was created", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "deleted", "req": false, "short": "Whether the fact has been deleted", "type": "`$BOOLEAN`", "index$": 1 }, { "active": true, "name": "id", "req": true, "short": "Unique identifier for the fact", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "text", "req": true, "short": "The fact text content", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "type", "req": true, "short": "The type of animal the fact is about", "type": "`$STRING`", "index$": 4 }, { "active": true, "format": "date-time", "name": "updatedAt", "req": false, "short": "Timestamp when the fact was last updated", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "upvotes", "req": false, "short": "Number of upvotes the fact has received", "type": "`$INTEGER`", "index$": 6 }, { "active": true, "name": "used", "req": false, "short": "Whether the fact has been used", "type": "`$BOOLEAN`", "index$": 7 }, { "active": true, "name": "user", "req": false, "short": "User ID who submitted the fact", "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "userUpvoted", "req": false, "short": "Whether the current user has upvoted this fact", "type": "`$BOOLEAN`", "index$": 9 }], "id": { "field": "id", "name": "id" }, "name": "fact", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": 1, "kind": "query", "name": "amount", "orig": "amount", "reqd": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "example": "cat", "kind": "query", "name": "animal_type", "orig": "animal_type", "reqd": false, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /facts", "json": "{\"operationId\":\"getFacts\",\"parameters\":[{\"description\":\"Filter facts by animal type\",\"in\":\"query\",\"name\":\"animal_type\",\"required\":false,\"schema\":{\"default\":\"cat\",\"type\":\"string\"}},{\"description\":\"Number of facts to return\",\"in\":\"query\",\"name\":\"amount\",\"required\":false,\"schema\":{\"default\":1,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"description\":\"An animal fact\",\"properties\":{\"_id\":{\"description\":\"Unique identifier for the fact\",\"type\":\"string\"},\"createdAt\":{\"description\":\"Timestamp when the fact was created\",\"format\":\"date-time\",\"type\":\"string\"},\"deleted\":{\"description\":\"Whether the fact has been deleted\",\"type\":\"boolean\"},\"text\":{\"description\":\"The fact text content\",\"type\":\"string\"},\"type\":{\"description\":\"The type of animal the fact is about\",\"example\":\"cat\",\"type\":\"string\"},\"updatedAt\":{\"description\":\"Timestamp when the fact was last updated\",\"format\":\"date-time\",\"type\":\"string\"},\"upvotes\":{\"description\":\"Number of upvotes the fact has received\",\"type\":\"integer\"},\"used\":{\"description\":\"Whether the fact has been used\",\"type\":\"boolean\"},\"user\":{\"description\":\"User ID who submitted the fact\",\"type\":\"string\"},\"userUpvoted\":{\"description\":\"Whether the current user has upvoted this fact\",\"type\":\"boolean\"}},\"required\":[\"_id\",\"text\",\"type\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with cat facts\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"message\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySchemes\":{\"cookieAuth\":{\"description\":\"Session cookie authentication. Requires logging in manually on the website.\",\"in\":\"cookie\",\"name\":\"connect.sid\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/facts", "segments": [{ "lit": "facts" }], "select": { "exist": ["amount", "animal_type"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": 1, "kind": "query", "name": "amount", "orig": "amount", "reqd": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "example": "cat", "kind": "query", "name": "animal_type", "orig": "animal_type", "reqd": false, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /facts/random", "json": "{\"operationId\":\"getRandomFact\",\"parameters\":[{\"description\":\"Filter facts by animal type\",\"in\":\"query\",\"name\":\"animal_type\",\"required\":false,\"schema\":{\"default\":\"cat\",\"type\":\"string\"}},{\"description\":\"Number of facts to return\",\"in\":\"query\",\"name\":\"amount\",\"required\":false,\"schema\":{\"default\":1,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An animal fact\",\"properties\":{\"_id\":{\"description\":\"Unique identifier for the fact\",\"type\":\"string\"},\"createdAt\":{\"description\":\"Timestamp when the fact was created\",\"format\":\"date-time\",\"type\":\"string\"},\"deleted\":{\"description\":\"Whether the fact has been deleted\",\"type\":\"boolean\"},\"text\":{\"description\":\"The fact text content\",\"type\":\"string\"},\"type\":{\"description\":\"The type of animal the fact is about\",\"example\":\"cat\",\"type\":\"string\"},\"updatedAt\":{\"description\":\"Timestamp when the fact was last updated\",\"format\":\"date-time\",\"type\":\"string\"},\"upvotes\":{\"description\":\"Number of upvotes the fact has received\",\"type\":\"integer\"},\"used\":{\"description\":\"Whether the fact has been used\",\"type\":\"boolean\"},\"user\":{\"description\":\"User ID who submitted the fact\",\"type\":\"string\"},\"userUpvoted\":{\"description\":\"Whether the current user has upvoted this fact\",\"type\":\"boolean\"}},\"required\":[\"_id\",\"text\",\"type\"],\"type\":\"object\"}}},\"description\":\"Successful response with random cat fact(s)\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"message\":{\"description\":\"Error message\",\"type\":\"string\"},\"status\":{\"description\":\"HTTP status code\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySchemes\":{\"cookieAuth\":{\"description\":\"Session cookie authentication. Requires logging in manually on the website.\",\"in\":\"cookie\",\"name\":\"connect.sid\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/facts/random", "segments": [{ "lit": "facts" }, { "lit": "random" }], "select": { "$action": "random", "exist": ["amount", "animal_type"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "fact", "name__orig": "fact", "Name": "Fact", "name_": "fact", "name-": "fact", "NAME": "FACT", "index$": 0 }, { "active": true, "entity": "fact", "key$": "BasicFactFlow", "kind": "basic", "name": "BasicFactFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "fact_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "fact_ref01", "srcdatavar": "fact_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-fact_ref01" } }], "index$": 1 }] }, 'Fact');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let fact_ref01_data = Object.values(setup.data.existing.fact)[0];
        // LIST
        const fact_ref01_ent = client.Fact();
        const fact_ref01_match = {};
        const fact_ref01_list = (await fact_ref01_ent.list(fact_ref01_match)).map((e) => e.data());
        // LOAD
        const fact_ref01_match_dt0 = {};
        fact_ref01_match_dt0.id = fact_ref01_data.id;
        const fact_ref01_data_dt0 = (await fact_ref01_ent.load(fact_ref01_match_dt0)).data();
        (0, node_assert_1.default)(fact_ref01_data_dt0.id === fact_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/fact/FactTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CatFactSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['fact01', 'fact02', 'fact03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CAT_FACT_TEST_FACT_ENTID': idmap,
        'CAT_FACT_TEST_LIVE': 'FALSE',
        'CAT_FACT_TEST_EXPLAIN': 'FALSE',
        'CAT_FACT_APIKEY': '',
    });
    idmap = env['CAT_FACT_TEST_FACT_ENTID'];
    const live = 'TRUE' === env.CAT_FACT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CAT_FACT_TEST_FACT_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.CatFactSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
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
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=FactEntity.test.js.map