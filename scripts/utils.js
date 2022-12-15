class Utils {
    generateQrCode = ({ link, elementId }) => {
        const qrCode = new QRCode(document.getElementById(elementId), {
            width: 300,
            height: 300
        });

        qrCode.makeCode(link);
    };

    guid = () => {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
}

downloadURI = (uri, name) => {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}
