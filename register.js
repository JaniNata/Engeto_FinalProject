document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".reg_form");
  const pwd1 = document.getElementById("pwd1");
  const pwd2 = document.getElementById("pwd2");

  if (!form || !pwd1 || !pwd2) return;

  // přidání/odebrání tříd
  const setState = (el, ok, error) => {
    el.classList.toggle("is-ok", !!ok);
    el.classList.toggle("is-error", !!error);
  };

  // kontrola hesel
  const validatePasswords = () => {
    const val1 = pwd1.value.trim();
    const val2 = pwd2.value.trim();

    if (!val1 || !val2) {
      setState(pwd1, false, false);
      setState(pwd2, false, false);
      pwd2.setCustomValidity("");
      return true;
    }

    if (val1 === val2) {
      setState(pwd1, true, false);
      setState(pwd2, true, false);
      pwd2.setCustomValidity("");
      return true;
    } else {
      setState(pwd1, false, true);
      setState(pwd2, false, true);
      pwd2.setCustomValidity("Hesla se neshodují");
      return false;
    }
  };

  // kontrola při psaní
  pwd1.addEventListener("input", validatePasswords);
  pwd2.addEventListener("input", validatePasswords);

  // kontrola při odeslání
  form.addEventListener("submit", (e) => {
    if (!validatePasswords()) {
      e.preventDefault();
      pwd2.reportValidity();
    }
  });
});
