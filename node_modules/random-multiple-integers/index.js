function RandomInterger() {
    this.create = function(min, max, count){
        let randomIntegerList = []
        for(let i = 0; i < count; i++){
            randomIntegerList.push(Math.floor(Math.random() * (max + 1 - min)) + min)
        }
        return randomIntegerList
    }
}

module.exports = RandomInterger