function debounce<T extends Function>(callback: T, wait: number) {
  let timeoutId: number;
  return (...args: any[]) => {
    globalThis.clearTimeout(timeoutId);
    timeoutId = globalThis.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}

export default debounce;
