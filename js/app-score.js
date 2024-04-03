$(function () {

    var niveaux = decodeURI($_GET('niveau'));
    var score = decodeURI($_GET('score'));
    var remarque;

    document.getElementById("notation").innerHTML = score + '/10';

    if (score === '0' | score === '1' | score === '2' | score === '3' | score === '4') {
        document.getElementById("remarque").innerHTML = "Il va falloir s'entrainer!";
    } else if (score === '5' | score === '6' | score === '7') {
        document.getElementById("remarque").innerHTML = "Tu peux mieux faire!";
    } else if (score === '8' | score === '9') {
        document.getElementById("remarque").innerHTML = "Bravo!";
    } else {
        document.getElementById("remarque").innerHTML = "Excellent!";
    }

    document.getElementById('rejouer').onclick = function () {
        $("#appreciation").fadeTo("fast", 0);
        $("#note").fadeTo("fast", 0);
        $("#boutons_exit").fadeTo("fast", 0);
        setTimeout(
                function () {
                    document.location.href = "quiz.html?niveau=" + niveaux + "&tours=1&score=0";
                }, 1000);
    };

    document.getElementById('menu_principal').onclick = function () {
        $("#appreciation").fadeTo("fast", 0);
        $("#note").fadeTo("fast", 0);
        $("#boutons_exit").fadeTo("fast", 0);
        setTimeout(
                function () {
                    document.location.href = "menu.html";
                }, 1000);
    };

    $("#appreciation").fadeTo("fast", 1);
    $("#note").fadeTo("fast", 1);
    $("#boutons_exit").fadeTo("fast", 1);

});