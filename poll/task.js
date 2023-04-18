const xhr = new XMLHttpRequest();
const title = document.querySelector("#poll__title");
const answers = document.querySelector("#poll__answers");

xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
        createContent(JSON.parse(xhr.responseText));
    };
});

xhr.open("GET", "https://students.netoservices.ru/nestjs-backend/poll");
xhr.send();

function createContent(response) {
    title.innerHTML = response.data.title;

    for (let el of response.data.answers) {
        let btn = document.createElement("button");
        btn.className = "poll__answer";
        btn.textContent = el;
        answers.appendChild(btn);
    };

    let btns = document.getElementsByClassName("poll__answer");
        
    for (let i = 0; i<btns.length; i++) {
        btns[i].addEventListener("click", () => {
            let answerId = i;
            confirm("Спасибо, ваш голос засчитан!");
            results (response.id, answerId);
        });
    };
};


function results(id, answerId) {
    const xhr2 = new XMLHttpRequest();
    
    xhr2.open( 'POST', 'https://students.netoservices.ru/nestjs-backend/poll' );
    xhr2.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
    xhr2.send( `vote=${id}&answer=${answerId}` );
    xhr2.addEventListener("readystatechange", () => {
        if (xhr2.readyState == 4) {
            answers.innerHTML = ""
            let res = JSON.parse(xhr2.responseText).stat;
            let sum = 0; 

            for (let el of res) {
                sum += el.votes;
            };

            for (let el of res) {
                let div = document.createElement("div");
                div.textContent = `${el.answer}: ${(el.votes/sum*100).toFixed(2)}%`;
                answers.appendChild(div);
            };
        };
    });
};