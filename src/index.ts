import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import { User } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = new (route.controller as any)()[route.action](req, res, next);
        if (result instanceof Promise) {
          result.then((result) =>
            result !== null && result !== undefined ? res.send(result) : undefined
          );
        } else if (result !== null && result !== undefined) {
          res.json(result);
        }
      });
    });

    // setup express app here
    app.use(express.static("./public")); // serving static files from public folder

    // ...

    // start express server
    app.listen(4000);

    const userRepository = AppDataSource.getRepository(User);
    // insert new users for test
    let user_1 = await userRepository.findOneBy({ firstName: "Timber", lastName: "Saw" });
    if (!user_1) {
      await AppDataSource.manager.save(
        AppDataSource.manager.create(User, {
          firstName: "Timber",
          lastName: "Saw",
          age: 27,
        })
      );
    }
    let user_2 = await userRepository.findOneBy({ firstName: "Phantom", lastName: "Assassin" });
    if (!user_2) {
      await AppDataSource.manager.save(
        AppDataSource.manager.create(User, {
          firstName: "Phantom",
          lastName: "Assassin",
          age: 24,
        })
      );
    }
    let user_3 = await userRepository.findOneBy({ firstName: "Faceless", lastName: "Void" });
    if (!user_3) {
      await AppDataSource.manager.save(
        AppDataSource.manager.create(User, {
          firstName: "Faceless",
          lastName: "Void",
          age: 95,
        })
      );
    }
    console.log(
      "Express server has started on port 4000. Open http://localhost:4000/users to see results"
    );
  })
  .catch((error) => console.log(error));