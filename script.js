const options = {
  method: 'GET',
  headers: {
    Authorization: 'Bearer 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',
    'content-type': 'application/json'
  }
};

 listbugs()
function dir(m){

// m being the dir
  for(let i in m){
    // file
    if (m[i].type === "file"){
      
var name= m[i].name;
var ul = "filetree";
      document.getElementById(ul).innerHTML += `<li class="file" onclick="setCodeValue('${m[i].url}')"> ${name} </li>`;
      
     

      
    }
    // folder
    else if(m[i].type === "dir"){
     
      document.getElementById("filetree").innerHTML += `<li>
     <span onclick="caret('folder_${m[i].sha}')"class="caret file">
${m[i].name.split("/").slice(-1)[0]}
</span>
      <ul id="folder_${m[i].sha}" class="nested">
    
      </ul></li>`
      var url =m[i].url ;
fetch(url, options)
  .then(response => response.json())
  .then(response => s_dir(m[i].name,"folder_"+m[i].sha,response,url,m[i].path))
  .catch(err => console.error(err));

    }
    
  }
}
function s_dir(name,ul,m,url1,path){
 

  
  for(let i = 0; i < m.length; i++){
    // file
    if (m[i].type === "file"){
      
     var name= m[i].name;
  document.getElementById(ul).innerHTML += `<li class="file" onclick="setCodeValue('${m[i].url}')"> ${name}</li>`;
      
  

    }
    // folder
    else if(m[i].type === "dir"){
      

      
      document.getElementById(ul).innerHTML += `<li>
     <span onclick="caret('folder_${m[i].sha}')" class="caret file">
${m[i].name.split("/").slice(-1)[0]}
</span>
      <ul id="folder_${m[i].sha}" class="nested">
    
      </ul></li>`
      var url =m[i].url ;
  
    
      
fetch(url, options)
  .then(response => response.json())
  .then(response => s_dir(m[i].name,"folder_"+m[i].sha,response,url,m[i].path))
  .catch(err => console.error(m[i].name,url));

    }
  
  }
  
}

function listbugs(){
fetch("https://api.github.com/repos/firescrypt/editor-1/issues", options)
  .then(response => response.json())
  .then(response => {
    console.log(response);
    response.forEach(function(n){
      document.getElementById("issue-logger").innerHTML +=
        `<div class="issue-log"><h2>${n.title}</h2><br><p>${n.body}</p></div>`
    })
  })
  .catch(err => console.error(err)); 
}



function caret(m) {  
  var x = document.getElementById(m);
  x.classList.toggle("active");
    event.target.classList.toggle("caret-down");
  }

function setCodeValue(m){
  fetch(m, options)
  .then(response => response.json())
  .then(response => setv(response))
  .catch(err => console.error(err));
 
}

// function setv(r){
// window.editor.getModel().setValue(window.atob(r.content))
//    window.filename = r.name;
//    window.fileurl = r.url;
//    window.filevalue = window.atob(r.content);
  
// }



function setv(r){
           window.filename = r.name;
          window.filepath = r.path;
        window.filesha=r.sha;
   window.fileurl = r.url;
   window.filevalue = window.atob(r.content);
      var value =  window.atob(r.content);


                require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@0.8.3/min/vs' }});
window.MonacoEnvironment = { getWorkerUrl: () => proxy };

let proxy = URL.createObjectURL(new Blob([`
	self.MonacoEnvironment = {
		baseUrl: 'https://unpkg.com/monaco-editor@0.8.3/min/'
	};
	importScripts('https://unpkg.com/monaco-editor@0.8.3/min/vs/base/worker/workerMain.js');
`], { type: 'text/javascript' }));


        require(["vs/editor/editor.main"], function () {

const list = document.getElementById("editor");

while (list.hasChildNodes()) {
  list.removeChild(list.firstChild);
}
	window.editor = monaco.editor.create(document.getElementById('editor'), {
    value:value,
		language: 'text',
		theme: 'vs-dark' ,
    minimap: {
		enabled: true
	}})
    const model = monaco.editor.createModel(value, undefined, monaco.Uri.file(window.filename));
window.editor.setModel(model);        
	})
}

window.c_files={};

// setInterval(function(){ 

//   var a= window.editor.getValue();
//   var b=window.filevalue;
//   if(typeof b !== "undefined"){
//     if(a !== b){
//       // console.log(window.c_files);
//       if(window.c_files.hasOwnProperty(window.filename) !== true){
//         document.getElementById("commit-logger").innerHTML += `<div class="commit-log" onclick="changeval('${window.filename}')">${window.filename}</div>`
        
//         window.c_files[window.filename]={"name":window.filename,"path":window.filepath,"content":window.btoa(a),"sha":window.filesha,"a":a};
//       }
//       else{
//          window.c_files[window.filename]={"name":window.filename,"path":window.filepath,"content":window.btoa(a),"sha":window.filesha,"a":a};
//       }
//     }
//   }
// }, 100);

function changeval(m){
  var r = window.c_files[m].a;
  var o = window.filevalue;
  console.log(r,o)
  review(r,o)
}
function commit(){
  var message = prompt("commit-message");

    var path = window.filepath;
    var sha = window.filesha;
    var content = window.btoa(window.editor.getValue())

    const options = {
  method: 'PUT',
  headers: {
    Authorization: 'Bearer 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',
    'content-type': 'application/json'
  },
  body: JSON.stringify(
    {
      "message":message,
      "content":content,
      "sha":sha
    }
  )
};

fetch('https://api.github.com/repos/firescrypt/editor-1/contents/'+path, options)
  .then(response => response.json())
  .then(response => alert("succes"))
  .catch(err => console.error(err));
  

}
function issue(){
  var title = document.getElementById("issue-title").value;
  var body = document.getElementById("issue-body").value;
  const options = {
  method: 'POST',
  headers: {
    Authorization: 'Bearer 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',
    'content-type': 'application/json'
  },
  body: JSON.stringify({
    "title":title,
    "body":body
  })
};

fetch('https://api.github.com/repos/firescrypt/editor-1/issues', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
}