/*
Dyma V., KNIT16-A
 */
// Task 1, Morse to human language
let lib = {
    "A": ".-",    "B": "-...",  "C": "-.-.",  "D": "-..",
    "E": ".",     "F": "..-.",  "G": "--.",   "H": "....",
    "I": "..",    "J": ".---",  "K": "-.-",   "L": ".-..",
    "M": "--",    "N": "-.",    "O": "---",   "P": ".--.",
    "Q": "--.-",  "R": ".-.",   "S": "...",   "T": "-",
    "U": "..-",   "V": "...-",  "W": ".--",   "X": "-..-",
    "Y": "-.--",  "Z": "--..",  " ": " ",

    "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....",
    "6": "-....", "7": "--...", "8": "---..", "9": "----.", "0": "-----",

    ".": ".-.-.-", ",": "--..--", "?": "..--..",  "'": ".----.",
    "/": "-..-.",  "(": "-.--.",  ")": "-.--.-",  "&": ".-...",
    ":": "---...", ";": "-.-.-.", "=": "-...-",   "+": ".-.-.",
    "-": "-....-", "_": "..--.-", "\"": ".-..-.", "$": "...-..-",
    "!": "-.-.--", "@": ".--.-."
};

/**
 * @return {string}
 */
function MorseToHuman(someString) {
    let result = [];
    let stringArr = someString.split("\\");
    for(let i in stringArr) {
        for (let key in lib) {
            if(lib.hasOwnProperty(key)) {
                if (lib[key] === stringArr[i]) {
                    result.push(key);
                } else {
                    return "Error: unknown code '" + stringArr[i] + "'";
                }
            } else {
                return "Error: unknown error";
            }
        }
    }
    return result.join('');
}

let STRING = prompt("Введит код Морзе: ");

alert(MorseToHuman(STRING));

// Task 2, check object
function isEmpty(obj) {
    return Object.getOwnPropertyNames(obj).length === 0;
}

alert(isEmpty(new Object({})));
