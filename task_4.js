function binarySearch(value, list) {
    let first = 0;              //ліва крайня точка
    let last = list.length ;  //права
    let position = -1;
    let found = false;
    let middle;
    while (found === false && first <= last) {
        middle = Math.floor((first + last)/2);
        if (list[middle] == value) {
            found = true;
            position = middle-1;
        } else if (list[middle] > value) {  //якщо в нижній половині
            last = middle+1;
        } else {  //у верхній половині
            first = middle;
        }
    }
    return position;
}
console.log(binarySearch(10,[1,2,3,4,5,6,7,8,9,10]));