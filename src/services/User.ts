import { Iuser } from '../interfaces/user'
import { UserRepository } from '../model/userRepository'

export class User {
  private readonly userRepository = new UserRepository()
  user: Iuser

  async create (user: Iuser) {
    user.active = true
    user.commonUser = this.isCommonUser(user.CPF_CNPJ);
    const clientExists = await this.userRepository.get(user.email)
    if (clientExists) return false

    const insertedObj = await this.userRepository.save(user)
    if (!insertedObj) return false
    return true
  }

  private isCommonUser (cpfcnpj: string) {
    const document = cpfcnpj.replace(/.\/-/g, '');
    return document.length === 11 ? true : false;
  }

  async get (email: string): Promise<Iuser> {
    return await this.userRepository.get(email)
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
