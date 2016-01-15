const every = (iter, fn) => Array.prototype.every.call(iter, fn);

checkValid = function(form) {
  const valid = every(
    form.querySelectorAll('[required]'),
    input => {
      return input.validity.valid && input.value.trim();
    }
  );

  const button = form.querySelector('button');

  if (valid) {
    button.removeAttribute('disabled');
  } else {
    button.setAttribute('disabled', 'disabled');
  }
};
