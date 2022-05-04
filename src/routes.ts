import { UserController } from "./controller/UserController";

// prettier-ignore
export const Routes = [
  { route: "/users", method: "get", controller: UserController, action: "all" },
  { route: "/users/:id", method: "get", controller: UserController, action: "one" },
  { route: "/users", method: "post", controller: UserController, action: "save" },
  { route: "/users/:id", method: "delete", controller: UserController, action: "remove"},
];
