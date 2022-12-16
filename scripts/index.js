; (() => {
    window.addEventListener('DOMContentLoaded', async () => {
        var app = new App(window.config);
        window.app = app;
        await app.initializeAsync();
    });
})();