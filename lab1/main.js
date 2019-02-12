// Dyma V.S., KNIT16-A
// Task 1
let seconds = 234245645335;
let sec_in_hour = 3600;
console.log("Секунд прошло с последнего полного часа: ", seconds % sec_in_hour);

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
