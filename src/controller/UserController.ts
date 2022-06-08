import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

export class UserController {
  async all(request: Request, response: Response, next: NextFunction) {
    return User.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    let userId = parseInt(request.params.id);
    let user = userId ? await User.findOneBy({ id: userId }) : undefined;
    if (user) {
      return user;
    }
    response.status(404).json({ message: "User not found" });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return User.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let userId = parseInt(request.params.id);
    let userToRemove = userId ? await User.findOneBy({ id: userId }) : undefined;
    await User.remove(userToRemove);
    response.status(200).json({ message: "User removed" });
  }
}
