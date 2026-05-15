package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewFactEntityFunc func(client *CatFactSDK, entopts map[string]any) CatFactEntity

var NewUserEntityFunc func(client *CatFactSDK, entopts map[string]any) CatFactEntity

