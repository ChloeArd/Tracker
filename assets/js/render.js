const textarea = document.getElementById('text-content');

document.getElementById('save').addEventListener('click', () => window.file.save(textarea.value));
document.getElementById('load').addEventListener('click', () => {
    window.file.read()
        .then(data => textarea.value = data)
    ;
});

const func = () => {
    console.log("hello");
}

window.menu.onOpenDialogClick(func);

document.getElementById("notification").addEventListener("click", () => {
    const config = {
        title: "Un titre de notification",
        body: "Le contenu de la notification",
        icon: "./assets/images/icon.png"
    }

    window.notification.show(config, () => console.log("hello"));
});
