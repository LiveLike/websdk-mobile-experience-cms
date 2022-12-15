class LiveLikeApi {

    constructor(){
        this.utils = new Utils();
    }
    createProgramAsync = async (title) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${producerToken}`);
        const response = await fetch(`${baseUrl}/programs/`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                client_id: clientId,
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
        headers.append("Authorization", `Bearer ${producerToken}`);
        const response = await fetch(`${baseUrl}/leaderboards/`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                client_id: clientId,
                name: name,
                reward_item_id: rewardItemId
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
        headers.append("Authorization", `Bearer ${producerToken}`);
        const response = await fetch(`${baseUrl}/programs/${programId}/leaderboards/${leaderboardId}/`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify({})
        });
        if (response.ok) {
            return response;
        }
        console.warn("unable to link leaderboard with program", response);
    };

    linkRewardTableWithProgramAsync = async ({ programId, rewardTableId }) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${producerToken}`);
        const response = await fetch(`${baseUrl}/programs/${programId}/reward-tables/${rewardTableId}/`, {
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
        headers.append("Authorization", `Bearer ${producerToken}`);
        const response = await fetch(`${baseUrl}/programs/${programId}/start/`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({})
        });

        if (response.ok) {
            return response.json();
        }
        console.log("unable to start program", response);
    };
}
