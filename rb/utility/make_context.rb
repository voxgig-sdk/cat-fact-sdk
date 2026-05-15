# CatFact SDK utility: make_context
require_relative '../core/context'
module CatFactUtilities
  MakeContext = ->(ctxmap, basectx) {
    CatFactContext.new(ctxmap, basectx)
  }
end
