const deleteIcon = document.querySelectorAll('.delete-icon');

window.addEventListener('DOMContentLoaded', async (event) => {
  deleteIcon.forEach((icon) => {
    icon.addEventListener('click', async (event) => {
      console.log('delete icon clicked');

      const imageId = event.currentTarget.dataset.imageId;
      const albumId = event.currentTarget.dataset.albumId;
      const gridDiv = document.getElementById(`grid-item-${imageId}`);

      const url = `/deleteimage/${albumId}/${imageId}`;

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('data: ', data); // { status: 'success' }
      // if (data === 'success' && event.currentTarget.parentElement.parentElement) {
      //   event.currentTarget.parentElement.parentElement.remove();
      // }

      if (data === 'success') {
        gridDiv.remove();
        console.log(`removed: `, gridDiv);

        //run masonry layout to re-arrange layout
        const grid = document.querySelector('.grid');
        var msnry = new Masonry(grid, {
          itemSelector: '.grid-item',
          columnWidth: '.grid-sizer',
          percentPosition: true,
        });
        imagesLoaded(grid).on('progress', function () {
          // layout Masonry after each image loads
          msnry.layout();
        });
      }
    });
  });
});
