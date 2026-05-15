# CatFact SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module CatFactFeatures
  def self.make_feature(name)
    case name
    when "base"
      CatFactBaseFeature.new
    when "test"
      CatFactTestFeature.new
    else
      CatFactBaseFeature.new
    end
  end
end
