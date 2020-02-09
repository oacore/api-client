import Entity from '../entity'

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

const userHttpTransforms = [
  {
    test: 'affiliationUrl',
    transform: url => [new Entity({ url }), 'affiliation'],
  },
]

class UserEntity extends Entity {
  static defaultOptions = {
    transforms: [...userHttpTransforms, ...genericHttpTransforms],
  }
}

export default UserEntity
