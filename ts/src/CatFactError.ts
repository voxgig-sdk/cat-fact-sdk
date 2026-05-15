
import { Context } from './Context'


class CatFactError extends Error {

  isCatFactError = true

  sdk = 'CatFact'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  CatFactError
}

