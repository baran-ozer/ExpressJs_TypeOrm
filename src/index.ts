import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import { User } from "./entity/User";
import * as morgan from "morgan";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 60, // Limit each IP to 60 requests per `window` (here, 60 per 5 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(limiter);
    app.use(bodyParser.json());
    app.use(morgan("dev"));
    app.use(express.static("./public")); // serving static files from public folder

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = new (route.controller as any)()[route.action](req, res, next);
        if (result instanceof Promise) {
          result.then((result) => (result !== null && result !== undefined ? res.send(result) : undefined));
        } else if (result !== null && result !== undefined) {
          res.json(result);
        }
      });
    });

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
    console.log("Express server has started on port 4000. Open http://localhost:4000/users to see results");
  })
  .catch((error) => console.log(error));
