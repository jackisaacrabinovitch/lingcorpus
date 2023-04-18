class Node{
    constructor(constituents,label,content){
        this.constituents = constituents
        this.label = label
        this.content = content
        this.tokennum = [undefined,undefined]
        if (this.constituents.length > 0){
            this.tokennum = [this.constituents[0].tokennum[0],this.constituents[this.constituents.length-1].tokennum[1]]
        }
    }
    set index(newval){
        this.tokennum = [newval,newval]
    }
}

class Special{
    constructor(name,func){
        this.name = name
        this.func = func
    }
}

function findCorpus(){
    let ret = { ... STATE}["corpus"]
    return ret
}

function isStringReflist(refl){
    return refl.constructor.name =="Reflist" && refl.d === "" && refl.i.length === 1 && typeof refl.i[0] === "string"
}
function isNumReflist(refl){
    return refl.constructor.name =="Reflist" && refl.d === "" && refl.i.length === 1 && typeof refl.i[0] === "number"
}

const Specials = {
    IS: new Special("IS",function(refl){
        return new Condition(function(key,entry){
            if (!Object.keys(entry).includes(key.keyname)){
                return false
            }
            return entry.applykey(key).equals(refl)
        })
    }),
    EXISTS: new Special("EXISTS",new Condition(function(key,entry){
        return Object.keys(entry).includes(key.keyname)
    })),
    DICT: new Special("DICT",function(key){
        let corp = findCorpus()
        return key.dict(corp)
    }),
    WHERE: new Special("WHERE",function(refl,filter){
        let corp = findCorpus()
        return filter.apply(refl,corp)
    }),
    CONTAINS: new Special("CONTAINS",function(refl){
        return new Condition(function(key,entry){
            if (!Object.keys(entry).includes(key.keyname)){
                console.log(`${key.keyname} is not a key`)
                return false
            }
            return entry.applykey(key).containsome(refl)
        })
    }),
    AND: new Special("AND",function(right,left){
        if (right.constructor.name === "Condition" && left.constructor.name === "Condition"){
            return new Condition(function(key,entry){
                return left.func(key,entry) && right.func(key,entry)
            })
        }
        if (right.constructor.name === "Filter" && left.constructor.name === "Filter"){
            let k = new Filter()
            k.andfunc(right,left)
            return k
        }
    }),
    OR: new Special("OR",function(right,left){
        if (right.constructor.name === "Condition" && left.constructor.name === "Condition"){
            return new Condition(function(key,entry){
                return left.func(key,entry) || right.func(key,entry)
            })
        }
        if (right.constructor.name === "Filter" && left.constructor.name === "Filter"){
            let k = new Filter()
            k.orfunc(right,left)
            return k
        }
    }),
    "(": new Special("(",null),
    ")": new Special(")",null),
    DELIMITER: new Special("DELIMITER",function(key,refl){
        return new Command(function(x){
            let ret = {... x}
            ret.corpus.changedelim(key.keyname,refl.i[0])
            return ret
        })
    }),
    TABLE: new Special("TABLE",function(refl){
        return new Command(function(x){
            let ret = {... x};
            let res = refl.displaytable(ret.corpus);
            ret.download = res.download
            ret.display = res.display
            return ret
        })
    })
}

const readfunction = [
    {
        name:"SPECIAL+REFLIST=CONDITION",
        args:2,
        find:function(x){
            return x[0].label === "SPECIAL" && ["IS","CONTAINS"].includes(x[0].content.name) && x[1].label === "REFLIST"
        },
        merge:function(x){
            return new Node(x,
                "CONDITION",
                x[0].content.func(x[1].content))
        }
    },
    {
        name:"SPECIAL+KEY=REFLIST",
        args:2,
        find:function(x){
            return x[0].label === "SPECIAL" && ["DICT"].includes(x[0].content.name) && x[1].label === "KEY"
        },
        merge:function(x){
            return new Node(x,
                "REFLIST",
                x[0].content.func(x[1].content))
        }
    },
    {
        name:"CONDITION+SPECIAL+CONDITION=CONDITION",
        args:3,
        find:function(x){
            return x[0].label === "CONDITION" && x[1].label === "SPECIAL" && ["AND","OR"].includes(x[1].content.name) && x[2].label === "CONDITION"
        },
        merge:function(x){
            return new Node(x,
                "CONDITION",
                x[1].content.func(x[0].content,x[2].content))
        }
    },
    {
        name:"KEY+CONDITION=FILTER",
        args:2,
        find:function(x){
            return x[0].label === "KEY" && x[1].label === "CONDITION"
        },
        merge:function(x){
            return new Node(x,
                "FILTER",
                x[1].content.as_filter(x[0].content))
        }
    },
    {
        name:"FILTER+SPECIAL+FILTER=FILTER",
        args:3,
        find:function(x){
            return x[0].label === "FILTER" && x[1].label === "SPECIAL" && ["AND","OR"].includes(x[1].content.name) && x[2].label === "FILTER"
        },
        merge:function(x){
            return new Node(x,
                "FILTER",
                x[1].content.func(x[0].content,x[2].content))
        }
    },
    {
        name:"REFLIST+WHERE+FILTER=REFLIST",
        args:3,
        find:function(x){
            return x[0].label === "REFLIST" && x[1].label === "SPECIAL" && ["WHERE"].includes(x[1].content.name) && x[2].label === "FILTER"
        },
        merge:function(x){
            return new Node(x,
                "REFLIST",
                x[1].content.func(x[0].content,x[2].content))
        }
    },
    {
        name:"PARENTHETICALS",
        args:3,
        find:function(x){
            return x[0].label === "SPECIAL" && ["("].includes(x[0].content.name) && x[2].label === "SPECIAL" && [")"].includes(x[2].content.name)
        },
        merge:function(x){
            return new Node(x,
                x[1].label,
                x[1].content)
        }
    },
    {
        name:"DELIMITER-COMMAND",
        args:3,
        find:function(x){
            return x[0].label === "KEY" && x[1].label === "SPECIAL" && x[1].content.name === "DELIMITER" && isStringReflist(x[2].content)
        },
        merge:function(x){
            return new Node(x,
                "COMMAND",
                x[1].content.func(x[0].content,x[2].content))
        }
    },
    {
        name:"TABLE-COMMAND",
        args:2,
        find:function(x){
            return x[0].label === "SPECIAL" && x[0].content.name === "TABLE" && x[1].label === "REFLIST"
        },
        merge:function(x){
            return new Node(x,
                "COMMAND",
                x[0].content.func(x[1].content))
        }
    }
]
