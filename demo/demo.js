// Visor de capturas. Sin JavaScript, cada miniatura abre la imagen grande como enlace normal.
(function () {
  var dialog = document.getElementById('lightbox');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  var image = dialog.querySelector('img');
  var caption = dialog.querySelector('p');
  var opener = null;

  document.querySelectorAll('[data-lightbox]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      opener = link;
      var thumb = link.querySelector('img');
      image.src = link.getAttribute('href');
      image.alt = thumb ? thumb.alt : '';
      caption.textContent = link.getAttribute('data-caption') || '';
      dialog.showModal();
    });
  });

  function close() {
    dialog.close();
  }

  dialog.querySelector('button').addEventListener('click', close);
  // Un clic fuera de la imagen (sobre el fondo) también cierra.
  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) close();
  });
  dialog.addEventListener('close', function () {
    image.removeAttribute('src');
    if (opener) opener.focus();
  });
})();
