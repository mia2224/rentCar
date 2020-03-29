//login Admin

//username:admin
//password:1234

function loginAdmin() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username == "admin" && password == "1234") {
        alert('Benvenuto!');
        window.location = "index.html";
        return false;
    } else {
        alert('Username o password errati!');
    }
}

// cerca utenti



function cerca() {
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('cercaUtenti').value.toUpperCase;
    ul = document.getElementById("utente");
    li = ul.getElementsByTagName('li');
    filter = document.getElementById('filter').value;
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName('a')[1];
        txtValue = a.textContent || a.innerText;
        if (ul) {
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = '';
            } else {
                li[i].style.display = "none";
            }
        }
    }
}

//        input=document.getElementById('cercaUtenti');
//        filter= input.value.toUpperCase();
//        let input, filter, ul, li, a, i, txtValue;
//     ul=document.getElementById("utente");
//     li=ul.getElementsByTagName('li');
//
//     for (i = 0; i < li.length; i++) {       
//     a = li[i].getElementsByTagName("a")[0];
//     txtValue = a.textContent || a.innerText;
//     if (txtValue.toUpperCase().indexOf(filter)>-1) {
//     li[i].style.display = "";
//    } else {
//     li[i].style.display = "none";
//   }
// }


// filtra utenti
/*  function getSelectedValue()
 {
     var selectedValue=document.getElementById("filtro").value;
     console.log(selectedValue);
 }
 getSelectedValue;
  */



/*operazioni CRUD*/

$(document).ready(function () {


    let $utente = $('#utente');
    let $id = $('#id');
    let $nome = $('#nome');
    let $cognome = $('#cognome');
    let $dataNascita = $('#dataNascita');



    let utenteTemplate = $('#utente-template').html();

    function addUtente(utente) {
        $utente.append(Mustache.render(utenteTemplate, utente));
    }

    // get utente 

    $.ajax({
        url: 'http://localhost:3000/utente',
        type: 'GET',
    }).then(function (utente) {
        $.each(utente, function (i, utente) {
            addUtente(utente);
        });
    });


    // post utente

    $('#add-utente').on('click', function () {
        let utente = {
            nome: $nome.val(),
            cognome: $cognome.val(),
            dataNascita: $dataNascita.val(),
        };

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/utente',
            data: utente,
            success: function (newUtente) {
                addUtente(newUtente);
            },
            error: function () {
                alert('errore caricamento nuovo utente');
            }
        });
    });


    //edit utente

    $('#myModal').on('click', '.editUtente', function () {
        var utente = $(this).closest('li').data('utente');
        $('input[nome="id"]').val(utente.id);
        $('input[nome="nome"]').val(utente.nome);
        $('input[nome="cognome"]').val(utente.cognome);
        $('input[nome="dataNasicta"]').val(utente.dataNascita);
    })

    $('editUtente').click(function () {
        var id = $('#id').val();
        $.ajax({
            url: 'http://localhost:3000/utente/' + id,
            type: 'PUT',
            data: $('#myForm').serialize(),
            success: function (newUtente) {
                addUtente(newUtente);
            },
            error: function () {
                alert('errore modifica utente');
            }

        });
    });




    //delete utente

    $utente.delegate('.remove', 'click', function () {
        let $li = $(this).closest('li');
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:3000/utente/' + $(this).attr('data-id'),
            success: function () {
                $li.remove();
                alert('Utente eliminato');
            }
        });
    });



    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
    });
});




