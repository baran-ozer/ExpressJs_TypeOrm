import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export class UserController {
  userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    let user = await this.userRepository.findOneBy({ id: request.params.id });
    if (user) {
      return user;
    }
    response.status(404).json({ message: "User not found" });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let userToRemove = await this.userRepository.findOneBy({ id: request.params.id });
    await this.userRepository.remove(userToRemove);
    response.status(200).json({ message: "User removed" });
  }
}
