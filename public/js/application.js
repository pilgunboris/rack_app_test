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
        console.log(data)
        $('#current_round').val(data['current_round']);
        if(data['won']) {
          $('#result').text("You won!");
        }
        else if (!data['lost']) {
          $('#result').text(data['round_result']);
        }
        else if (data['lost']) {
          $('#result').text('You lost! Try again.');
        }

      });
  });

      //   {
      //   current_round: (@current_round + 1),
      //   attempts_left: (DEFAULT_ATTEMPTS_COUNT - @current_round),
      //   won: won?,
      //   lost: lost?,
      //   round_result: prepare_round_result,
      //   hint_shown: false # TODO: write this to file
      // }





  $('#hint').click(function (e) {
    e.preventDefault();
    $.post('/hint',
      {
      },
      function (data, status) {
        data = JSON.parse(data)
        $('#hint_text').val(data['hint'])
        if(data['hint_shown'] == 'true') {
          $('#hint_link').hide
        }
      });
  });
});
