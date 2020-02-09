import Entity from '../entity'
import UserEntity from './user'

const data = {
  id: -1,
  url: 'https://api.core.ac.uk/internal/users/291',
  name: 'John Doe',
  email: 'john.doe@example.com',
  organisationId: -1,
  affiliationUrl: 'https://api.example.com/organizations/-1',
  permissionsUrl: 'https://api.example.com/users/-1/permissions',
}

describe('affiliation', () => {
  const user = new UserEntity(data)

  it('exists', () => {
    expect(user.affiliation).toBeDefined()
  })

  it('is an Entity', () => {
    expect(user.affiliation).toBeInstanceOf(Entity)
  })

  it('has an URL equal to the source', () => {
    expect(user.affiliation.url).toBe(data.affiliationUrl)
  })
})
