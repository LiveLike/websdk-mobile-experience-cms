; (() => {
    window.addEventListener('DOMContentLoaded', async () => {
        window.config = config;
        var app = new App();
        window.app = app;
        await app.initializeAsync();
    });
})();