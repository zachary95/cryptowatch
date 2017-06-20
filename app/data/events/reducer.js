import initialState from './initialState';
import type { Event } from './initialState';

// @TODO : Créer une epic qui permet de dispatcher quelques actions comme "STOP_AUTO_REFRESH"

import {
  WINDOW_APPEARED,
  WINDOW_DISAPPEARED
} from './actions';

export default (state:Event = initialState, action) => {
  switch (action.type) {
    case WINDOW_APPEARED:
      return {
        ...state,
        isWindowActive: true,
      };

    case WINDOW_DISAPPEARED:
      return {
        ...state,
        isWindowActive: false,
      };

    default:
      return state;
  }
};
