import createRouter, {MiddlewareFactory, Router} from "router5";
// tslint:disable-next-line:no-submodule-imports
import browserPlugin from "router5/plugins/browser";
import routes from "./routes";

export function configureRouter(): Router {
  const router = createRouter(routes)
    .usePlugin(browserPlugin({useHash: false}));

  const middlewares: MiddlewareFactory[] = [];

  router.useMiddleware(...middlewares);

  return router;
}
