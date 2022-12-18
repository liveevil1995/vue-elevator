import { createStore } from "vuex";
import { controllerModule } from "@/store/controllerModule";

export default createStore({
  state: {},
  modules: {
    controller: controllerModule
  }
});