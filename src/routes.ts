import { OrderController } from "./controller/OrderController";
import { UserController } from "./controller/UserController";

// prettier-ignore
export const Routes = [
  // user urls
  { route: "/users", method: "get", controller: UserController, action: "all" },
  { route: "/users/:id", method: "get", controller: UserController, action: "one" },
  { route: "/users", method: "post", controller: UserController, action: "save" },
  { route: "/users/:id", method: "delete", controller: UserController, action: "remove"},
  // order urls
  { route: "/orders", method: "get", controller: OrderController, action: "all" },
  { route: "/orders/:id", method: "get", controller: OrderController, action: "one" },
  { route: "/orders", method: "post", controller: OrderController, action: "save" },
  { route: "/orders/user/:userId", method: "get", controller: OrderController, action: "userOrders" },
];
