package voxgigcatfactsdk

import (
	"github.com/voxgig-sdk/cat-fact-sdk/go/core"
	"github.com/voxgig-sdk/cat-fact-sdk/go/entity"
	"github.com/voxgig-sdk/cat-fact-sdk/go/feature"
	_ "github.com/voxgig-sdk/cat-fact-sdk/go/utility"
)

// Type aliases preserve external API.
type CatFactSDK = core.CatFactSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type CatFactEntity = core.CatFactEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type CatFactError = core.CatFactError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewFactEntityFunc = func(client *core.CatFactSDK, entopts map[string]any) core.CatFactEntity {
		return entity.NewFactEntity(client, entopts)
	}
	core.NewUserEntityFunc = func(client *core.CatFactSDK, entopts map[string]any) core.CatFactEntity {
		return entity.NewUserEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewCatFactSDK = core.NewCatFactSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
