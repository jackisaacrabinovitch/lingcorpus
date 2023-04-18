function asStrNumArr(input){
    if (typeof input === "string" || typeof input === "number"){
        return [input];
    }
    if(! Array.isArray(input)){return false}
    for (let i = 0; i < input.length; i++){
        if ((! (typeof input[i] === "string")) && (! (typeof input[i] === "number"))){
            return false;
        }
    }
    return input;
}
function isStrNumArr(input){
    if (typeof input === "string" || typeof input === "number"){
        return true;
    }
    if(! Array.isArray(input)){return false}
    for (let i = 0; i < input.length; i++){
        if ((! (typeof input[i] === "string")) && (! (typeof input[i] === "number"))){
            return false;
        }
    }
    return true;
}
function reflist_compatible(ref1,ref2){
    if (!(ref1.constructor.name === "Reflist")){
        return false;
    }
    if (!(ref2.constructor.name === "Reflist")){
        return false;
    }
    if (ref1.d !== ref2.d){
        return false;
    }
    return true
}

class Reflist{
    constructor(reflist_content){
        if (isStrNumArr(reflist_content)){
            this.d = ""
            this.i = asStrNumArr(reflist_content)
        } else if (Object.keys(reflist_content).length === 2 && Object.keys(reflist_content).includes("d") && Object.keys(reflist_content).includes("i")){
            if (typeof reflist_content.d === "string"){
                this.d = reflist_content.d
            } else {
                console.error(`Cannot Parse as Dictionary Name:`,reflist_content.d)
            }
            if (isStrNumArr(reflist_content.i)){
                this.i = asStrNumArr(reflist_content.i)
            } else {
                console.error(`Cannot Parse as Index Array:`, reflist_content.i)
            }
        } else {
            console.error(`Cannot Parse as Reflist:`,reflist_content)
        }
    }
    equals(reflist){
        if (!reflist_compatible(this,reflist)){
            return false;
        }
        if (this.i.length !== reflist.i.length){
            return false;
        }
        for (let index = 0; index < this.i.length; index++){
            if (this.i[index] !== reflist.i[index]){
                return false;
            }
        }
        return true;
    }
    containsome(reflist){
        if (!reflist_compatible(this,reflist)){
            console.log("hi")
            return false;
        }
        return reflist.i.some((index)=>{
            console.log("hi2")
            return this.i.includes(index)
        })
    }
    containall(reflist){
        if (!reflist_compatible(this,reflist)){
            return false;
        }
        return reflist.i.every((index)=>{
            return this.i.includes(index)
        })
    }
    spellout(corpus){
        if (!(corpus.constructor.name === "Corpus")){
            console.error(`Cannot Parse Corpus:`,corpus)
        } else if (this.d === ""){
            return this.i
        } else if (Object.keys(corpus.dicts).includes(this.d)){
            let ret = []
            let dictionaryname = this.d
            this.i.forEach(id => {
                if (typeof id === "number"){
                    ret.push(corpus.dicts[dictionaryname][id])
                } else if (typeof id === "string"){
                    if (! (corpus.dicts[d].find(function(ent){return ent.id === id}) === undefined)){
                        ret.push(corpus.dicts[d].find(function(ent){return ent.id === id}))
                    } else{
                        console.error(`Id "${id}" not found within ${dictionaryname}`)
                    }
                } else{
                console.error(`Not a possible reference value:`, id)
                }
            });
        return ret
        } else {
            console.error(`Dictionary name "${this.d}" is not a string or number`)
        }
    }
    displaytable(corpus){
        let rows = []
        let columns = []
        this.spellout(corpus).forEach(entry => {
            rows.push(entry.display(corpus))
            Object.keys(entry.display(corpus)).forEach(property => {
                if (!columns.includes(property)){
                    columns.push(property)
                }
            });
        });
        let res = [columns]
        rows.forEach(row => {
            let newrow = []
            columns.forEach(column => {
                newrow.push(row[column])
            });
            res.push(newrow)
        });

        let ret = {}
        ret.download = res.map(function(x){return x.join(`\t`)}).join(`\n`)

        let header = res[0].map(function(cell){return `<th>${cell}</th>`}).join("")
        header = `<thead><tr>${header}</tr></thead>`
        let body = res.slice(1).map(function(row){
            let rowline = row.map(function(cell){
                return `<td>${cell}</td>`
            }).join(``)
            return`<tr>${rowline}</tr>`
        }).join("")
        body = `<tbody>${body}</tbody>`
        ret.display = `<table class="searchable sortable">${header}${body}</table>`
        return ret
    }
}

