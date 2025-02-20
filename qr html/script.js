document.getElementById("generate-btn").addEventListener("click", generateQR);
document.getElementById("download-btn").addEventListener("click", downloadQR);

function generateQR() {
    let url = document.getElementById("url-input").value;
    if (url.trim() === "") {
        alert("Please enter a valid URL!");
        return;
    }

    let qrContainer = document.getElementById("qr-container");
    qrContainer.innerHTML = ""; // Clear previous QR code

    let img = document.createElement("img");
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
    img.id = "qr-image";
    
    qrContainer.appendChild(img);
    document.getElementById("download-btn").style.display = "block";
}

function downloadQR() {
    let qrImage = document.getElementById("qr-image");

    if (!qrImage) {
        alert("Generate a QR code first!");
        return;
    }

    fetch(qrImage.src)
        .then(response => response.blob())
        .then(blob => {
            let link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "qrcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch(error => console.error("Error downloading QR code:", error));
}
