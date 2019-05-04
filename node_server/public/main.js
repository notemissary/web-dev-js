let XML;
let indexes = [];

function loadDoc() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            XML = this.responseXML;
            firstTime();
        }
    };
    xhttp.open("GET", "table.xml", true);
    xhttp.send();
}

function showEverything() {
    let divv = document.getElementById("divv");
    let table = document.getElementById("main_table");
    while (divv.firstChild) {
        divv.removeChild(divv.firstChild);
    }
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    if (indexes.length === 1) {
        anketa(indexes[0]);
    } else if (indexes.length > 1) {
        createBaseTable();
    }
}

function firstTime() {
    let products = XML.getElementsByTagName("product");
    let content = document.getElementById("content");
    for (let i=0; i<products.length; i++) {
        let label = document.createElement("label");
        let input = document.createElement("input");
        input.type = "checkbox";
        input.id = i.toString();
        input.name = "input";
        input.addEventListener("change", function() {
            if (this.checked) {
                indexes.push(this.id);
            } else {
                indexes.splice(indexes.indexOf(this.id), 1);
            }
            showEverything();
        });
        label.innerText = "Product".concat(i+1);
        label.appendChild(input);
        content.appendChild(label);
    }
}

function anketa(id) {
    let div = document.getElementById("divv");
    let form = document.createElement("form");
    let product = XML.getElementsByTagName("product")[id].children;
    for (let i=0; i<product.length; i++) {
        let elem;
        if (product[i].tagName === "image") {
            elem = document.createElement("img");
            elem.alt = product[i].innerHTML;
            elem.src = "img/" + product[i].innerHTML;
        } else if (product[i].tagName === "producer") {
            elem = document.createElement("label");
            elem.innerText += product[i].tagName + ": " + product[i].getElementsByTagName("p_name")[0].innerHTML + ", " + product[i].getElementsByTagName("p_type")[0].innerHTML;
        } else {
            elem = document.createElement("label");
            elem.innerText += product[i].tagName + ": " + product[i].innerHTML;
        }
        form.appendChild(elem);
    }
    form.appendChild(document.createElement("br"));
    let button = document.createElement("input");
    button.id = "first";
    button.value = "<<";
    button.type = "button";
    button.addEventListener("click", function() {
        document.getElementById(indexes[0]).checked = false;
        indexes = ["0"];
        document.getElementById(indexes[0]).checked = true;
        showEverything();
    });
    form.appendChild(button);
    button = document.createElement("input");
    button.id = "previous";
    button.value = "<";
    button.type = "button";
    button.addEventListener("click", function() {
        if (indexes[0] !== "0") {
            document.getElementById(indexes[0]).checked = false;
            indexes = [(indexes[0]-1).toString()];
            document.getElementById(indexes[0]).checked = true;
            showEverything();
        }
    });
    form.appendChild(button);
    form.appendChild(document.createTextNode("".concat(+indexes[0]+1)));
    button = document.createElement("input");
    button.id = "next";
    button.value = ">";
    button.type = "button";
    button.addEventListener("click", function() {
        if (+indexes[0] !== XML.getElementsByTagName("product").length-1) {
            document.getElementById(indexes[0]).checked = false;
            indexes = [(+indexes[0]+1).toString()];
            document.getElementById(indexes[0]).checked = true;
            showEverything();
        }
    });
    form.appendChild(button);
    button = document.createElement("input");
    button.id = "last";
    button.value = ">>";
    button.type = "button";
    button.addEventListener("click", function() {
        document.getElementById(indexes[0]).checked = false;
        indexes = [(product.length-1).toString()];
        document.getElementById(indexes[0]).checked = true;
        showEverything();
    });
    form.appendChild(button);
    div.appendChild(form);
}

function createBaseTable() {
    let table = document.getElementById("main_table");
    let products = XML.getElementsByTagName("product");
    let tr = document.createElement("tr");
    let header = products[0].children;
    let th = document.createElement("th");
    let text;
    for (let i=0; i < header.length; i++) {
        th = document.createElement("th");
        text = document.createTextNode(header[i].tagName.slice(0, 1).toUpperCase().concat(header[i].tagName.slice(1)));
        th.appendChild(text);
        tr.appendChild(th);
    }
    table.appendChild(tr);
    for (let i=0; i < products.length; i++) {
        if (indexes.includes(i.toString())) {
            let product = products[i].children;
            tr = document.createElement("tr");
            for (let j = 0; j < product.length; j++) {
                let td = document.createElement("td");
                if (product[j].tagName === "producer") {
                    let producer = product[j].children;
                    let res = "";
                    for (let k = 0; k < producer.length; k++) {
                        res += producer[k].innerHTML + ", "
                    }
                    td.appendChild(document.createTextNode(res))
                } else if (product[j].tagName === "image") {
                    let img = document.createElement("img");
                    img.src = "img/".concat(product[j].innerHTML);
                    img.alt = "";
                    td.appendChild(img);
                } else {
                    td.appendChild(document.createTextNode(product[j].innerHTML));
                }
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
    }
}

loadDoc();
