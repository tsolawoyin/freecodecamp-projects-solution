
const convertToRoman = num => {
    let answer = "";

    let roman = new Map();

    roman.set("M", 1000);
    roman.set("CM", 900);
    roman.set("D", 500);
    roman.set("CD", 400);
    roman.set("C", 100);
    roman.set("XC", 90);
    roman.set("L", 50);
    roman.set("XL", 40);
    roman.set("X", 10);
    roman.set("IX", 9);
    roman.set("V", 5);
    roman.set("IV", 4);
    roman.set("I", 1);

    for(let [x,y] of roman) {
        if(num >= y) {
            let n = Math.floor(num / y);
            answer += x.repeat(n);
            num -= n * y;
        }
    }
    return answer
}


convertToRoman(36);