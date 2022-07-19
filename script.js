let addBtn = document.querySelector(".add-btn");
let modalCont = document.querySelector(".modal-cont");
let addFlag = false;

addBtn.addEventListener("click", (e) => {
  // Display Modal
  // AddFlag = true -> display modal
  // AddFlag = false -> hide modal
  addFlag = !addFlag;
  if (addFlag) {
    modalCont.style.display = "flex";
  } else {
    modalCont.style.display = "none";
  }
  // Generate Ticket
});
