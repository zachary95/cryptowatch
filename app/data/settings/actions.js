export const TRIGGER_AUTO_REFRESH = 'SETTINGS/TRIGGER_AUTO_REFRESH';
export const triggerAutoRefresh = () => ({ type: TRIGGER_AUTO_REFRESH });

export const STOP_AUTO_REFRESH = 'SETTINGS/TRIGGER_AUTO_REFRESH';
export const stopAutoRefresh = () => ({ type: STOP_AUTO_REFRESH });

export const SET_REFRESH_TIMER = 'SETTINGS/SET_REFRESH_TIMER';
export function setRefreshTimer(timer) {
  return {
    type: SET_REFRESH_TIMER,
    payload: {
      refreshTimer: timer,
    },
  };
}
