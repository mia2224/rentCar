$(document).ready(function (){

 let url='http://localhost:3000/prenotazione'
 $.getJSON(url,function(data){
 let prenotazioni_data='';
 $.each(data, function(key,value){
     prenotazioni_data+='<tr>'; 
     prenotazioni_data+='<td>'+value.id+'</td>';
     prenotazioni_data+='<td>'+value.idUtente+'</td>';
     prenotazioni_data+='<td>'+value.idVeicolo+'</td>';
     prenotazioni_data+='<td>'+value.periodoPrenotazione+'</td>';
 });
 $('#tablePrenotazioni').append(prenotazioni_data);
});
});
