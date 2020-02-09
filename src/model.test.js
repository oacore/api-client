import Model from './model'

test('Static methods return instance', () => {
  expect(Model.search('ignored')).toBeInstanceOf(Model)
})

describe('Retrieving behaviour', () => {
  it('is thenable', done => {
    new Model().then(() => {
      done()
    })
  })

  it('is awaitable', async () => {
    await new Model()
  })
})
