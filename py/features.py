# CatFact SDK feature factory

from feature.base_feature import CatFactBaseFeature
from feature.test_feature import CatFactTestFeature


def _make_feature(name):
    features = {
        "base": lambda: CatFactBaseFeature(),
        "test": lambda: CatFactTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
