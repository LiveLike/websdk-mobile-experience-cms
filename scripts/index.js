; (() => {
    window.addEventListener('DOMContentLoaded', async () => {
        var app = new App();
        window.app = app;
        await app.initializeAsync();
    });
})();