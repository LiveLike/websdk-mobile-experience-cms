; (() => {
    window.addEventListener('DOMContentLoaded', async () => {
        window.config = {};
        var app = new App(window.config);
        window.app = app;
        await app.initializeAsync();
    });
})();