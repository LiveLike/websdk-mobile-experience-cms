; (() => {
    window.addEventListener('DOMContentLoaded', async () => {
        var app = new App(config);
        window.app = app;
        await app.initializeAsync();
    });
})();