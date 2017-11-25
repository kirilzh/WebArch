let HTML = '';
let CSS = '';
let result = '';

$(document).ready(() => {
  $.ajax({
    url: 'http://localhost:3000/playground/100115383/index.css',
    dataType: 'text',
    success: (data) => {
      const temp = JSON.stringify(data);
      CSS = `${'<style>'}${temp}${'</style>'}`;
      CSS = CSS.replace(/['"]+/g, '');
      $('#userCSS').text(data);
    },
  });
  $.ajax({
    url: 'http://localhost:3000/playground/100115383/computer.html',
    dataType: 'text',
    success: (data) => {
      HTML = JSON.stringify(data);
      const n = HTML.search('<head>') + 6;
      result = [HTML.slice(0, n), CSS, HTML.slice(n)].join('');
      $('#userHTML').text(data);
    },
  });
  $('#save').on('click', () => {
    $.ajax({
      url: '/playground/docs',
      type: 'POST',
      data: JSON.stringify({ result }),
      contentType: 'application/JSON; charset=utf-8',
      dataType: 'JSON',
    });
  });
  $('#run').on('click', () => {
    $.ajax({
      url: '/playground/docs',
      dataType: 'text',
      success: (data) => {
        console.log(data);
        $('#result').attr('src', 'http://localhost:3000/playground/docs');
      },
    });
  });
  CSS = '';
  HTML = '';
});
