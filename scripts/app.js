class App {

    constructor() {
        this.api = new LiveLikeApi();
        this.utils = new Utils();
    }

    createEnvironmentAsync = async ({ programTitle, leaderboardName, rewardTableId }) => {
        const program = await this.api.createProgramAsync(programTitle);
        const leaderboard = await this.api.createLeaderboardAsync(leaderboardName);
        const linkLeaderboardWithProgramResponse = this.api.linkLeaderboardWithProgramAsync({ programId: program.id, leaderboardId: leaderboard.id });
        console.debug(linkLeaderboardWithProgramResponse);
        const linkRewardTableWithProgramResponse = await this.api.linkRewardTableWithProgramAsync({ programId: program.id, rewardTableId: rewardTableId });
        console.debug(linkRewardTableWithProgramResponse);
        const startProgramResponse = await this.api.startProgramAsync({ programId: program.id });
        console.debug(startProgramResponse);

        return {
            programId: program.id,
            leaderboardId: leaderboard.id
        };
    };

    handleCreateEnvironmentButtonAsync = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const profileType = document.querySelector("#profile-type-select").value;
        const experienceName = `${document.querySelector("#experience-name-input").value} (${this.utils.guid()})`;

        const environment = await this.createEnvironmentAsync({ programTitle: experienceName, leaderboardName: experienceName, rewardTableId });

        const experienceLinkElement = document.querySelector("#experience-link");
        const experienceLink = `https://livelike.github.io/psg${profileType == "email-and-nickname" ? "" : "-2"}-experience?program_id=${environment.programId}`;
        experienceLinkElement.setAttribute("href", experienceLink);
        experienceLinkElement.innerHTML = "Experience Link";

        const cmsLinkElement = document.querySelector("#cms-link");
        cmsLinkElement.setAttribute("href", `https://cf-blast.livelikecdn.com/producer/applications/${clientId}/programs/${environment.programId}`);
        cmsLinkElement.innerHTML = "CMS Link";

        this.utils.generateQrCode({ link: experienceLink, elementId: "qrcode" });
    };

    initializeAsync = () => {
        document.querySelector("#create-environment-button").addEventListener("click", this.handleCreateEnvironmentButtonAsync);
        console.debug("App initialized...");
    };   
}