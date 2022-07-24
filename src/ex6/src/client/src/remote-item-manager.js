class RemoteItemManager {
    constructor() {
        this.targetURL = 'http://localhost:8080/';
    }

    async add(text) {
        try {
            const response = await fetch(this.targetURL + `add`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ itemName: text })
            })
            await response.json();
        } catch (e) {
            throw e;
        }
    }

    async get() {
        try {
            const response = await fetch(this.targetURL + `get`);
            const data = await response.json();
            return data;
        } catch (e) {
            throw e;
        }
    }

    async setDone(id) {
        try {
            const response = await fetch(this.targetURL + `${id}/done`, {
                method: "PATCH",
            })
            await response.json();
        } catch (e) {
            throw e;
        }
    }

    async setUnDone(id) {
        try {
            const response = await fetch(this.targetURL + `${id}/undone`, {
                method: "PATCH",
            })
            await response.json();
        } catch (e) {
            throw e;
        }
    }

    async deleteItem(id) {
        try {
            const response = await fetch(this.targetURL + `${id}/delete`, {
                method: "DELETE",
            })
            await response.json();
        } catch (e) {
            throw e;
        }
    }

    async clearAll(array) {
        try {
            const response = await fetch(this.targetURL + `delete_all_items`, {
                method: "DELETE",
            })
            await response.json();
        } catch (e) {
            throw e;
        }
    }
}

export default RemoteItemManager;

