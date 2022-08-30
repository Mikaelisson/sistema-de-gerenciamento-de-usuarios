document.addEventListener("DOMContentLoaded", () => {
  const activeConfig = (e) => {
    e.preventDefault();
    configContent.classList.toggle("d-flex");
    configContent.classList.toggle("d-none");
  };

  document.getElementById("config").addEventListener("click", activeConfig);
  document.getElementById("close").addEventListener("click", activeConfig);

  let configContent = document.getElementById("config-content");
});
