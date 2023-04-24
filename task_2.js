function search_feed(sentence, word){
    return(`The word(s) "${word}" ${sentence.includes(word) ? 'is' : 'is not'} in the sentence`);
    };
    console.log(search_feed('The boy go to school at 6 oclok','boy go to'));