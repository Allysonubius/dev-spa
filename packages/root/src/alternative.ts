import { registerApplication, start } from "single-spa";

const apps = [
  {
    name: "@shoppe/app-header",
    package: "@shoppe/app-header",
    activeWhen: (location) => !location.pathname.startsWith("/blank"),
  },
  {
    name: "@shoppe/app-footer",
    package: "@shoppe/app-footer",
    activeWhen: ["/"],
  },
];

apps.forEach((apps) => {
    registerApplication({
        name: apps.package,
        app: async () => {
            const module = await System.import(apps.package);
            return{
                bootstrap: module.bootstrap,
                mount: module.mount,
                unmount: module.unmount,
            };
        },
        activeWhen: apps.activeWhen,
    });
});
  

start({
  urlRerouteOnly: true,
});