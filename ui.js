class ChatUI {
  constructor(l) {
    this.list = l;
  }
  set list(lista) {
    this._list = lista;
  }
  get list() {
    return this._list;
  }

  time(date) {
    let created = date.created_at.toDate();
    let day = created.getDate();
    let month = created.getMonth() + 1;
    let year = created.getFullYear();
    let h = created.getHours();
    let min = created.getMinutes();

    day = String(day).padStart(2, "0");
    month = String(month).padStart(2, "0");
    h = String(h).padStart(2, "0");
    min = String(min).padStart(2, "0");

    let t = ` ${day}. ${month}. ${year}. ${h}: ${min} `;
    let t1 = `${h}: ${min} `;
    let today = new Date();

    if (created.getDate() == today.getDate()) {
      return t1;
    } else {
      return t;
    }
  }
  //radi preredjivanje poruka nakon refresovanja stranice :)
  templateLI(data) {
    if (data.message != "") {
      let username1 = localStorage.getItem("username");
      if (username1 == data.username) {
        let li = `<li class="right">
                  <div class="username"> ${data.username}: </div>
                  <div class="message"> ${data.message}</div>
                  <div class="date"> ${this.time(data)}</div>  
                  <img  class="bin" src= bin2.png>
                </li>`;
        this.list.innerHTML += li;
      } else {
        let li = `<li class="left">
                <div class="username"> ${data.username}: </div>
                <div class="message"> ${data.message}</div>
                <div class="date"> ${this.time(data)}</div>  
                <img  class="bin" src= bin.png>
              </li>`;
        this.list.innerHTML += li; //ceo el sa stranice tj ul iz htmla
      }
    }
  }
  clearUL() {
    this.list.innerHTML = " ";
  }
}
export { ChatUI };
