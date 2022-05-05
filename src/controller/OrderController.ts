import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Order } from "../entity/Order";
import { User } from "../entity/User";

export class OrderController {
  orderRepository = AppDataSource.getRepository(Order);
  userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    const orders = await this.orderRepository.find({
      relations: {
        user: true,
      },
    });
    return orders;
  }

  async one(request: Request, response: Response, next: NextFunction) {
    try {
      return await this.orderRepository.findOneByOrFail({ id: parseInt(request.params.id) });
    } catch (error) {
      response.status(404).send(error);
    }
  }

  async save(request: Request, response: Response, next: NextFunction) {
    try {
      const user: User = await this.userRepository.findOneByOrFail({
        id: parseInt(request.body.userId),
      });
      const order = new Order();
      order.quantity = request.body.quantity;
      order.user = user;
      return AppDataSource.manager.save(order);
    } catch (error) {
      response.status(500).send(error);
    }
  }

  async userOrders(request: Request, response: Response, next: NextFunction) {
    try {
      const user: User = await this.userRepository.findOneByOrFail({
        id: parseInt(request.params.userId),
      });
      const orders = await this.orderRepository.find({
        where: { user: user },
        relations: {
          user: true,
        },
      });
      return orders;
    } catch (error) {
      response.status(500).send(error);
    }
  }
}
