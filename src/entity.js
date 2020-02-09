function runTransforms(transforms, entry) {
  const [originalKey, originalValue] = entry

  const transform = transforms.find(({ test }) =>
    new RegExp(test).test(originalKey)
  )?.transform

  if (transform == null) return [originalKey, originalValue]

  const result = transform(originalValue, originalKey)
  if (Array.isArray(result) && result.length <= 2) {
    const [transfomedValue, transfomedKey] = result
    return [transfomedKey ?? originalKey, transfomedValue]
  }
  return [originalKey, result]
}

const createProperty = (
  initialValue,
  { enumerable = true, configurable = true, writable = true } = {}
) => {
  const descriptor = {
    enumerable,
    configurable,
  }

  const value = {
    initial: initialValue,
  }

  if (writable) {
    descriptor.get = () =>
      typeof value.modified != 'undefined' ? value.modified : value.initial

    descriptor.set = newValue => {
      value.modified = newValue
    }
  } else {
    descriptor.value = initialValue
    descriptor.writable = false
  }

  return descriptor
}

function applyProperties(entries) {
  entries.forEach(([key, value]) => {
    Object.defineProperty(this, key, createProperty(value))
  })
}

class Entity {
  constructor(state, options) {
    if (typeof state != 'object')
      throw TypeError('Entity initial state must be an object.')

    const { transforms = [] } = {
      ...this.constructor.defaultOptions,
      ...options,
    }

    const entries = Object.entries(state).map(
      runTransforms.bind(null, transforms)
    )

    this.source = Object.fromEntries(entries)
    this.change = {}

    applyProperties.call(this, entries)
  }
}

export default Entity
