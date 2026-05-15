package = "voxgig-sdk-cat-fact"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/cat-fact-sdk.git"
}
description = {
  summary = "CatFact SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["cat-fact_sdk"] = "cat-fact_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
