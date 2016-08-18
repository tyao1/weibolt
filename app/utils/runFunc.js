export default function runFunc(fn) {
  window.postMessage({
    type: '@weibolt',
    func: typeof fn === 'function' ? 'window.__weiboltFn__ = ' + fn.toString()
    : fn,
  },
    '*'
  );
}
