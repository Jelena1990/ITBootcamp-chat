import { Chat } from "./chat.js";
import { ChatUI } from "./ui.js";

let ul = document.querySelector("#ul");
let formaMsg = document.getElementById("formaMsg");
let formaUpdate = document.getElementById("formaUpdate");
let div = document.getElementById("obavestenje");
let nav = document.getElementById("nav");
let chatSection = document.getElementById("chatSection");
// let btnColor= document.getElementById('btnColor');
// let color=document.getElementById('changeColor');
// let body = document.getElementsByTagName('body')[0];
// let noviNacin = document.getElementById('noviNacin');

let username;
if (localStorage.username) {
  username = localStorage.getItem("username");
} else {
  username = "Anonymous";
}

let chat = new Chat("#js", username);
let chatUI = new ChatUI(ul);

formaMsg.addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("audio").play();
  let poruka = document.getElementById("inputM").value;
  //  let poruka2= noviNacin.value;
  chat
    .addChat(poruka)
    // chat.addChat(poruka2)
    .then(() => {
      formaMsg.reset();
      console.log("Poruka uspesno dodata");
    })
    .catch((e) => {
      console.log(e);
    });
});

//for Enter za textarea
// formaMsg.addEventListener("keyup", function(e) {
//   e.preventDefault();
//   if(e.key =="Enter"){
//   document.getElementById('audio').play();
//   //  let poruka= document.getElementById('inputM').value;
//    let poruka2= noviNacin.value;
//     // chat.addChat(poruka)
//     chat.addChat(poruka2)
//    .then( ()  =>{
//     formaMsg.reset();
//     console.log("Poruka uspesno dodata");
//   })
//   .catch(e=> {
//     console.log(e);
//   })
// }
// })

formaUpdate.addEventListener("click", function (e) {
  e.preventDefault();
  let newUsername = document.getElementById("inputU").value;
  chat.username = newUsername;
  localStorage.setItem("username", newUsername);
  let notification = document.createElement("span");
  notification.innerHTML = newUsername;
  notification.setAttribute("class", "show");
  div.appendChild(notification);
  div.classList.toggle("show");
  setTimeout(() => {
    notification.remove();
  }, 3000);
  formaUpdate.reset();
});

let prevButton = null;
nav.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    let newRoom = e.target.textContent;
    chat.updateRoom(newRoom);
    console.log(newRoom);
    const isButton = e.target.nodeName === "BUTTON";
    if (!isButton) {
      return;
    }
    e.target.classList.add("active");
    if (prevButton !== null) {
      prevButton.classList.remove("active");
    }
    prevButton = e.target;
  }
  chatUI.clearUL();
  chat.getChats((data) => {
    chatUI.templateLI(data);
  });
});

// btnColor.addEventListener("click", e => {
//   e.preventDefault();
//   let newColor=color.value;
//   console.log(color);
//   setTimeout( () =>{
//     body.style.backgroundColor = newColor}, 500)
//     localStorage.setItem('color', newColor )
//   })
//   body.style.backgroundColor = localStorage.color;

//radi samo na enter, nece za BRISANJE PORUKA
ul.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName === "I") {
    confirm("Are you sure you wanna delete it?");
    e.target.parentElement.remove();
    chat.delete(e.target.parentElement.id);
    console.log("poruka obrisana");
  }
});

// // Delete message
// chatSection.addEventListener("click", (e) => {
//   if (e.target.tagName === "IMG") {
//     let li = e.target.parentElement;
//     let id = li.id;
//     let user = li.firstElementChild.textContent.slice(0, -2);
//     if (user == localStorage.user) {
//       chat.chats
//         .doc(id)
//         .delete()
//         .then(() => li.remove())
//         .catch((err) => console.log(err));
//     } else {
//       li.remove();
//       if (
//         confirm(
//           "Do you want to also permanently delete the message from another user?"
//         ) == true
//       ) {
//         chat.chats
//           .doc(id)
//           .delete()
//           .then(() => console.log("message removed"))
//           .catch((err) => console.log(err));
//       }
//     }
//   }
// });
