let STATE = {}

document.getElementById('upload').addEventListener('click', uploadContents)
document.getElementById('execute').addEventListener('click', executeCode)
document.getElementById('download').addEventListener('click', executeDownload)


function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function executeDownload(){
  download("results.txt",STATE.download)
}

function executeCode() {
  document.getElementById('displayresults').innerHTML = ``
  document.getElementById('displayresults').innerText = ``
  let thecommand = []
  document.getElementById("commandinput").value.split(/[\n;]/g).forEach(line => {
    if (line != ""){
      thecommand.push(line)
    }
  });
  for (let commandindex = 0; commandindex < thecommand.length; commandindex++){
    let commandcontent = applyAllReadfuncs(readCommand(thecommand[commandindex]))
    if (commandcontent.length !== 1){
      document.getElementById('displayresults').innerText = `Line ${commandindex+1} cannot be fully parsed: ${command}`
      return
    }
    if (commandcontent[0].content.constructor.name != "Command"){
      document.getElementById('displayresults').innerText = `Line ${commandindex+1} represents a ${commandcontent[0].content.constructor.name}, not a Command, and so cannot be executed: ${command}`
      return
    }
    commandcontent[0].content.execute()
    document.getElementById('displayresults').innerHTML = STATE.display
  }
}

function uploadContents() {
    let file = document.getElementById('inputfile').files[0]
    if (file) {
      new Promise(function(resolve, reject) {
        let reader = new FileReader();
        reader.onload = function (evt) {
          resolve(evt.target.result);
        };
        reader.readAsText(file);
        reader.onerror = reject;
      })
      .then(processFileContent)
      .catch(function(err) {
        console.log(err)
      });
    }
  }
function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
function processFileContent(data){
    if (!isJsonString(data)){
      document.getElementById("timespan").innerText = `File is not in a valid JSON format`
      return
    }
    STATE.upload = new Corpus(data)
    STATE.corpus = new Corpus(data)
    let k = new Date()
    document.getElementById("timespan").innerText = `Corpus Uploaded on ${k.toString()}`
}
