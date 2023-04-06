// Use mutation observer to detect changes in the dataDivResults.dataset.uploadResult
// attribute. If the attribute changes to 'success', then redirect to the album page
const observerdataDivResults = new MutationObserver((mutations) => {
    const folderName = dataDiv.dataset.albumName;
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
            console.log('FE => MutationObserver => mutation.type is attributes');
            console.log(mutation);
            if (mutation.attributeName === 'data-upload-result') {
                console.log('FE => MutationObserver => mutation.attributeName is data-upload-result');
                console.log(mutation);
                if (mutation.target.dataset.uploadResult === 'success') {
                    console.log('FE => MutationObserver => mutation.target.dataset.uploadResult is success');
                    console.log(mutation);
                    console.log('FE => MutationObserver => Redirecting to album page');
                    window.location.href = `/viewalbum/${folderName}`;
                }
            }
        }
    });
});

// const dataDivResults = document.getElementById('dataDivResults');
window.addEventListener('load', () => {
    console.log('Observer is observing dataDivResults')
    observerdataDivResults.observe(dataDivResults, { attributes: true });
});
