// Dyma V.S., KNIT16-A
// Task 1
String.prototype.toHHMMSS = function () {
    let minutes_in_hour = 60;
    let seconds_in_minute = 60;
    let sec_num = parseInt(this, 10);
    let hours   = Math.floor(sec_num / (minutes_in_hour * seconds_in_minute));
    let minutes = Math.floor((sec_num - (hours * (minutes_in_hour * seconds_in_minute))) / seconds_in_minute);
    let seconds = sec_num - (hours * (minutes_in_hour * seconds_in_minute)) - (minutes * minutes_in_hour);
    // // if (hours   < 10) {hours   = "0"+hours;}
    // hours < 10 ? hours = "0"+hours : "";
    // // if (minutes < 10) {minutes = "0"+minutes;}
    // minutes < 10 ? minutes = "0"+minutes : "";
    // // if (seconds < 10) {seconds = "0"+seconds;}
    // seconds < 10 ? seconds = "0"+seconds : "";
    return (hours < 10 ? "0"+hours : hours)
        +':'+ (minutes < 10 ? "0"+minutes : minutes)
        +':'+ (seconds < 10 ? "0"+seconds : seconds);
};
let given_seconds = '234245645335';
console.log("Время: ", given_seconds.toHHMMSS());

// Task 2
let text = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, at.";
let letter = "a";
let array = [];
for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) === letter) {
        array.push(i);
    }
}
console.log("Массив индексов: ", array);
