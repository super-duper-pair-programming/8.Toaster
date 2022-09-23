const Toaster = (() => ({
  makeNewToast(type) {
    // prettier-ignore
    const newToastInnerHTML = `
    <div class="toast ${type}">
      <h4 class="toast-title">${type === 'success' ? 'Well done!' : 'Check it out!'} ${[...document.querySelectorAll('.toast')].length}</h4>
      <div class="toast-message">
        <svg width="24" height="24">
          <use xlink:href=#${type} />
        </svg>
        <p>This is a ${type} alert</p>
      </div>
      <a class="toast-close">&times;</a>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', newToastInnerHTML);

    const $newToast = document.body.lastElementChild;
    setTimeout(() => Toaster.removeToast($newToast), 3000);

    Toaster.alignToasts();
  },

  removeToast(toast) {
    document.body.removeChild(toast);

    Toaster.alignToasts();
  },

  alignToasts() {
    [...document.querySelectorAll('.toast')].reverse().forEach((toast, i) => {
      toast.style.bottom = `calc(var(--toast-height) * ${i})`;
    });
  },
}))();

document.body.addEventListener('click', e => {
  if (e.target.matches("[class^='show-']")) Toaster.makeNewToast(e.target.className.split('-')[1]);
  if (e.target.matches('.toast-close')) Toaster.removeToast(e.target.closest('.toast'));
});

// [변경사항]
// - document.querySelector("body")를 docuement.body로 변경해서 DOM 탐색 시간을 줄임
// - makeNewToast, removeToast, alignToast 함수를 만들어 event listener 내부 코드 간소화
// - 이전에는 새로운 toast가 만들어진지 3초 후 최상단의 toast가 사라지도록 구현하였으나,
// 요구사항을 충족하지 못하므로 새로운 toaster가 만들어진지 3초 후 해당 토스터가 사라지게 함
// - 각 요소에 줬던 click 이벤트를 body에 걸어줌으로써 event listener 중첩 생성을 막음
