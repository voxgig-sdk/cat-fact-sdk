# CatFact SDK utility: make_context

from catfact_sdk.core.context import CatFactContext


def make_context_util(ctxmap, basectx):
    return CatFactContext(ctxmap, basectx)
