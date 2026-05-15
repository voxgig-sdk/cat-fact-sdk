# CatFact SDK utility: feature_add
module CatFactUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
