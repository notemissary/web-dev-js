try {
    let current, current2;
    let flag = true;
    let time = Number.MAX_SAFE_INTEGER;
    while (true) {
        if (flag) {
            time = Date.now();
        }
        console.log(Math.random());
        if (!current)
            current = Date.now();
        else {
            current2 = Date.now();
            if (current2 - current > time) {
                throw new Error("Infinite loop, execution stopped")
            } else {
                current = current2;
            }
        }
        if (flag) {
            time = 10 * (Date.now() - time);
            flag = false;
        }
    }
} catch (e) {
    console.log(e);
}
