import { createStore, applyMiddleware, Middleware } from "redux";
import { StateType, ActionType, default as reducer } from "store/rootReducer";

export const logger: Middleware<{}, StateType> =
  (storeAPI) => (next) => (action: ActionType) => {
    console.log("action:", action);
    return next(action);
  };

const middlewareEnhancer = applyMiddleware(logger);

export const store = createStore(reducer, {}, middlewareEnhancer);
