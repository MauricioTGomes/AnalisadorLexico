var collection = [];
var valuesGlobal = 0;
var valueInteration = [0];
var table = [];
var values = [[]];

$(document).ready(function(){

  montaTabela();

  //validador de palavras, letra por letra
  $('#validate').keyup(function(e){
    if(table.length > 0){
      tokenValidate(e);
    }
  });
});

  //funçao de montar a tabela
function montaTabela(){

  values = [[]];
  valuesGlobal = 0;
  valueInteration = [0];
  table = [];

  montaEstados();

  table = geraLinhas();

  insereValoresTabela(table);
}

//adiciona palavras
function adicionaNovaPalavra () {
    var value = $("#word").val().toLowerCase();

    if(value === ""){
      $('#word').addClass('error');
      setTimeout(function(){
        $('#word').removeClass('error');
      }, 2000);
    } else {
      var addNext = true;
      //verifica palavra
      for (var i = 0; i < value.length; i++) {
        if(!((value[i] >= 'a' && value[i] <= 'z') || value[i] === ' ')){
          alert('Caracter ' + value[i] + ' inválido, insira apenas letras.');
          addNext = false;
          break;
        }
      }

      if (addNext) {
        value = value.split(" ");
        var number = collection.length;
        
        if(value.length > 1){
          for (i = 0; i < value.length; i++) {
            var exists = false;
            number = collection.length;
            if(value[i] !== ""){
              //valida a palavra se nao é vazio ou se ja existe
              for (j = 0; j < collection.length; j++) {
                if(value[i] === collection[j]){
                  exists = true;
                }
              }
              //se nao existir no dicionario e adicionado
              if(!exists){
                $('#listWords').append($('<td class="list-group-item" id="word' + number + '">' + value[i] +
                ' </td>'));
                collection.push(value[i]);
              }
            }
          }
        } else {
          var exists = false;
          //verifica se o proximo token nao existe no dicionario
          for (j = 0; j < collection.length; j++) {
            if(value[0] === collection[j]){
              exists = true;
            }
          }
          //se nao existir no dicionario e adicionado
          if(!exists){
            $('#listWords').append($('<td class="list-group-item" id="word' + number + '">' + value[0] +
            ' </td>'));
            collection.push(value[0]);
          }
        }
        //limpa o campo de palavras
        $("#word").val("");
      }
    }

    $('#table-automaton').empty();

    montaTabela();
}

function limpaCampos (e) {
  $('#word').val("");
  $('#validate').val("");
  collection = [];
  var word = collection[e];
  var aux = [];
  collection = [];
  collection = aux;
  aux = [];
  $('#listWords').empty();
  $('#table-automaton').empty();
  for (i = 0; i < collection.length; i++) {
    $('#listWords').append($('<td class="list-group-item" id="word' + i + '">' + collection[i] +
    '</td>'));
  }
  montaTabela();
}

//metodo monta estados
function montaEstados(){
  for (var i = 0; i < collection.length; i++) {
    var actualState = 0;
    var word = collection[i];
    for(var j = 0; j < word.length; j++){
      if(typeof values[actualState][word[j]] === 'undefined'){
        var nextState = valuesGlobal + 1;
        values[actualState][word[j]] = nextState;
        values[nextState] = [];
        valuesGlobal = actualState = nextState;
      } else {
        actualState = values[actualState][word[j]];
      }
      if(j == word.length - 1){
        values[actualState]['final'] = true;
      }
    }
  }
}

//metodo gerar linhas da tabela
function geraLinhas(){
  var vectorvalues = [];
  for (var i = 0; i < values.length; i++) {
    var aux = [];
    aux['estado'] = i;
    var first = 'a';
    var last = 'z';
    for (var j = first.charCodeAt(0); j <= last.charCodeAt(0); j++) {
      var letter = String.fromCharCode(j);
      if(typeof values[i][letter] === 'undefined'){
        aux[letter] = '-'
      } else {
        aux[letter] = values[i][letter]
      }
    }
    if(typeof values[i]['final'] !== 'undefined'){
      aux['final'] = true;
    }
    vectorvalues.push(aux);
  };
  return vectorvalues;
}

//metodo gerar a tabela
function insereValoresTabela(vectorvalues){
  var tableFront = $('#table-automaton');
  tableFront.html('');
  var tr = $(document.createElement('tr'));
  var th = $(document.createElement('th'));
  th.html('');
  tr.append(th);
  var first = 'a';
  var last = 'z';
  for (var j = first.charCodeAt(0); j <= last.charCodeAt(0); j++) {
    var th = $( document.createElement('th') );
    th.html(String.fromCharCode(j));
    tr.append(th);
  }
  tableFront.append(tr);

  for(var i = 0; i < vectorvalues.length; i++){
    var tr = $(document.createElement('tr'));
    var td = $(document.createElement('td'));
    
    if(vectorvalues[i]['final']){
      td.html('q' + vectorvalues[i]['estado'] + '*');
    } else {
      td.html('q' + vectorvalues[i]['estado']);
    }
    tr.append(td);
    tr.addClass('state_'+vectorvalues[i]['estado']);
    var first = 'a';
    var last = 'z';
    for (var j = first.charCodeAt(0); j <= last.charCodeAt(0); j++) {
      var letter = String.fromCharCode(j);
      var td = $( document.createElement('td') );
      td.addClass('letter_'+letter);
      if(vectorvalues[i][letter] != '-'){
        td.html('q' + vectorvalues[i][letter]);
      } else {
        td.html('-');
      }
      tr.append(td);
    }
    tableFront.append(tr);
  }
}
