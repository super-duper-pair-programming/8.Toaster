const $body = document.querySelector('body');

const makeNewToast = type => {
  const $newToastDiv = document.createElement('div');
  $newToastDiv.className = `toast ${type}`;
  $newToastDiv.innerHTML = `
      <h4 class="toast-title">${type === 'success' ? 'Well done!' : 'Check it out!'} ${
    [...document.querySelectorAll('.toast')].length
  }</h4>
      <div class="toast-message">
        <svg width="24" height="24">
          <use xlink:href=#${type} />
        </svg>
        <p>This is a ${type} alert</p>
      </div>
      <a class="toast-close">&times;</a>
    `;
  $body.appendChild($newToastDiv);
  return $newToastDiv;
};

const removeToast = toast => $body.removeChild(toast);

const alignToasters = () => {
  [...document.querySelectorAll('.toast')].reverse().forEach((toast, i) => {
    toast.style.bottom = `calc(var(--toast-height) * ${i})`;
  });
};

$body.addEventListener('click', e => {
  if (e.target.matches("[class^='show-']")) {
    const $newToast = makeNewToast(e.target.className.split('-')[1]);
    setTimeout(() => removeToast($newToast), 3000);
    alignToasters();
  }

  if (e.target.matches('.toast-close')) {
    removeToast(e.target.closest('.toast'));
    alignToasters();
  }
});
