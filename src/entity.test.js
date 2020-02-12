import Entity from './entity'

it('assigns properties itself', () => {
  const initialState = {
    id: 123,
    url: 'https://example.com',
  }
  const entity = new Entity(initialState)

  expect(entity.id).toBe(initialState.id)
  expect(entity.url).toBe(initialState.url)
})

describe('transforms', () => {
  const initialState = {
    name: 'Entity 1',
    updateDate: '2019-12-18T00:04:05Z',
    downloadUrl: 'http://example.com',
    url: 'http://example.com',
  }

  const transforms = [
    {
      test: /Date$/,
      transform: value => new Date(value),
    },
    {
      test: /Url$/,
      transform: value => new URL(value),
    },
  ]

  const options = { transforms }

  const entity = new Entity(initialState, options)

  it('are applied if test matches', () => {
    expect(entity.updateDate).toBeInstanceOf(Date)
    expect(entity.downloadUrl).toBeInstanceOf(URL)
  })

  it('are not applied if test does not match', () => {
    expect(entity.url).toBe(initialState.url)
  })
})

describe('diff', () => {
  const oldName = 'Entity 1'
  const newName = 'Entity 2'

  const initialState = {
    name: oldName,
  }
  const entity = new Entity(initialState)

  it('is empty after initialisation', () => {
    expect(entity.diff).toEqual({})
  })

  it('is equal to changes happened', () => {
    entity.name = newName
    expect(entity.diff).toEqual({ name: newName })
  })

  it('is empty if changes undone', () => {
    entity.name = oldName
    expect(entity.diff).toEqual({})
  })
})
