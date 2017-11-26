$(document).ready(() => {
  $.ajax({
    url: 'http://localhost:3000/playground/100115383/index.css',
    dataType: 'text',
    success: (data) => {
      $('#userCSS').text(data);
    },
  });
  $.ajax({
    url: 'http://localhost:3000/playground/100115383/computer.html',
    dataType: 'text',
    success: (data) => {
      $('#userHTML').text(data);
    },
  });
  $('#save').on('click', () => {
    const project = {};
    project[0] = $('#userHTML').val();
    project[1] = $('#userCSS').val();
    $.ajax({
      url: '/playground/docs',
      type: 'POST',
      data: JSON.stringify(project),
      contentType: 'application/JSON; charset=utf-8',
      dataType: 'JSON',
    });
  });
  $('#run').on('click', () => {
    $.ajax({
      url: '/playground/docs',
      dataType: 'text',
      success: () => {
        $('#result').attr('src', 'http://localhost:3000/playground/docs');
      },
    });
  });
});
