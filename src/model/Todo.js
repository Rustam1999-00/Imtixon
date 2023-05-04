class Todo{
    isComplite = false
    constructor(id,text,title,date,isComplite = false){
        this.id = id;
        this.text = text;
        this.title = title;
        this.date = date;
        this.isComplite = isComplite;
    }
}
module.exports = Todo;