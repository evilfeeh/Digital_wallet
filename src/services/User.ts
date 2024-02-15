import { Iuser } from '../interfaces/user'
import { UserRepository } from '../model/userRepository'

export class User {
  private readonly userRepository = new UserRepository()
  user: Iuser

  async create (user: Iuser): Promise<boolean> {
    this.user = user
    const clientExists = await this.userRepository.get(user.email)
    if (clientExists) return false

    const insertedObj = await this.userRepository.save(user)
    if (!insertedObj) return false
    return true
  }

  async get (email: string): Promise<Iuser> {
    try {
      return await this.userRepository.get(email)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async update (email: string, toUpdate: any) {
    const updated = await this.userRepository.update(email, toUpdate)
    if (!updated) return false
    return true
  }

  async delete (email: string) {
    const deleted = await this.userRepository.delete(email)
    if (!deleted) false
    return true
  }
}
