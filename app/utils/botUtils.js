
export function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export function needCode() {
  const codeBox = document.querySelector('.code_box.clearfix')
  return !!codeBox;
}
