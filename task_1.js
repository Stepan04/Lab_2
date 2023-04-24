function string_to_array(str) {
    return str.trim().split(" "); //trim - видаляє з кінців небажані символи та пробіли
};                                //split - ділить стрічку на більше стрічок вносить їх в масив і повертає його(розділювачем є пробіл)
console.log(string_to_array("The boy go to school at 6 oclok"));
console.log(string_to_array("The boy go to school at 6 oclok").join());