class Entry{
    constructor(object_content){
        Object.keys(object_content).forEach(property => {
            this[property] = new Reflist(object_content[property])
        });
    }
    applykey(key){
        if (!(key.constructor.name === "Key")){
            console.error(`Not a valid Key:`,key)
            return;
        }
        return key.func(this)
    }
    display(corpus){
        return displayentry(this,corpus)
    }
}

// $roots keeps previous parent properties as they will be added as a prefix for each prop.
// $sep is just a preference if you want to seperate nested paths other than dot.
const flatten = (obj, roots = [], sep = '_') => Object
  // find props of given object
  .keys(obj)
  // return an object by iterating props
  .reduce((memo, prop) => Object.assign(
    // create a new object
    {},
    // include previously returned object
    memo,
    Object.prototype.toString.call(obj[prop]) === '[object Object]'
      // keep working if value is an object
      ? flatten(obj[prop], roots.concat([prop]), sep)
      // include current prop and value and prefix prop with the roots
      : {[roots.concat([prop]).join(sep)]: obj[prop]}
  ), {})

function displayreflist(reflist,corpus){
    let delimiter = corpus.delimiters[reflist.d]
    if (reflist.d === ""){
        return reflist.i.join(corpus.delimiters[""])
    } else {
        return displayarray(reflist.spellout(corpus),corpus,delimiter)
    }
}
function displayentry(entry,corpus){
    let res = {}
    Object.keys(entry).forEach(property => {
        res[property] = displayreflist(entry[property],corpus)
    });
    return flatten(res)
}
function displayarray(entrylist,corpus,delimiter){
    let allentries = []
    let allproperties = []
    let res = {}
    entrylist.forEach(entry => {
        let newent = displayentry(entry,corpus)
        Object.keys(newent).forEach(property => {
            if (!allproperties.includes(property)){
                allproperties.push(property)
            }
        });
        allentries.push(newent)
    });
    allproperties.forEach(property => {
        res[property] = []
        allentries.forEach(entry => {
            if (entry[property] == undefined){
                res[property].push("")
            } else {
                res[property].push(entry[property])
            }
        });
        res[property] = res[property].join(delimiter)
    });
    return res
}


class Key{
    constructor(keyname, keyfunction=null){
        this.keyname = keyname
        if (keyfunction == null){
            this.func = function(entity){
                return entity[keyname]
            }
        } else{
            this.func = keyfunction
        }
    }
    dict(corpus){
        if (corpus.constructor.name !== "Corpus"){
            console.error(`Corpus not recognized:`, corpus)
        } else if (!Object.keys(corpus.dicts).includes(this.keyname)){
            console.error(`Dictionary "${this.keyname}" not found`)
        } else if (this.keyfunction == null){
            let range = corpus.dicts[this.keyname].length
            return new Reflist({d:this.keyname,i:[...Array(range).keys()]})
        } else {
            console.error(`Cannot apply DICT to complex key`)
        }
    }
}
class Corpus{
    constructor(string){
        let corpusjson = JSON.parse(string)
        this.dicts = {}
        this.delimiters = {"":", "}
        Object.keys(corpusjson).forEach(dictionary => {
            this.delimiters[dictionary] = ", "
            this.dicts[dictionary] = []
            corpusjson[dictionary].forEach(entry => {
                this.dicts[dictionary].push(new Entry(entry))
            });
        });
    }
    changedelim(dict,delim){
        this.delimiters[dict] = delim
    }
    copy(){
        let k = new Corpus(`{}`)
        k.dicts = { ... this.dicts}
        k.delimiters = { ... this.delimiters}
        return k
    }
}
class Condition{
    constructor(func){
        this.func = func // function with key and entry args
        this.as_filter = function(key){
            return new Filter(key,this)
        }
    }
}
class Filter{
    constructor(key=null,cond=null){
        this.key = key
        this.cond = cond
        if(this.key != null && this.cond != null){
            this.func = function(entry){
                return cond.func(key,entry)
            }
        } else{
            this.func = null
        }
    }
    apply(refl,corpus){
        let ret = {
            d:refl.d,
            i:[]
        }
        let thefunction = this.func
        refl.spellout(corpus).forEach(function(entry,entryid){
            if (thefunction(entry)){
                ret.i.push(refl.i[entryid])
            }
        });
        return new Reflist(ret)
    }
    andfunc(fil1,fil2){
        this.func = function(entry){
            return fil1.func(entry) && fil2.func(entry)
        }
    }
    orfunc(fil1,fil2){
        this.func = function(entry){
            return fil1.func(entry) || fil2.func(entry)
        }
    }
}
class Command{
    constructor(content){
        this.content = content
    }
    execute(){
        STATE = this.content(STATE)
    }
}



