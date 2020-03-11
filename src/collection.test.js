import Collection from './collection'

const initialItems = [1, 2, 3, 4, 5]

it('has length equal to initial array', () => {
  const collection = new Collection(initialItems)

  expect(collection).toHaveLength(initialItems.length)
})

it('extends itself', () => {
  const extendItems = [6, 7, 8, 9, 10]
  const collection = new Collection(initialItems)
  collection.extend(extendItems)

  expect(collection).toHaveLength(initialItems.length + extendItems.length)
})

it('iterates', () => {
  const collection = new Collection(initialItems)
  const collectionArray = Array.from(collection)

  expect(collectionArray).toEqual(initialItems)
})

it('transforms items', () => {
  const transform = n => n ** 2
  const collection = new Collection(initialItems, { transform })

  expect(Array.from(collection)).toEqual(initialItems.map(transform))
})
