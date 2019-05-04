function forForm() {
    for (let elem of document.querySelectorAll("form > input")) {
        console.log(elem.value);
    }
}

document.getElementsByTagName("form")[0].addEventListener("mouseleave", forForm);