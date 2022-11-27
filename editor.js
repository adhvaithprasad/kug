var config = {
          apiKey: "AIzaSyAMuq8cE_GO2VgZE_JELbN9bGsVWLuwkZE",
    authDomain: "adhvaith-6e7a2.firebaseapp.com",
    databaseURL: "https://adhvaith-6e7a2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "adhvaith-6e7a2",
    storageBucket: "adhvaith-6e7a2.appspot.com",
    messagingSenderId: "809508658200",
    appId: "1:809508658200:web:f4ab1b4ab1ec10cfb1376d"
        };
        firebase.initializeApp(config);

const auth = firebase.auth();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("user_image").src=user.photoURL;
  } else {
    var provider = new firebase.auth.GithubAuthProvider();
provider.addScope('gist');
firebase.auth().signInWithRedirect(provider);
firebase.auth()
  .getRedirectResult()
  .then((result) => {
    if (result.credential) {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      var token = credential.accessToken;
      // ...
      console.log(token)
    }

    // The signed-in user info.
    var user = result.user;
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  }
});

function init() {

fetch('https://api.github.com/repos/firescrypt/editor-1/contents', options)
  .then(response => response.json())
  .then(response => dir(response))
  .catch(err => console.error(err));
  
//           require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@latest/min/vs' } });
//   window.MonacoEnvironment = { getWorkerUrl: () => proxy };

//   let proxy = URL.createObjectURL(new Blob([`
// 	self.MonacoEnvironment = {
// 		baseUrl: 'https://unpkg.com/monaco-editor@latest/min/'
// 	};
// 	importScripts('https://unpkg.com/monaco-editor@latest/min/vs/base/worker/workerMain.js');
// `], { type: 'text/javascript' }));
  
//         require(['vs/editor/editor.main'], function() {
//           const list = document.getElementById("editor");

// while (list.hasChildNodes()) {
//   list.removeChild(list.firstChild);
// }
//             window.editor = monaco.editor.create(
//                 document.getElementById('editor'),
//                 {
//                     language: 'javascript',
//                   theme:"vs-dark"
//                 }
//             );
           
           
//         });

    }

