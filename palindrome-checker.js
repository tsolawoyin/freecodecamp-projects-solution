const palindrome = (str) => {
    let newStr = str.replace(/[^a-z0-9]/gi, "").toLowerCase();
    return newStr == newStr.split("").reverse().join("")
}

palindrome("eye");