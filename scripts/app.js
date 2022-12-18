class App {

    constructor() {
        this.api = new LiveLikeApi();
        this.utils = new Utils();
    }

    getCustomDataFromConfig() {
        var colors = {};

        getConfig().experienceConfig.colorsList.forEach(colorConfig => {
            colors[colorConfig.key] = colorConfig.value;
        });

        return {
            style: {
                smallHeader: getConfig().experienceConfig.headerBannerImageUrl,
                loginHeader: getConfig().experienceConfig.loginBannerImageUrl,
                font: getConfig().experienceConfig.fontFileUrl,
                colors: colors
            }
        };
    }

    async createEnvironmentAsync({ programTitle, leaderboardName }) {
        const program = await this.api.createProgramAsync(programTitle);
        const leaderboard = await this.api.createLeaderboardAsync(leaderboardName);
        const linkLeaderboardWithProgramResponse = this.api.linkLeaderboardWithProgramAsync({ programId: program.id, leaderboardId: leaderboard.id });
        console.debug(linkLeaderboardWithProgramResponse);
        const linkRewardTableWithProgramResponse = await this.api.linkRewardTableWithProgramAsync({ programId: program.id });
        console.debug(linkRewardTableWithProgramResponse);
        const startProgramResponse = await this.api.startProgramAsync({ programId: program.id });
        console.debug(startProgramResponse);
        const updateChatroomResponse = await this.api.updateChatroomAsync({ chatroomId: program.default_chat_room.id, customData: this.getCustomDataFromConfig() });
        console.debug(updateChatroomResponse);

        return {
            programId: program.id,
            leaderboardId: leaderboard.id
        };
    };

    async handleCreateEnvironmentButtonAsync(e) {
        e.preventDefault();
        e.stopPropagation();

        const experienceName = `${document.querySelector("#experience-name-input").value} (${this.utils.guid()})`;

        const environment = await this.createEnvironmentAsync({ programTitle: experienceName, leaderboardName: experienceName });

        const experienceLinkElement = document.querySelector("#experience-link");
        const experienceLink = `https://livelike.github.io/websdk-mobile-experience/?program_id=${environment.programId}`;
        experienceLinkElement.setAttribute("href", experienceLink);
        experienceLinkElement.innerHTML = "Experience Link";

        const cmsLinkElement = document.querySelector("#cms-link");
        cmsLinkElement.setAttribute("href", `https://cf-blast.livelikecdn.com/producer/applications/${getConfig().clientId}/programs/${environment.programId}`);
        cmsLinkElement.innerHTML = "CMS Link";

        this.utils.generateQrCode({ link: experienceLink, elementId: "qrcode" });
    };

    handleValueChange(event, configItemName) {
        getConfig().experienceConfig[configItemName] = event.target.value;
    }

    handleChangeColor(colorKey) {
        const colorConfig = getConfig().experienceConfig.colorsList.find(x => x.key === colorKey);
        colorConfig.value = document.querySelector(`#${colorConfig.key}-color-input`).value;
        document.querySelector(`#${colorConfig.key}-color-demo-field`).style.backgroundColor = colorConfig.value;
    }

    handleFileUpload(fieldReferenceName, fileInputId) {
        console.log(fieldReferenceName, fileInputId)
        const fileInput = document.querySelector(`#${fileInputId}`)
        console.log(fileInput);
        console.log(fileInput.files[0]);
    }

    loadDefaultValues() {
        // visuals section - load default 
        // These are set when uploading files
        //document.querySelector("#login-banner-url-input").value = getConfig().experienceConfig.loginBannerImageUrl;
        //document.querySelector("#header-banner-url-input").value = getConfig().experienceConfig.headerBannerImageUrl;
        //document.querySelector("#font-file-url-input").value = getConfig().experienceConfig.fontFileUrl;

        const colorsForm = document.querySelector(".form-colors");
        colorsForm.innerHTML = "";
        getConfig().experienceConfig.colorsList.forEach(colorConfig => {
            colorsForm.innerHTML += `
<div class="form-group">
    <label for="${colorConfig.key}-color-input">${colorConfig.display}</label>
    <input type="color" class="form-control form-control-color" id="${colorConfig.key}-color-input" value="${colorConfig.value}" >
</div>
<br />`;
        });
    }

    initializeAsync() {
        document.querySelector("#create-environment-button").addEventListener("click", this.handleCreateEnvironmentButtonAsync);
        this.loadDefaultValues();
        console.debug("App initialized...");
    };
}