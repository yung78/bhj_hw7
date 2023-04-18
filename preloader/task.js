const xhr = new XMLHttpRequest();
const items = document.querySelector("#items");
let saveContent = [];

xhr.addEventListener("readystatechange", () => {
    window.addEventListener("load", () => {
        let loadItem = JSON.parse(localStorage.getItem("toLoad")) || [];
        
        loadPreviusContent(loadItem);
    });

    if (xhr.readyState == 4) {
        document.querySelector("#loader").className = "loader";
        items.innerHTML = "";
        
        createContent(JSON.parse(xhr.responseText));
    };
});

xhr.open("GET", "https://students.netoservices.ru/nestjs-backend/slow-get-courses");
xhr.send();

function createContent(response) {
    let data = [];
    let div = document.createElement("div");
    div.innerHTML = "<h3>Новый курс</h3>";
    items.appendChild(div);

    for (let key in response.response.Valute) {
        data.push(response.response.Valute[key]);
    };
    
    for (let el of data) {
        saveContent.push({"CharCode": el.CharCode, "Value": el.Value});
        let div1 = document.createElement("div");
        div1.className = "item";
        div1.innerHTML += `
        <div class="item__code">
            ${el.CharCode}
        </div>
        <div class="item__value">
            ${el.Value}
        </div>
        <div class="item__currency">
            руб.
        </div>
        `;

        items.appendChild(div1);
    };

    dataSave();
};

function dataSave() {
    let toLoad = JSON.stringify(saveContent);
    localStorage.setItem("toLoad", toLoad);
};

function loadPreviusContent(toLoad) {
    let div = document.createElement("div");
    div.innerHTML = "<h3>Старый курс</h3>";
    items.appendChild(div);

    for (let el of toLoad) {
        saveContent.push({"CharCode": el.CharCode, "Value": el.Value});
        let div1 = document.createElement("div");
        div1.className = "item";
        div1.innerHTML += `
        <div class="item__code">
            ${el.CharCode}
        </div>
        <div class="item__value">
            ${el.Value}
        </div>
        <div class="item__currency">
            руб.
        </div>
        `;

        items.appendChild(div1);
    };
};
