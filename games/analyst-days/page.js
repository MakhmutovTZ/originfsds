(() => {
  const dialog = document.querySelector('.image-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const image = dialog.querySelector('img');
  const close = dialog.querySelector('.dialog-close');
  let returnFocus;
  let previousOverflow;
  document.querySelectorAll('[data-lightbox]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      returnFocus = link;
      image.src = link.href;
      image.alt = link.querySelector('img').alt;
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
      dialog.scrollTop = 0;
      dialog.scrollLeft = 0;
      close.focus();
    });
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow || '';
    returnFocus?.focus({ preventScroll: true });
  });
})();
