import { closeNotification } from './notify/v1/notify.js'; 

function notify() {
    if (document.getElementById('box-notification')) return;
    var body = document.body;
    body.innerHTML += `
    <div class="box-notification" id="box-notification">
        <span class="btn-close-notification" id="closeNotificationButton">×</span>
        <p>Texto da notificação</p>
        <div class="progress-bar-notification" id="progressBar"></div>
    </div>`;

    const notification = document.getElementById("box-notification");
    notification.style.display = "flex"; 
    
    document.getElementById('closeNotificationButton').addEventListener('click', () => {
        closeNotification(notification); 
    });
    setTimeout(() => {
        closeNotification(notification); 
    }, 5000);
}
document.getElementById('ativar-notificacao').addEventListener('click', notify);
