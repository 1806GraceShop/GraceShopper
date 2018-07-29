import {expect} from 'chai'
import {continueOnStatusCodes} from './_storeHelpers'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import history from '../history'

describe('Redux store helper', () => {
  let mockAxios

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
  })

  afterEach(() => {
    mockAxios.restore()
  })

  describe('function continueOnStatusCodes', () => {
    let mockres

    beforeEach(async () => {
      mockAxios.onGet('/test').replyOnce(200, {some: 'data'})
      mockres = await axios.get('/test')
    })

    it('returns a function', () => {
      expect(continueOnStatusCodes(200)).to.be.a('function')
    })
    it('throws an error if a status code is missing from an axios response', () => {
      let checkFn = continueOnStatusCodes(300, 400, 500)
      expect(() => checkFn(mockres)).to.throw('HTTP RESPONSE ERROR')
    })
    it('throws an error if no status codes provided', () => {
      let checkFn = continueOnStatusCodes()
      expect(() => checkFn(mockres)).to.throw('HTTP RESPONSE ERROR')
    })
    it('returns the entire response from axios if the response status is provided', () => {
      let checkFn = continueOnStatusCodes(200)
      expect(checkFn(mockres)).to.equal(mockres)
    })
    it("order doesn't matter", () => {
      let checkFn = continueOnStatusCodes(101, 230, 404, 201, 200)
      expect(checkFn(mockres)).to.equal(mockres)
      checkFn = continueOnStatusCodes(101, 200, 230, 404, 201)
      expect(checkFn(mockres)).to.equal(mockres)
      checkFn = continueOnStatusCodes(200, 230, 404, 201)
      expect(checkFn(mockres)).to.equal(mockres)
      checkFn = continueOnStatusCodes(200, 230, 404, 201)
      expect(checkFn(mockres)).to.equal(mockres)
    })
  })
})
