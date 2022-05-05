const textarea = document.getElementById('text-content');

document.getElementById('save').addEventListener('click', () => window.file.save(textarea.value));
document.getElementById('load').addEventListener('click', () => {
    window.file.read()
        .then(data => textarea.value = data)
    ;
});
