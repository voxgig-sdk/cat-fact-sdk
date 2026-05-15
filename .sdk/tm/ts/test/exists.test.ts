
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { CatFactSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await CatFactSDK.test()
    equal(null !== testsdk, true)
  })

})
