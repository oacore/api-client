/**
 * We assume that parameters not listed here are serialised as are.
 * The map is evaluated as
 *   programmaticValue : transferringValue
 */
const serializationMap = {
  query: 'q',
}

const deserializationMap = Object.fromEntries(
  Object.entries(serializationMap).map(([first, second]) => [second, first])
)

class ResourceURL extends URL {
  constructor(resource, base, parameters = {}) {
    super(resource, base)
    console.log(parameters)
  }
}

export default ResourceURL
