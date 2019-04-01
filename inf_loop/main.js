try {
    let time = Date.now();
    while (true) {
        if (Date.now() - time < 3) {
            console.log(Math.random());
            time = Date.now();
        } else {
            throw new Error("Infinite loop I guess!");
        }
    }
} catch (e) {
    console.log(e);
}
