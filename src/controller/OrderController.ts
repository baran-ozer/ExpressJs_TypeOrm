import { NextFunction, Request, Response } from "express";
import { Order } from "../entity/Order";
import { User } from "../entity/User";

export class OrderController {
  async all(request: Request, response: Response, next: NextFunction) {
    const orders = await Order.find({
      relations: {
        user: true,
      },
    });
    return orders;
  }

  async one(request: Request, response: Response, next: NextFunction) {
    try {
      return await Order.findOneByOrFail({ id: parseInt(request.params.id) });
    } catch (error) {
      response.status(404).send(error);
    }
  }

  async save(request: Request, response: Response, next: NextFunction) {
    try {
      const { userId, quantity } = request.body;
      const user: User = await User.findOneByOrFail({
        id: parseInt(userId),
      });
      const order = Order.create({
        quantity: quantity,
        user: user,
      });
      await order.save();
      return order;
    } catch (error) {
      response.status(500).send(error);
    }
  }

  async userOrders(request: Request, response: Response, next: NextFunction) {
    try {
      const user_obj = await User.findOneByOrFail({
        id: parseInt(request.params.userId),
      });
      const orders = await Order.find({
        where: {
          user: {
            id: user_obj.id,
          },
        },
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
