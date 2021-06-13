import { createStore, IModuleStore } from "redux-dynamic-modules";
import { getSagaExtension } from "redux-dynamic-modules-saga";
import { GetSeatsModule } from "./seatsModule/module";
 
export const store: IModuleStore<any> = createStore({
      initialState: {},
      enhancers: [], 
      extensions: [getSagaExtension({})],
    },
    GetSeatsModule
);
