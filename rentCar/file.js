$(document).ready(function() {


var $utente = $('#utente');
var $nome = $('#nome');
var $cognome = $('#cognome');
var $dataNascita = $('#dataNascita');

var utenteTemplate = $('#utente-template').html();

function addUtente(utente) {
    $utente.append(Mustache.render(utenteTemplate, utente));
}

    /* get utente */

    $.ajax({
    url: 'http://localhost:3000/utente',
    type: 'GET',
    }).then(function(utente) {
    $.each (utente, function(i, utente){
    addUtente(utente);
  });
});


    /*post utente*/

    $('#add-utente').on('click', function(){
    var utente = {
        nome: $nome.val(),
        cognome: $cognome.val(),
        dataNascita: $dataNascita.val(),
    };

    $.ajax({
        type:'POST',
        url: 'http://localhost:3000/utente',
        data: utente,
        success: function(newUtente) {
            addUtente(newUtente);
        },
        error: function (){
            alert('errore caricamento nuovo utente');
         }
       });
    });

    /* delete utente */

    $utente.delegate('.remove', 'click', function(){
       var $li=$(this).closest('li');
        $.ajax({
            type:'DELETE',
            url:'http://localhost:3000/utente/' + $(this).attr('data-id'),
            success: function (){
                $li.remove();
                alert('Utente eliminato');
            }
        });
    });

   /* update utente */

    $utente.delegate('.modifica', 'click', function(){
        var $li=$(this).closest('li');
        $li.find('input.nome').val($li.find('input.nome').html() );
        $li.find('input.cognome').val($li.find('input.cognome').html() );
        $li.find('input.dataNascita').val($li.find('input.dataNascita').html() );
       
    });       
    $utente.delegate('#cancellaMod','click', function(){
        $(this).closest('li').removeClass('modifica');
    });       
    $utente.delegate('#add-utente','click', function() {
        var $li=$(this).closest('li');
        var utente={
            nome:$li.find('input.nome').val(),
            cognome:$li.find('input.cognome').val(),
            dataNascita:$li.find('input.dataNascita').val()
        };
      
     $.ajax({
         type:'PUT',
         url:'http://localhost:3000/utente/' + $li.attr('data-id'),
         data: {nome:nome, cognome:cognome, dataNascita:dataNascita},
         success: function(newUtente) {
             $li.find('input.nome').html(utente.nome);
             $li.find('input.cognome').html(utente.cognome);
             $li.find('input.dataNascita').html(utente.dataNascita);
             $li.removeClass('modifica');
         },
         error:function (){
             alert('errore modifica utente');
         }
     });
    });

// parco Auto

//var $casaCostruttrice = $('#casaCostruttrice');
//var $annoImmatricolazione = $('#annoImmatricolazione');
//var $modello = $('#modello');
//var $targa = $('#targa');
//var $categoria = $('#categoria');
//var utenteTemplate = $('#veicolo-template').html();
//
//function addVeicolo(veicolo) {
//    $utente.append(Mustache.render(veicoloTemplate, utente));
//}
//
//    /* get utente */
//
//    $.ajax({
//    url: 'http://localhost:3000/veicolo',
//    type: 'GET',
//    }).then(function(veicolo) {
//    $.each (veicolo, function(i, veicolo){
//    addVeicolo(veicolo);
//    });
//   });


$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
    })
});
