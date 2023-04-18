function applyReadfuncStep(array,readfunc){
    let newarray = []
    for (let i = 0; i<array.length;i++){
        if (i > array.length-readfunc.args){
            newarray.push(array[i])
        }
        else{
            let content = array.slice(i,i+readfunc.args)
            if(readfunc.find(content)){
                newarray.push(readfunc.merge(content))
                i=i+readfunc.args-1
            } else{
                newarray.push(array[i])
            }
        }
    }
    return newarray
}
function applyReadfunc(array,readfunc){
    let curlength = array.length
    let newarray = applyReadfuncStep(array,readfunc)
    let newlength = newarray.length
    if (newlength === curlength){
        return newarray
    }
    return applyReadfunc(newarray,readfunc)
}
function applyAllReadfuncsStep(array){
    let newarray = array
    readfunction.forEach(readfunc => {
        newarray = applyReadfunc(newarray,readfunc)
    });
    return newarray
}

function applyAllReadfuncs(array){
    let curlength = array.length
    let newarray = applyAllReadfuncsStep(array)
    let newlength = newarray.length
    if (newlength === curlength){
        return newarray
    }
    return applyAllReadfuncsStep(newarray)
}

function leafNode(string){
    if (Object.keys(Specials).includes(string)){
        return new Node([],"SPECIAL",Specials[string])
    } else if (/^[0-9]+-[0-9]+$/g.test(string)){
        let rangearray = []
        for (let i = Number(string.split("-")[0]); i < Number(string.split("-")[1])+1; i++){
            rangearray.push(i)
        }
        return new Node([],"REFLIST",new Reflist({d:"",i:rangearray}))
    } else if (/^[0-9]+$/g.test(string)){
        return new Node([],"REFLIST",new Reflist({d:"",i:[Number(string)]}))
    }else if (/^".*"$/g.test(string)){
        return new Node([],"REFLIST",new Reflist({d:"",i:[string.slice(1,-1)]}))
    } else {
        //else, it will be considered a key.
        return new Node([],"KEY",new Key(string))
    }
}

//function which reads the textbox and makes tokens
function readCommand(textboxcontent){
    //read each character one by one
    let program = textboxcontent.split("")
    //add space to allow end of keywords to be recognized
    program.push(" ")
    //initialize token list
    let tokens = []
    //define first token
    let thistoken = ""
    //define state of being in or out of quotation
    let inquote = false
    program.forEach(char => {
        // if char is space, newline, or tab
        if (char === " " || char === "\n" || char === "\t"){
            //and current token is empty, do nothing 
            if (thistoken === ""){
                return
            }
            //and current token is current token is not empty, not quoted, apply token
            if (!inquote){
                tokens.push(leafNode(thistoken))
                thistoken = ""
                return
            }
        }
        // if char is parens or comma and not in quotes, it should be treated like an independent token
        if (["(",",",")"].includes(char) && !inquote){
            //if there is an old token, add it and add counter to tokenlist
            if (thistoken !== ""){
                tokens.push(leafNode(thistoken))
            }
            //add new token which is just the new character
            tokens.push(leafNode(char));
            thistoken = ""
            return
        }
        // else add char to token
        thistoken = thistoken.concat(char)
        // if char is quotation, toggle inquote
        if (char === '"'){
            inquote = !inquote
        }
    });
    tokens.forEach((element,index) => {
        element.index = index
    });
    return tokens;
}
function makeCommand(string){
    let res = applyAllReadfuncs(readCommand(string))
    if (res.length != 1){
        console.error(`Command cannot be fully parsed:`,res)
        return
    }
//    if (res[0].content.constructor.name != "Command"){
//        console.error(`Parsed line is not a command:`,res)
//        return
//    }
    return res[0].content
}

const commandlist = [
    makeCommand('chars DELIMITER ""'),
    makeCommand('lexicon DELIMITER " "'),
]
commandlist.forEach(command => {
    command.execute(STATE)
});
