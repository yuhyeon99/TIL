type Words = {
    [key:string] : string
}
class Dict{
    private words: Words
    constructor(){
        this.words = {}
    }

    add(word: Word){
        if(this.words[word.term] === undefined){
            this.words[word.term] = word.def;
        }
    }

    def(term:string){
        return this.words[term];
    }

    modify(word:Words){
        if(this.words[word.term] !== undefined){
            this.words[word.term] = word.def;
        }
    }

    delete(term:string){
        delete this.words[term];
    }
}

class Word{
    constructor(
        // readonly를 통해 public 키워드임에도 읽기만 가능하게끔
        public readonly term:string,
        public readonly def :string
    ){ }
}

const kimchi = new Word("kimchi","한국의 음식")

const dict = new Dict();

dict.add(kimchi);
dict.def("kimchi");