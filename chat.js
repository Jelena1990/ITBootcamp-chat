class Chat {
   constructor( room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats'); 
        this.unsub;  
      }
    set room(r){
      this._room = r;
    }
    set username(u) {
        if (!u.trim().length) {
          this._username = "Anonymous";
        } else if (u.length > 1 && u.length < 11) {
          this._username = u;
        } else {
           alert("Username must be between 2 and 10 characters long!")
          this._username = "Anonymous";
        }
    }
    get room(){
      return this._room;
    }
    get username(){
      return this._username;
    }    
    updateRoom(ur){
        this.room = ur; 
        if(this.unsub){  
          this.unsub();
        }
    }
    
    async addChat(poruka){
      let date = new Date();
      date = firebase.firestore.Timestamp.fromDate(date)
      let someChat = {
          message: poruka,
          room: this.room, 
          username: this.username,  
          created_at: date
      };
      let response = await this.chats 
      .add(someChat)
      return response 
  }
 
    getChats(callback){
        this.unsub = this.chats         
        .orderBy('created_at')  
        .where('room', '==', this.room) 
        .onSnapshot(snapshot => {  
           snapshot.docChanges().forEach(change => {
                if(change.type == "added"){       
                   callback(change.doc.data()) 
               }
           })
        })
    }

    delete(id){
      this.chats
      .doc(id)
      .delete()
      .then((data) =>{
        console.log("deleted");
      })
      .catch(err => {
        console.log(err);
      })
    }
}

export{ Chat };