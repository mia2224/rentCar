$(document).ready(function() {


var $utente = $('#utente');
var $id=$('#id');
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

    
    /* edit utente */

    
    $('.modifica').on('click', function(){
        $('#editModal').modal('show');
        var $li=$(this).closest('li');

        console.log(data);
        $('#id').val(data.id);
        $('#nome').val(data.nome);
        $('#cognome').val(data.cognome);
        $('#annoNascita').val(data.annoNascita);
       });
 
       $('#editFormID').on('submit', function(){
        e.preventDefault();
        var id=$('#id').val();
        $.ajax({
            type:'PUT',
            url:'http://localhost:3000/utente/'+id,
            data: $('#editFormID').serialize(),
            success: function(response){
                console.log(response);
                $('#editModal').modal('hide');
                alert('Utente modificato');
            },
            error:function(error){
                console.log(error);
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



 // cerca utenti

$('#cercaUtenti').submit(function(){
    $('result').html('');
    var search=$('#cercaUtenti').val();
    var expression= new RegExp(search, "i");
    var apiURL='http://localhost:3000/utente';
    $.getJSON(apiURL,function(data){
        $.each(data, function(key,value){
            if(utente.nome.search(expression)!=-1||utente.cognome.search(expression)!=-1)
        {
        $('#result').append('<li class="list-group"> '+' '+utente.nome+' '+utente.cognome+ '</li>');
    }
    });
  });
});
   
    

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
    })
});
