import { INACTIVITY_TIMEOUT } from "../constants/settings";

export const setInactivityTimeout = (cb = () => {}) => {
  const inactivityTimeout = () =>
    setTimeout(() => {
      cb();
    }, INACTIVITY_TIMEOUT);

  let inactivityTime = inactivityTimeout();

  const resetTimer = () => {
    clearTimeout(inactivityTime);
    inactivityTime = inactivityTimeout();
  };

  window.onload = resetTimer;
  document.onmousemove = resetTimer;
  document.onkeydown = resetTimer;
};
