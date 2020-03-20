  /* cerca veicoli */

  function cercaAuto(){
    var input, filter, ul, li, a, i, txtValue;
    input=document.getElementById("cercaVeicoli");
    filter= input.value.toUpperCase();
    ul=document.getElementById("veicolo");
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
    
    
    //parco Auto
    var $veicolo = $('#veicolo');

    var $annoImmatricolazione = $('#annoImmatricolazione');
    var $casaCostruttrice = $('#casaCostruttrice');
    var $modello = $('#modello');
    var $targa = $('#targa');
    var $categoria = $('#categoria');

    var veicoloTemplate = $('#veicolo-template').html();
    
    function addVeicolo(veicolo) {
        $veicolo.append(Mustache.render(veicoloTemplate, veicolo));
    }
    
        /* get Veicolo */
    
        $.ajax({
        url: 'http://localhost:3000/veicolo',
        type: 'GET',
        }).then(function(veicolo) {
        $.each (veicolo, function(i, veicolo){
        addVeicolo(veicolo);
        });
       });

        
       /* delete veicolo */

    $veicolo.delegate('.removeAuto', 'click', function(){
        var $li=$(this).closest('li');
         $.ajax({
             type:'DELETE',
             url:'http://localhost:3000/veicolo/' + $(this).attr('data-id'),
             success: function (){
                 $li.remove();
                 alert('Veicolo eliminato');
             }
         });
     });

     /* update veicolo */

    // function update(id){
    //    $.ajax({
    //        url:'http://localhost:3000/veicolo/'+id,
    //        method:'PUT',
    //        contentType:'application/json',
    //        dataType:'json',
    //        success: function(data){
    //            $('#id').val(data.id);
    //            $('#casaCostruttrice').val(data.casaCostruttrice);
    //            $('#modello').val(data.modello);
    //            $('#annoImmatricolazione').val(data.annoImmatricolazione);
    //            $('#targa').val(data.targa);
    //            $('#categoria').val(data.categoria);
    //            getAllVeicolo();
    //        },
    //        error:function (error) {
    //            alert(error);
    //        }
//
    //    });
    //}



  
    


   $('#myModal').on('shown.bs.modal', function () {
       $('#myInput').trigger('focus')
       })
    
});


