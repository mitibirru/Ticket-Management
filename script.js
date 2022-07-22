let addBtn = document.querySelector(".add-btn");
let removeBtn = document.querySelector(".remove-btn");
let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let textareaCont = document.querySelector(".textarea-cont");
let allPriorityColors = document.querySelectorAll(".priority-color");
let toolBoxColors = document.querySelectorAll(".color");

let lockClass = "fa-lock";
let unlockClass = "fa-lock-open";

let colors = ["lightpink", "lightblue", "lightgreen", "black"];
let modalPriorityColor = colors[colors.length - 1];

let addFlag = false;
let removeFalg = false;

let ticketsArr = [];

for (let i = 0; i < toolBoxColors.length; i++) {
  toolBoxColors[i].addEventListener("click", (e) => {
    let currentToolBoxColor = toolBoxColors[i].classList[0];
    let filteredTickets = ticketsArr.filter(
      (ticket, idx) => currentToolBoxColor === ticket.ticketColor
    );

    // remove previous tickets
    let allTicketsCont = document.querySelectorAll(".ticket-cont");
    for (let i = 0; i < allTicketsCont.length; i++) {
      allTicketsCont[i].remove();
    }

    filteredTickets.forEach((ticket, idx) => {
      createTicket(ticket.ticketColor, ticket.ticketTask, ticket.ticketId);
    });
  });
  toolBoxColors[i].addEventListener("dblclick", (e) => {
    // remove previous tickets
    let allTicketsCont = document.querySelectorAll(".ticket-cont");
    for (let i = 0; i < allTicketsCont.length; i++) {
      allTicketsCont[i].remove();
    }

    ticketsArr.forEach((ticket, idx) => {
      createTicket(ticket.ticketColor, ticket.ticketTask, ticket.ticketId);
    });
  });
}
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
    createTicket(modalPriorityColor, textareaCont.value);
    setModalToDefault();
    addFlag = !addFlag;
  }
});

function createTicket(ticketColor, ticketTask, ticketId) {
  let id = ticketId || shortid();
  let ticketCont = document.createElement("div");
  ticketCont.setAttribute("class", "ticket-cont");
  ticketCont.innerHTML = `
        <div class="ticket-color ${ticketColor}"></div>
        <div class="ticket-id">${id}</div>
        <div class="task-area">
          ${ticketTask}
        </div>
        <div class="ticket-lock">
          <i class="fa-solid fa-lock"></i>
        </div>
  `;
  mainCont.appendChild(ticketCont);

  if (!ticketId) ticketsArr.push({ ticketColor, ticketTask, ticketId: id });

  ticketCont.addEventListener("click", (e) => {
    handleRemove(ticketCont);
  });
  handleLock(ticketCont);
  handleColor(ticketCont);
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

function handleColor(ticket) {
  const ticketColor = ticket.querySelector(".ticket-color");
  ticketColor.addEventListener("click", (e) => {
    const currentTicketColor = ticketColor.classList[1];
    let currentTicketColorIdx = colors.findIndex(
      (color) => color === currentTicketColor
    );
    currentTicketColorIdx++;
    let newTicketColorIdx = currentTicketColorIdx % colors.length;
    let newTicketColor = colors[newTicketColorIdx];
    ticketColor.classList.remove(currentTicketColor);
    ticketColor.classList.add(newTicketColor);
  });
}

function setModalToDefault() {
  modalCont.style.display = "none";
  textareaCont.value = "";
  modalPriorityColor = colors[colors.length - 1];
  allPriorityColors.forEach((color, idx) => {
    color.classList.remove("border");
  });
  allPriorityColors[allPriorityColors.length - 1].classList.add("border");
}
