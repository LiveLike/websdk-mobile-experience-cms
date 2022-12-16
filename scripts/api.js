class LiveLikeApi {

    constructor(config) {
        this.config = config;
        this.utils = new Utils();
    }

    createProgramAsync = async (title) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${this.config.producerToken}`);
        const response = await fetch(`${this.config.baseUrl}/programs/`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                client_id: this.config.clientId,
                title: title,
                scheduled_at: new Date(Date.now())
            })
        });

        if (response.ok) {
            return response.json();
        }
        console.warn("unable to create program", response);
    };

    createLeaderboardAsync = async (name) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${this.config.producerToken}`);
        const response = await fetch(`${this.config.baseUrl}/leaderboards/`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                client_id: this.config.clientId,
                name: name,
                reward_item_id: this.config.rewardItemId
            })
        });

        if (response.ok) {
            return response.json();
        }
        console.warn("unable to create leaderboard", response);
    };

    linkLeaderboardWithProgramAsync = async ({ programId, leaderboardId }) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${this.config.producerToken}`);
        const response = await fetch(`${this.config.baseUrl}/programs/${programId}/leaderboards/${leaderboardId}/`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify({})
        });
        if (response.ok) {
            return response;
        }
        console.warn("unable to link leaderboard with program", response);
    };

    linkRewardTableWithProgramAsync = async ({ programId }) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${this.config.producerToken}`);
        const response = await fetch(`${this.config.baseUrl}/programs/${programId}/reward-tables/${this.config.rewardTableId}/`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify({})
        });

        if (response.ok) {
            return response;
        }
        console.warn("unable to link reward table with program", response);
    };

    startProgramAsync = async ({ programId }) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${this.config.producerToken}`);
        const response = await fetch(`${this.config.baseUrl}/programs/${programId}/start/`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({})
        });

        if (response.ok) {
            return response.json();
        }
        console.log("unable to start program", response);
    };

    updateChatroomAsync = async ({ chatroomId, customData }) => {
        console.log(chatroomId, customData);
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${this.config.producerToken}`);

        const customDataString = JSON.stringify(customData);
        const response = await fetch(`${this.config.baseUrl}/chat-rooms/${chatroomId}/`, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify({
                custom_data: customDataString
            })
        });

        if (response.ok) {
            return response.json();
        }
        console.log("unable to update chatroom", response);
    }
}
