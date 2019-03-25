document.getElementById("submit1").addEventListener("click", submit1, false);

function submit1() {
    for (let i=1;;i++) {
        try {
            console.log(document.getElementById("input"+i).value);
        } catch (err) {
            console.log("Done!");
            break;
        }
    }
}