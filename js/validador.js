
//metodo validador do token
function tokenValidate(event){
  var words = $('#validate').val().toLowerCase();
  var state = 0;
  if(words.length == 0){
    $('#validate').removeClass('correct');
    $('#validate').removeClass('error');
    $('#table-automaton tr').removeClass('selectedStatus');
    $('#table-automaton td').removeClass('selectedField');
    $('#table-automaton .state_' + state).removeClass('selectedStatusFalse');
    $('#table-automaton .letter_' + words[i]).removeClass('selectedFieldFalse');
  }
  for (var i = 0; i < words.length; i++) {
    if(words[i] >= 'a' && words[i] <= 'z'){
      $('#table-automaton tr').removeClass('selectedStatus');
      $('#table-automaton td').removeClass('selectedField');
      $('#table-automaton .state_' + state).addClass('selectedStatus');
      $('#table-automaton .letter_' + words[i]).addClass('selectedField');
      if(table[state][words[i]] != '-'){
        $('#table-automaton .state_' + state).addClass('selectedStatus');
        $('#table-automaton .letter_' + words[i]).addClass('selectedField');
        state = table[state][words[i]];
        $('#validate').addClass('correct');
        $('#validate').removeClass('error');
        $('#table-automaton .state_' + state).removeClass('selectedStatusFalse');
        $('#table-automaton .letter_' + words[i]).removeClass('selectedFieldFalse');
        $('#table-automaton .state_' + state).removeClass('selectedStatusSpace');
        $('#table-automaton .letter_' + words[i]).removeClass('selectedFieldSpace');
      } else {
        $('#table-automaton .state_' + state).addClass('selectedStatusFalse');
        $('#table-automaton .letter_' + words[i]).addClass('selectedFieldFalse');
        $('#validate').removeClass('correct');
        $('#validate').addClass('error');
        break;
      }
    } else if(words[i] == ' '){ //verifica se o caracter digitado e espaço
      $('#table-automaton tr').removeClass('selectedStatus');
      $('#table-automaton td').removeClass('selectedField');
      $('#table-automaton .state_' + state).addClass('selectedStatusSpace');
      $('#table-automaton .letter_' + words[i]).addClass('selectedFieldSpace');
      if(table[state]['final']){
        state = 0;
      } else {
        $('#table-automaton .state_' + state).removeClass('selectedStatusSpace');
        $('#table-automaton .letter_' + words[i]).removeClass('selectedFieldSpace');
        $('#validate').removeClass('correct');
        $('#validate').addClass('error');
        break;
      }
    } else { //se nao for caracter do alfabeto nem espaço e adicionado classe de erro
      $('#validate').removeClass('correct');
      $('#validate').addClass('error');
      alert('Caractere ' + words[i] + ' inválido, apenas letras permitidas.');
      break;
    }
  };
}
