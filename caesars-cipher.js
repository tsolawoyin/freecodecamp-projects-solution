const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

class Encrypt {
    static encrypt(word, shift = 13) {
        return word.replace(/\w/gi, (e) => {
            return alphabets[(alphabets.indexOf(e.toUpperCase()) + shift) % alphabets.length];
        })
    }
}

let rot13 = Encrypt.encrypt;

// test cases
console.log(rot13('SERR PBQR PNZC'))

// you can add more test cases here.

rot13("SERR PBQR PNZC");