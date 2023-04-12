window.addEventListener('DOMContentLoaded', (event) => {
  const title = document.getElementById('title');

  removeHyphensAndPercentCharsThenWritePageTitle();

  function removeHyphensAndPercentCharsThenWritePageTitle() {
    const path = window.location.pathname.split('/');
    let pathLastWord = path[path.length - 1];
    console.log(pathLastWord);
    //decodeURI removes "%" character and replace(removes "-" character)
    let pathTitle = decodeURI(pathLastWord).replaceAll('-', ' ');
    title.innerText = pathTitle;

    // folderToBeDeleted.value = pathLastWord;
  }
});

