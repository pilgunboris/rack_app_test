$(function () {
  var changeDisabled = function () {
    if ($('#user_input').val().length == 4) {
      $('#send').prop('disabled', false);
    }
    else {
      $('#send').prop('disabled', true);
    }
  }
  changeDisabled();

  for (i = 1; i <= 6; i++) {
    $('#input_' + i).click(function (e) {
      e.preventDefault();
      $('#result').text('');
      if ($('#user_input').val().length < 4) {
        $('#user_input').val($('#user_input').val() + $(this).val());
      } else {
        console.log("Щось пішло не так. Подивіться уважно по сторонам і вгору.")
        alert("Дозволено лише 4 числа!")
      }
      changeDisabled();
    })
  }

  $('#clear').click(function (e) {
    e.preventDefault();
    $('#user_input').val('');
    $('#result').text('');
    changeDisabled();
  });

  $('#correct').click(function (e) {
    e.preventDefault();
    $('#user_input').val($('#user_input').val().slice(0, -1));
    $('#result').text('');
    changeDisabled();
  });

  $('#send').click(function (e) {
    e.preventDefault();
    $.post('/run',
      {
        numbers: $('#user_input').val(),
        current_round: $('#current_round').val()
      },
      function (data, status) {
        data = JSON.parse(data)
        $('#current_round').val(data['current_round']);
        if(data['current_round'] == '1') {
          $('#show_hint_link').show();
        }
        if(data['won']) {
          $('#result').text("You won!");
          $('#game_in_progress').hide();
        }
        else if (!data['lost']) {
          $('#result').text(data['round_result']);
        }
        else if (data['lost']) {
          $('#result').text('You lost! Try again.');
          $('#game_in_progress').hide();
        }
        $('#attempts_left').text(data['attempts_left']);
      });
  });

  $('#show_hint_link').click(function (e) {
    e.preventDefault();
    url = '/hint?numbers=' + $('#user_input').val() + '&current_round=' + $('#current_round').val()

    $.get(url, function (data, status) {
        data = JSON.parse(data)
        $('#show_hint').text(data['hint']);
        $('#show_hint_link').hide();
        $('#hint_block').show();
      });
  });
});
