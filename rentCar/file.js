
    // cerca utenti
     function cerca(){
      var input, filter, ul, li, a, i, txtValue;
      input=document.getElementById('cercaUtenti');
      filter= input.value.toUpperCase();
      ul=document.getElementById("utente");
      li=ul.getElementsByTagName('li');
 
      for (i = 0; i < li.length; i++) {       
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter)>-1) {
      li[i].style.display = "";
     } else {
      li[i].style.display = "none";
    }
  }
}



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
        var $id=$(this).attr('id');
        });
 
       $('#mod-utente').on('click', function(e){
        e.preventDefault();
        $.ajax({
            type:'PUT',
            url:'http://localhost:3000/utente/9',
            contentType:'application/json',
            data: $('#editFormID').serialize(),
            success: function(data){
                $('#id').val(data.id);
                $('#nome').val(data.nome);
                $('#cognome').val(data.cognome);
                $('#annoNascita').val(data.annoNascita);
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


 

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
    })

});

   



