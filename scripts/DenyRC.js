// Disable right click functionality for better clicking on trackpads
document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
  console.warn("Right-click is disabled.");
});