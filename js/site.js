$(document).ready(function() {

    //Add bootstrap class to main table.
    $('#indexlist').addClass('table table-striped table-sm ');

    // Remove HRs
    $('#indexlist').find('hr').each(function(e){
        $(this).remove();
    });


    setTitle('#title');
  //  $('#search').on('input' , filter());

  addSearch('#search');


})

function addSearch(inputSelector) {

  const sortColumns = Array.from(document.querySelectorAll('thead a'));
  const nameColumns = Array.from(document.querySelectorAll('tbody .indexcolname'));
  const rows = nameColumns.map(({ parentNode }) => parentNode);
  const fileNames = nameColumns.map(({ textContent }) => textContent);

  function filter(value) {
    // Allow tabbing out of the search input and skipping the sort links
    // when there is a search value.
    sortColumns.forEach((link) => {
      if (value) {
        link.tabIndex = -1;
      } else {
        link.removeAttribute('tabIndex');
      }
    });

    // Test the input against the file/folder name.
    let even = false;
    fileNames.forEach((name, i) => {
      if (!value || name.toLowerCase().includes(value.toLowerCase())) {
        const className = even ? 'even' : '';
        rows[i].className = className;
        even = !even;
      } else {
        rows[i].className = 'hidden';
      }
    });
  }

  $(inputSelector).on('input', function(e) {
    console.log(e);
    filter(e.target.value)
  });

  // document.getElementById('search').addEventListener('input', ({ target }) => {
  //   filter(target.value);
  // });

  filter('');
}

function setTitle(selector) {
  let path = window.location.pathname.replace(/\/$/g, '');
  let titleText;

  if (path) {
    const parts = path.split('/');
    path = parts[parts.length - 1];
    titleText = titleize(path).replace(/-|_/g, ' ');
  } else {
    titleText = window.location.host;
  }
  console.log(titleText);
  $(selector).text(titleText);
}

function filter(value) {
  // Allow tabbing out of the search input and skipping the sort links
  // when there is a search value.
  sortColumns.forEach((link) => {
    if (value) {
      link.tabIndex = -1;
    } else {
      link.removeAttribute('tabIndex');
    }
  });

  // Test the input against the file/folder name.
  let even = false;
  fileNames.forEach((name, i) => {
    if (!value || name.toLowerCase().includes(value.toLowerCase())) {
      const className = even ? 'even' : '';
      rows[i].className = className;
      even = !even;
    } else {
      rows[i].className = 'hidden';
    }
  });
}
