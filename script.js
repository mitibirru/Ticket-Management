let addBtn = document.querySelector(".add-btn");
let removeBtn = document.querySelector(".remove-btn");
let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let textareaCont = document.querySelector(".textarea-cont");
let allPriorityColors = document.querySelectorAll(".priority-color");
let lockClass = "fa-lock";
let unlockClass = "fa-lock-open";

let colors = ["lightpink", "lightblue", "lightgreen", "black"];
let modalPriorityColor = colors[colors.length - 1];

// listener for modal coloring
allPriorityColors.forEach((colorElem, idx) => {
  colorElem.addEventListener("click", (e) => {
    allPriorityColors.forEach((color, index) => {
      color.classList.remove("border");
    });
    colorElem.classList.add("border");

    modalPriorityColor = colorElem.classList[0];
  });
});

let addFlag = false;
let removeFalg = false;
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

removeBtn.addEventListener("click", (e) => {
  removeFalg = !removeFalg;
});

modalCont.addEventListener("keydown", (e) => {
  let key = e.key;
  if (key === "Shift") {
    createTicket(modalPriorityColor, textareaCont.value, shortid());
    modalCont.style.display = "none";
    textareaCont.value = "";
    addFlag = !addFlag;
  }
  if (key === "escape") {
    modalCont.style.display = "none";
  }
});

function createTicket(ticketColor, ticketTask, ticketId) {
  let ticketCont = document.createElement("div");
  ticketCont.setAttribute("class", "ticket-cont");
  ticketCont.innerHTML = `
        <div class="ticket-color ${ticketColor}"></div>
        <div class="ticket-id">${ticketId}</div>
        <div class="task-area">
          ${ticketTask}
        </div>
        <div class="ticket-lock">
          <i class="fa-solid fa-lock"></i>
        </div>
  `;
  mainCont.appendChild(ticketCont);

  ticketCont.addEventListener("click", (e) => {
    handleRemove(ticketCont);
  });
  handleLock(ticketCont);
}

function handleRemove(ticket) {
  // removeFlag -> true - remove ticket
  if (removeFalg) {
    ticket.remove();
  }
}

function handleLock(ticket) {
  let ticketLockElem = ticket.querySelector(".ticket-lock");
  let ticketLock = ticketLockElem.children[0];
  let ticketTaskArea = ticket.querySelector(".task-area");
  ticketLock.addEventListener("click", (e) => {
    if (ticketLock.classList.contains(lockClass)) {
      ticketLock.classList.remove(lockClass);
      ticketLock.classList.add(unlockClass);
      ticketTaskArea.setAttribute("contentEditable", true);
    } else {
      ticketLock.classList.remove(unlockClass);
      ticketLock.classList.add(lockClass);
      ticketTaskArea.setAttribute("contentEditable", false);
    }
  });
}
