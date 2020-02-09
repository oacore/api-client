class Model {
  #base

  #parameters = {
    query: '',
    order: [],
  }

  #options

  constructor(initialState = {}, options = {}) {
    const { base, ...parameters } = initialState

    this.#base = base
    this.#options = options
    this.configure(parameters)

    this.then = resolve => {
      delete this.then
      resolve(this)
    }
  }

  configure(parameters = {}) {
    const { query, order } = parameters

    if (typeof query != 'undefined') this.search(query)
    if (typeof order != 'undefined') this.orderBy(order)

    return this
  }

  search(query) {
    this.#parameters.query = query?.toString() ?? ''
    return this
  }

  order(property, direction) {
    const { order: config } = this.#parameters
    const option = config.find(([p]) => p === property)

    const currentDirection = option[1] || 1
    const newDirection = direction == null ? currentDirection : direction

    if (option != null) option[1] = newDirection
    else config.push([property, newDirection])

    return this
  }

  static search(...args) {
    const Constructor = this
    return new Constructor().search(...args)
  }
}

export default Model

// const dataProviders = await new DataProviders(user.dataProvidersUrl).search(input)
// render(Array.from(dataProviders))
// const refinedDataProviders = await dataProviders.search(input).order('name')
