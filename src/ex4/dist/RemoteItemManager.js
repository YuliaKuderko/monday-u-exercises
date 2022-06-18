class RemoteItemManager{
    constructor() {
        this.targetURL = 'http://localhost:8080/';
    }

    async add(text){
       const response = await fetch(this.targetURL + `add`,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: "POST",
        body: JSON.stringify({title:text})
       })
       await response.json();
    }

    async get(){
        const response = await fetch(this.targetURL+`get`);
        const data = await response.json();
        return Object.values(data);
    }

    async setDone(id){
        const response = await fetch(this.targetURL + `done/${id}`,{
            method: "PATCH",
           })
            await response.json();

    }

    async setUnDone(id){
        const response = await fetch(this.targetURL + `undone/${id}`,{
            method: "PATCH",
           })
          await response.json(); 
    }

    async deleteItem(id){
        const response = await fetch(this.targetURL + `delete/${id}`,{
            method: "DELETE",
           })
           await response.json();
    }

    async clearAll(array){
        const response = await fetch(this.targetURL + `delete_all_items`,{
            method: "DELETE",
           })
        await response.json();
    }
}
