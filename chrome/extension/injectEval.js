window.addEventListener('message', function(event) {
  if (event.source !== window) return;
  if (event.data.type === '@weibolt') {
    console.log(event.data);
    if (event.data.func) {
      eval(event.data.func);
      if (window.__weiboltFn__) window.__weiboltFn__();
    }
  }
});
