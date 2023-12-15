export async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isFunction(func) {
  return func instanceof Function;
}

export function isAsyncFunction(func) {
  return isFunction(func) && func.constructor.name === "AsyncFunction";
}

export async function retry(
  task,
  config = { interval: 1, maxRetries: 2, exponentialRate: 1 }
) {
  // merged config
  config = {
    ...{ interval: 1, maxRetries: 2, exponentialRate: 1 }, // defaults
    ...config,
  };

  if (!isFunction(task)) {
    throw Error("`task` argument is not a function");
  }

  let triesLeft = config.maxRetries + 1; // retries + initial run

  while (triesLeft) {
    try {
      if (isAsyncFunction(task)) {
        return await task();
      }

      task();
      break;
    } catch (err) {
      --triesLeft;

      if (!triesLeft) {
        throw err;
      }

      const retryNumber = config.maxRetries + 1 - triesLeft; // total tries - triesleft
      const ms =
        config.interval * 1000 * Math.pow(config.exponentialRate, retryNumber);
      await delay(ms);
    }
  }
}

export function isServer() {
  return typeof window === "undefined" ? true : false;
}

export function getSearchParams(nextReq) {
  return Object.fromEntries(nextReq.nextUrl.searchParams.entries());
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
