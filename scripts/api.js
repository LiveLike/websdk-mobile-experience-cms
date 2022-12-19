class LiveLikeApi {

    constructor() {
        this.utils = new Utils();
    }

    createProgramAsync = async (title) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${getConfig().producerToken}`);
        const response = await fetch(`${getConfig().baseUrl}/programs/`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                client_id: getConfig().clientId,
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
        headers.append("Authorization", `Bearer ${getConfig().producerToken}`);
        const response = await fetch(`${getConfig().baseUrl}/leaderboards/`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                client_id: getConfig().clientId,
                name: name,
                reward_item_id: getConfig().rewardItemId
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
        headers.append("Authorization", `Bearer ${getConfig().producerToken}`);
        const response = await fetch(`${getConfig().baseUrl}/programs/${programId}/leaderboards/${leaderboardId}/`, {
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
        headers.append("Authorization", `Bearer ${getConfig().producerToken}`);
        const response = await fetch(`${getConfig().baseUrl}/programs/${programId}/reward-tables/${getConfig().rewardTableId}/`, {
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
        headers.append("Authorization", `Bearer ${getConfig().producerToken}`);
        const response = await fetch(`${getConfig().baseUrl}/programs/${programId}/start/`, {
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
        headers.append("Authorization", `Bearer ${getConfig().producerToken}`);

        const customDataString = JSON.stringify(customData);
        const response = await fetch(`${getConfig().baseUrl}/chat-rooms/${chatroomId}/`, {
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

    async uploadMediaAsync(file, description) {
        console.log(`started uploading file ${file.name}`);

        const headers = new Headers();
        headers.append("Authorization", `Bearer ${getConfig().producerToken}`);
        headers.append("Content-Type", "multipart/form-data");

        var data = new FormData()
        data.append('client_id', getConfig().clientId);
        data.append('description', description);
        data.append('file', file);

        const response = await fetch(`${getConfig().baseUrl}/media/`, {
            method: "POST",
            headers: headers,
            body: data
        });

        if (response.ok) {
            console.log(response);
            console.log(`uploaded file ${response.file}`);

            return response.json();
        }

        console.log("unable to upload file", response);
    }
}
