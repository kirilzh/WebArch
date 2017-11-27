$(document).ready(() => {
  let userId = $.ajax({
    url: '/playground/id',
    dataType: 'json',
    success: (data) => {
      userId = data.message;
      console.log(userId);
    },
  });
  $.when(userId).done(() => {
    $.ajax({
      url: `playground/${userId}/index.css`,
      dataType: 'text',
      success: (data) => {
        $('#userCSS').text(data);
      },
    });
    $.ajax({
      url: `playground/${userId}/index.html`,
      dataType: 'text',
      success: (data) => {
        $('#userHTML').text(data);
      },
    });
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
