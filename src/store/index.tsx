import React, { createContext, Dispatch, useReducer } from 'react';

import { rootReducer, DEFAULT_STATE } from './reducer';
import ActionI from './action';
import * as ALL_ACTION from './type';

export interface ContextI {
  state: typeof DEFAULT_STATE;
  dispatch: Dispatch<ActionI>;
}
interface PropsI {
  children: any;
}
const RootContext = createContext<ContextI>({ state: DEFAULT_STATE, dispatch: () => {} });

const RootStore: React.FC<PropsI> = (props: PropsI) => {
  const [state, dispatch] = useReducer(rootReducer, DEFAULT_STATE);

  const { children } = props;
  return (
    <RootContext.Provider value={{ state, dispatch }}>
      { children }
    </RootContext.Provider>
  );
};

export { RootContext, ALL_ACTION };
export default RootStore;
