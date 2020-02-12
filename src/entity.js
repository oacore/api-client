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

const createDescriptorFor = (
  key,
  {
    initialValues,
    modifiedValues,

    enumerable = true,
    configurable = true,
    writable = true,
  } = {}
) => {
  const descriptor = {
    enumerable,
    configurable,
  }

  if (writable) {
    descriptor.get = () =>
      (Object.prototype.hasOwnProperty.call(modifiedValues, key)
        ? modifiedValues
        : initialValues)[key]

    descriptor.set = newValue => {
      modifiedValues[key] = newValue
    }
  } else descriptor.get = () => initialValues[key]

  return descriptor
}

class Entity {
  #options

  #initialValues = {}

  #modifiedValues = {}

  constructor(initialState, options) {
    this.#options = {
      ...this.constructor.defaultOptions,
      ...options,
    }

    this.extend(initialState)
  }

  get diff() {
    return Object.fromEntries(
      Object.entries(this.#modifiedValues).filter(
        ([key, value]) => value !== this.#initialValues[key]
      )
    )
  }

  extend(object) {
    if (typeof object != 'object')
      throw TypeError('Entity initial state must be an object.')

    const { transforms = [] } = this.#options

    const entries = Object.entries(object).map(
      runTransforms.bind(null, transforms)
    )

    Object.assign(this.#initialValues, Object.fromEntries(entries))

    const descriptorOptions = {
      initialValues: this.#initialValues,
      modifiedValues: this.#modifiedValues,
    }

    entries.forEach(([key]) => {
      Object.defineProperty(
        this,
        key,
        createDescriptorFor(key, descriptorOptions)
      )
    })
  }
}

export default Entity
