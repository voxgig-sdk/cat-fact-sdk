
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CatFactSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = CatFactSDK.test()
    equal(testsdk instanceof CatFactSDK, true,
      'CatFactSDK.test() must return a client synchronously')
  })

})
