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

    handleChangeColor = (colorKey) => {
        const colorConfig = config.experienceConfig.colorsList.find(x => x.key === colorKey);
        colorConfig.value = document.querySelector(`#${colorConfig.key}-color-input`).value;
        document.querySelector("#PageBackground-color-demo-field").style.backgroundColor = colorConfig.value;
    }

    loadDefaultValues = () => {
        // visuals section - load default 
        document.querySelector("#login-banner-url-input").value = config.experienceConfig.loginBannerImageUrlDefaultValue;
        document.querySelector("#header-banner-url-input").value = config.experienceConfig.headerBannerImageUrlDefaultValue;
        document.querySelector("#font-file-url-input").value = config.experienceConfig.fontFileUrlDefaultValue;

        const colorsForm = document.querySelector(".form-colors");
        colorsForm.innerHTML = "";
        config.experienceConfig.colorsList.forEach(colorConfig => {
            colorsForm.innerHTML += `
<div class="color-section">
    <div class="color-description">
        <label for="${colorConfig.key}-color-input">${colorConfig.display}</label>
        <div class="color-demo-field" id="${colorConfig.key}-color-demo-field" style="background-color: ${colorConfig.defaultValue}">
        </div>
    </div>    
    <br />
    <input type="text" class="form-control color-input" id="${colorConfig.key}-color-input" value="${colorConfig.defaultValue}" onkeydown="app.handleChangeColor('${colorConfig.key}')" onkeyup="app.handleChangeColor('${colorConfig.key}')" placeholder="">
</div>
<br />`;
        });
    }

    initializeAsync = () => {
        document.querySelector("#create-environment-button").addEventListener("click", this.handleCreateEnvironmentButtonAsync);
        this.loadDefaultValues();
        console.debug("App initialized...");
    };
}