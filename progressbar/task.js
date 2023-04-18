const progress = document.getElementById("progress");
const form = document.getElementById("form");
const xhr = new XMLHttpRequest();

form.onsubmit = (() => {
    const body = new FormData(form);

    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
    xhr.send(body);

    xhr.upload.onprogress = (e) => {
        console.log(e.loaded,"/" , e.total);
        progress.value = e.loaded / e.total;
    };
    
    return false;
});