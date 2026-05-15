-- CatFact SDK error

local CatFactError = {}
CatFactError.__index = CatFactError


function CatFactError.new(code, msg, ctx)
  local self = setmetatable({}, CatFactError)
  self.is_sdk_error = true
  self.sdk = "CatFact"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function CatFactError:error()
  return self.msg
end


function CatFactError:__tostring()
  return self.msg
end


return CatFactError
