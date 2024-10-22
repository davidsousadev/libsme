export function closeNotification() {
    document.getElementById("box-notification").style.display = "none";
}

setTimeout(() => {
    document.getElementById("notification").style.display = "none";
}, 5000);