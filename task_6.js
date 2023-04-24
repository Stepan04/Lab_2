function bubbleSort(arr) {
    var len = arr.length;
  
    for (var i = 0; i < len ; i++) {
      for(var j = 0 ; j < len - i - 1; j++){ 
      if (arr[j] > arr[j + 1]) {
        
        var temp = arr[j];
        arr[j] = arr[j+1];
        arr[j + 1] = temp;
      }
     }
    }
    return arr;
  }

console.log(bubbleSort([1,9,2,3,7,6,4,5,8]));