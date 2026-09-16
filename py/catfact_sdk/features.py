# CatFact SDK feature factory

from catfact_sdk.feature.base_feature import CatFactBaseFeature
from catfact_sdk.feature.ratelimit_feature import CatFactRatelimitFeature
from catfact_sdk.feature.retry_feature import CatFactRetryFeature
from catfact_sdk.feature.test_feature import CatFactTestFeature
from catfact_sdk.feature.timeout_feature import CatFactTimeoutFeature


_FEATURES = {
    "base": lambda: CatFactBaseFeature(),
    "ratelimit": lambda: CatFactRatelimitFeature(),
    "retry": lambda: CatFactRetryFeature(),
    "test": lambda: CatFactTestFeature(),
    "timeout": lambda: CatFactTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
