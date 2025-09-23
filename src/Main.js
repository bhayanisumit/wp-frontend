import { MyApp, mount } from "sigment";
import Body from "./components/Body";
import "./assets/css/index.css";
import Routes from "./router/Routes";
import "bootstrap/dist/css/bootstrap.min.css";

MyApp.cleanHtml(true);
MyApp.setMaxCacheSize(50);
MyApp.setRoute(Routes);

async function Main() {
  const app = fragment(
    await Body()
  );
  mount("root", app);
}
Main();
export default Main;
