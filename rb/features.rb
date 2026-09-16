# CatFact SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module CatFactFeatures
  def self.make_feature(name)
    case name
    when "base"
      CatFactBaseFeature.new
    when "ratelimit"
      CatFactRatelimitFeature.new
    when "retry"
      CatFactRetryFeature.new
    when "test"
      CatFactTestFeature.new
    when "timeout"
      CatFactTimeoutFeature.new
    else
      CatFactBaseFeature.new
    end
  end
end
