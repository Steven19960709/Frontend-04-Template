const assert = require('assert')
// const { add } = require('./add')
// const { mul } = require('./add')
import { add, mul } from './add'

describe('add function testing', () => {
  it('1 + 2 should be 3', function() {
    assert.equal(add(1,2), 3)
  })
  it('5 * 2 shoublud 10', function () {
    assert.equal(mul(5, 2), 10)
  })
})