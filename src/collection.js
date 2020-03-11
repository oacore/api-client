class Collection {
  static defaultOptions = {
    transform: x => x,
  }

  #options

  #items = []

  constructor(initialItems, options) {
    this.#options = { ...this.constructor.defaultOptions, ...options }
    this.extend(initialItems)
  }

  get length() {
    return this.#items.length
  }

  [Symbol.iterator]() {
    return this.#items[Symbol.iterator]()
  }

  extend(items) {
    const { transform } = this.#options
    this.#items.push(...items.map(item => transform(item)))
  }
}

export default Collection
