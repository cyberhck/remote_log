interface IRoute {
  name: string;
  path: string;
}

// todo: use base in configureRouter to preserve /configurator part of url so routes stay clean and unique
const routes: IRoute[] = [
  {name: "home", path: "/"}
];

export default routes;
