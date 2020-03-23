
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

    /*edit utente*/

  $('.modifica').on('click', function(){    
     $('#myModal').modal('show');
     var $li=$(this).closest('li');
     var $id=$(this).attr('id');
  });

  $('#add-utente').on('click', function(e){
      e.preventDefault();
      var id=$('#id').val(data.id),

      var utente={
       nome=$('#nome').val(),
       cognome=$('#cognome').val(),
       annoNascita=$('#annoNascita').val(),
       };
       console.log(utente)
    

   $.ajax({
       type:'PUT',
       url:'http://localhost:3000/utente/'+id,
       data:utente,
       success: function(data){
          console.log('utente modificato')
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

   








    /* edit utente */

    //var editSource= $("#editModal").html();
    //var editModal= Handlebars.compile(editSource)
    //
    //$('.modifica').on('click', function(){
    //    var listItem= $(event.target).closest("li.list-group-item");
    //
    //     listItem.find(".content").hide();
    //
    //    var content = listItem.find("span").html();
    //
    //    var edithtml = editModal({
    //        id: content
    //    });
    //
    //    listItem.append(edithtml);
    //    
    //    var $editForm = listItem.find('#editFormID');

    //    $editForm.on('click', function(event){
    //        e.preventDefault();
    //   
    
    //    var newContent= $editForm.find('input').val();
    //    listItem.find('span').html(newContent);
    //
    //    listItem.find('.content').show();
     //
     //   $editForm.remove();
     //
    //    var id= listItem.attr('id')
    //    });

    //    $.ajax({
    //           method:'PUT',
    //           url:'http://localhost:3000/utente/11',
    //           data:{
    //               text: newContent
    //           }
    //        });
    //        });





    //$('.modifica').on('click', function(){    
   // $('#editModal').modal('show');
    //var $li=$(this).closest('li');
    //$li.find('input.nome').val($li.find('span.nome').html());
   // $li.find('input.cognome').val($li.find('span.cognome').html());
   // $li.find('input.dataNascita').val($li.find('span.dataNascita').html());
   // $li.addClass('edit');
   // });

   // $('#cancellaMod').on('click', function(){  
   //    $(this).closest('li').removeClass('edit');
   // });


   //  
   // $('#mod-utente').on('click', function(){
   //     var $li=$(this).closest('li');
   //     var utente= {
   //         nome:$li.find('input.nome').val(),
   //         cognome:$li.find('input.cognome').val(),
   //         dataNascita:$li.find('input.dataNascita').val(),
  //      }
  //  
  //  $.ajax({
  //     type:'PUT',
  //     url:'http://localhost:3000/utente/11',
  //     data: utente,
  //     success: function(newUtente){
  //         addUtente(newUtente);
 //      },
 //      error: function () {
  //         alert('errore modifica utente');
  //     }
  //  });
  // });
