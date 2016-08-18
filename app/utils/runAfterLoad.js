// 默认3秒后必须运行
export default function runAfterLoad(fn, timeout = 15000) {
  let handler;
  function trigger() {
    clearTimeout(handler);
    window.removeEventListener('load', trigger);
    fn();
  }
  handler = setTimeout(trigger, timeout);
  window.addEventListener('load', trigger);
}
