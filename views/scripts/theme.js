document.addEventListener("DOMContentLoaded", async () => {
  const themeDark = document.getElementById("theme-dark");
  const themeLight = document.getElementById("theme-light");
  const menu = document.getElementById("menu");
  const containerPrincipal = document.querySelector("body");
  const form = document.querySelectorAll("form");
  let SaveTheme = "";
  const SavedTheme = "savedTheme";

  //altera as cores do app de acordo com as preferências do usuário
  const themeLightApp = () => {
    menu.classList.toggle("btn-dark");
    menu.classList.toggle("btn-light");

    containerPrincipal.classList.toggle("bg-dark");
    containerPrincipal.classList.toggle("text-white");
    containerPrincipal.classList.toggle("bg-light");
    containerPrincipal.classList.toggle("text-dark");

    form.forEach((i) => {
      i.classList.toggle("text-bg-dark");
      i.classList.toggle("text-bg-light");
    });

    localStorage.setItem(SavedTheme, SaveTheme);
  };

  //altera nas configurações qual tema o usuário está usando
  const changeTheme = (e) => {
    if (e) e.preventDefault();

    themeDark.classList.toggle("d-flex");
    themeDark.classList.toggle("d-none");
    themeLight.classList.toggle("d-flex");
    themeLight.classList.toggle("d-none");

    if (window.getComputedStyle(themeLight).display === "flex") {
      SaveTheme = "theme light";
      themeLightApp();
    }
    if (window.getComputedStyle(themeDark).display === "flex") {
      SaveTheme = "theme dark";
      themeLightApp();
    }
  };

  //verifica qual tema o usuário deixou pré-definido e altera automaticamente
  if (localStorage.getItem(SavedTheme) === "theme dark") {
    //tema padrão
  } else if (localStorage.getItem(SavedTheme) === "theme light") {
    changeTheme();
  }

  document.getElementById("theme").addEventListener("click", changeTheme);
});
