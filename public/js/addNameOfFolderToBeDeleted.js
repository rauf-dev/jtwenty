// adds name of folder to be deleted into the forms input field

window.addEventListener('DOMContentLoaded', (event) => {
  addNameOfFolderToBeDeleted();
  function addNameOfFolderToBeDeleted() {
    const folderToBeDeleted = document.getElementById('foldername');
    const path = window.location.pathname.split('/');
    let pathLastWord = path[path.length - 1];
    console.log(pathLastWord);
    folderToBeDeleted.value = pathLastWord;
    console.log('here comes value of hiddeninput field')
    console.log(folderToBeDeleted.value)
  }
});
