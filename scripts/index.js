; (() => {
    window.addEventListener('DOMContentLoaded', async () => {
        window.config = config;
        var app = new App(window.config);
        window.app = app;
        await app.initializeAsync();
    });
})();