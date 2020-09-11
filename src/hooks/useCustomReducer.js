import React from "react";

export function useCustomReducer(actions, initialState = {}) {
  const reducer = React.useCallback((state, action) => {
    if (actions[action.type]) {
      return actions[action.type](state, action);
    } else {
      return state;
    }
  }, []);

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const customDispatch = React.useMemo(() => {
    const allActions = {};
    Object.keys(actions).forEach((key) => {
      allActions[key] = (payload) => dispatch({ type: key, payload });
    });
    return allActions;
  }, []);

  return [state, customDispatch ] ;
}
