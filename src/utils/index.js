export async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function debounce(ms, callback) {
  let timerId;
  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(callback, ms, ...args);
  };
}
