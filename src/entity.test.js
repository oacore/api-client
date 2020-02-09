import Entity from './entity'

const data = {
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

const entity = new Entity(data, options)

it('has property from initial state', () => {
  expect(entity.url).toBeDefined()
  expect(entity.url).toBe(data.url)
})

it('transforms dates', () => {
  expect(entity.updateDate).toBeInstanceOf(Date)
})

it('transforms URLs', () => {
  expect(entity.downloadUrl).toBeInstanceOf(URL)
  expect(entity.url).not.toBeInstanceOf(URL)
  expect(entity.url).toBe(data.url)
})
