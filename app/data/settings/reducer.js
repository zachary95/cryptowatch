// @flow
import {
  SET_REFRESH_TIMER,
} from './actions';

import initialState from './initialState';
import type { Settings } from './initialState';

export default function SettingsReducer(state: Settings = initialState, action: Object) {
  switch (action.type) {
    case SET_REFRESH_TIMER:
      return {
        ...state,
        refreshTimer: action.payload.refreshTimer,
      };

    default:
      return state;
  }
}
