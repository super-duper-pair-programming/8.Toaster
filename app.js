const $body = document.querySelector('body');

$body.addEventListener('click', e => {
  if (!e.target.matches('button')) return;

  const type = e.target.className.slice(5);

  const $newToast = document.createElement('div');
  $newToast.className = `toast ${type}`;
  $newToast.innerHTML = `
  <h4 class="toast-title">${type === 'success' ? 'Well done!' : 'Check it out!'} ${
    [...document.querySelectorAll('.toast')].length
  }</h4>
  <div class="toast-message">
    <svg width="24" height="24">
      <use xlink:href=#${type} />
    </svg>
    <p>${
      type === 'success'
        ? 'This is a success alert'
        : type === 'error'
        ? 'This is a error alert'
        : 'This is a warning alert'
    }</p>
  </div>
  <a class="toast-close">&times;</a>
  `;
  $body.appendChild($newToast);

  $newToast.addEventListener('click', e => {
    if (!e.target.matches('.toast-close')) return;
    $body.removeChild(e.target.closest('.toast'));

    [...document.querySelectorAll('.toast')].reverse().forEach((toast, i) => {
      toast.style.bottom = `calc(var(--toast-height) * ${i})`;
    });
  });

  setTimeout(() => {
    $body.removeChild([...document.querySelectorAll('.toast')][0]);
  }, 3000);

  [...document.querySelectorAll('.toast')].reverse().forEach((toast, i) => {
    toast.style.bottom = `calc(var(--toast-height) * ${i})`;
  });
});
