import Entity from './entity'

const genericHttpTransforms = [
  {
    test: /Date$/,
    transform: value => new Date(value),
  },
  {
    test: /Url$/,
    transform: value => new URL(value),
  },
]

const workHttpTransforms = []

class WorkEntity extends Entity {
  static defaultOptions = [
    ...workHttpTransforms,
    ...genericHttpTransforms,
  ]
