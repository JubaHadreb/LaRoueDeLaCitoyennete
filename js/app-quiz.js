$(function () {

    /*var url = window.location.search;
     var niveaux = url.substring(url.lastIndexOf("=") + 1);*/
    var niveaux = decodeURI($_GET('niveau'));
    var tours = decodeURI($_GET('tours'));
    var score = decodeURI($_GET('score'));
    var categories = ['SymbolesEtValeurs', 'PolitiqueEtSociete', 'Histoire', 'Geographie', 'Europe', 'DroitsEtDevoirs', 'CultureGenerale'];
    var theme = document.getElementById("theme");
    var rotate;
    var reponse;
    var validation = true;
    $('#points li:nth-child(-n+' + tours + ')').css('background-color', '#fff');
    /*********************Selection du niveau d'étude*********************/

    if (niveaux === 'Sixieme') {
        niveau = CARTES[0];
    } else if (niveaux === 'Cinquieme') {
        niveau = CARTES[1];
    } else {
        document.location.href = "menu.html";
    }

    /*********************Selection de la categorie*********************/

    RandomCategorie = Math.floor((Math.random() * categories.length) + 1);
    NumeroCategorie = RandomCategorie - 1;
    NomCategorie = categories[NumeroCategorie];
    categorie = niveau.Categorie[NumeroCategorie];
    /*********************Selection de la question*********************/

    RandomQuestion = Math.floor((Math.random() * 4) + 1);
    NumeroQuestion = RandomQuestion - 1;
    if (NomCategorie === 'SymbolesEtValeurs') {
        question = categorie.SymbolesEtValeurs[NumeroQuestion];
        theme.src = "img/symbolesetvaleurs.png";
        rotate = '-660deg';
    } else if (NomCategorie === 'PolitiqueEtSociete') {
        question = categorie.PolitiqueEtSociete[NumeroQuestion];
        theme.src = "img/politiqueetsociete.png";
        rotate = '-870deg';
    } else if (NomCategorie === 'Histoire') {
        question = categorie.Histoire[NumeroQuestion];
        theme.src = "img/histoire.png";
        rotate = '-720deg';
    } else if (NomCategorie === 'Geographie') {
        question = categorie.Geographie[NumeroQuestion];
        theme.src = "img/geographie.png";
        rotate = '-780deg';
    } else if (NomCategorie === 'Europe') {
        question = categorie.Europe[NumeroQuestion];
        theme.src = "img/europe.png";
        rotate = '-840deg';
    } else if (NomCategorie === 'DroitsEtDevoirs') {
        question = categorie.DroitsEtDevoirs[NumeroQuestion];
        theme.src = "img/droitsetdevoirs.png";
        rotate = '-930deg';
    } else if (NomCategorie === 'CultureGenerale') {
        question = categorie.CultureGenerale[NumeroQuestion];
        theme.src = "img/culturegenerale.png";
        rotate = '-960deg';
    } else {
        document.location.href = "menu.html";
    }

    var tplcarte = Handlebars.compile($('#carte').html());
    $('#question').html(tplcarte(question));
    /*********************Selection réponse*********************/

    document.getElementById('ReponseA').onclick = function () {
        $('#ReponseA').css('color', '#fff');
        $('#ReponseA').css('background-color', '#FF8C00');
        $('#ReponseB').css('color', '#0776bb');
        $('#ReponseB').css('background-color', '#fff');
        $('#ReponseC').css('color', '#0776bb');
        $('#ReponseC').css('background-color', '#fff');
        document.getElementById("validation").innerHTML = '';
        document.getElementById("validation").innerHTML = 'Valider';
        reponse = 'ReponseA';
    };
    document.getElementById('ReponseB').onclick = function () {
        $('#ReponseA').css('color', '#0776bb');
        $('#ReponseA').css('background-color', '#fff');
        $('#ReponseB').css('color', '#fff');
        $('#ReponseB').css('background-color', '#FF8C00');
        $('#ReponseC').css('color', '#0776bb');
        $('#ReponseC').css('background-color', '#fff');
        document.getElementById("validation").innerHTML = '';
        document.getElementById("validation").innerHTML = 'Valider';
        reponse = 'ReponseB';
    };
    document.getElementById('ReponseC').onclick = function () {
        $('#ReponseA').css('color', '#0776bb');
        $('#ReponseA').css('background-color', '#fff');
        $('#ReponseB').css('color', '#0776bb');
        $('#ReponseB').css('background-color', '#fff');
        $('#ReponseC').css('color', '#fff');
        $('#ReponseC').css('background-color', '#FF8C00');
        document.getElementById("validation").innerHTML = '';
        document.getElementById("validation").innerHTML = 'Valider';
        reponse = 'ReponseC';
    };
    /*********************Animation de la roue*********************/

    document.getElementById('discs').classList.toggle('expand');
    var scale = 1;
    setInterval(function () {
        scale = scale === 1 ? 1.5 : 1;
        $('#lancer').css('transform', 'scale(' + scale + ')');
    }, 1000);
    document.getElementById('discs').onclick = function () {
        document.getElementById('granddisc').style.transform = 'rotate(' + rotate + ')';
        document.getElementById('granddisc').classList.toggle('rotated');
        $("#lancer").fadeTo("slow", 0);
        setTimeout(
                function () {
                    $("#theme").fadeTo("slow", 1);
                    $('#theme').css('transform', 'scale(1)');
                }, 2000);
        setTimeout(
                function () {
                    $("#discs").fadeTo("fast", 0);
                    $('#discs').css('transform', 'scale(0)');
                }, 4000);
        setTimeout(
                function () {
                    $('#discanimation').css('display', 'none');
                }, 4600);
        setTimeout(
                function () {
                    $('#pointeur_raw').css('display', 'none');
                }, 4600);
        setTimeout(
                function () {
                    $('#question').fadeTo("fast", 1);
                    /*********************Compteur et validation réponse*********************/

                    var counter = 29;
                    var intervalId = null;
                    var functionAction;
                    function action()
                    {
                        tours++;
                        clearInterval(intervalId);
                        document.getElementById("secondes").innerHTML = "00";
                        $('#secondes').css('color', '#f00');
                        if (question.BonneReponse === reponse) {
                            $('#' + reponse).css('color', '#fff');
                            $('#' + reponse).css('background-color', '#5BB949');
                            score++;
                        } else {
                            $('#' + question.BonneReponse).css('color', '#fff');
                            $('#' + question.BonneReponse).css('background-color', '#5BB949');
                            $('#' + reponse).css('color', '#fff');
                            $('#' + reponse).css('background-color', '#f00');
                        }

                        setTimeout(
                                function () {
                                    $("#question").fadeTo("slow", 0);
                                }, 2000);
                        setTimeout(
                                function () {
                                    $('#question').empty();
                                    var tplexplications = Handlebars.compile($('#reponse').html());
                                    $('#question').html(tplexplications(question));
                                    if (tours === 11) {
                                        document.getElementById("suivant").innerHTML = '';
                                        document.getElementById("suivant").innerHTML = 'Score final';
                                    }
                                    $("#question").fadeTo("fast", 1);
                                    /*********************Passer à la question suivante*********************/

                                    document.getElementById('suivant').onclick = function () {
                                        $("#question").fadeTo("slow", 0);
                                        if (tours < 11) {
                                            setTimeout(
                                                    function () {
                                                        document.location.href = "quiz.html?niveau=" + niveaux + "&tours=" + tours + "&score=" + score;
                                                    }, 500);
                                        } else {
                                            $("#bandeau").fadeTo("slow", 0);
                                            $("#question").fadeTo("slow", 0);
                                            setTimeout(
                                                    function () {
                                                        document.location.href = "score.html?niveau=" + niveaux + "&score=" + score;
                                                    }, 1000);
                                        }
                                    };
                                }, 2800);
                    }
                    function bip()
                    {
                        if (validation === true) {
                            if (counter >= 10) {
                                document.getElementById("secondes").innerHTML = counter;
                            } else {
                                document.getElementById("secondes").innerHTML = '0' + counter;
                            }
                            counter--;
                        } else {
                            clearInterval(intervalId);
                            clearInterval(functionAction);
                        }
                    }
                    intervalId = setInterval(bip, 1000);
                    functionAction = setTimeout(action, (counter + 1) * 1000);
                }, 4800);
    };
    /*********************Valider manuellement la réponse ou passer*********************/

    document.getElementById('validation').onclick = function () {
        validation = false;
        tours++;
        if (document.getElementById("validation").innerHTML === 'Passer') {
            $('#' + question.BonneReponse).css('color', '#fff');
            $('#' + question.BonneReponse).css('background-color', '#f00');
        } else {
            if (question.BonneReponse === reponse) {
                $('#' + reponse).css('color', '#fff');
                $('#' + reponse).css('background-color', '#5BB949');
                score++;
            } else {
                $('#' + question.BonneReponse).css('color', '#fff');
                $('#' + question.BonneReponse).css('background-color', '#5BB949');
                $('#' + reponse).css('color', '#fff');
                $('#' + reponse).css('background-color', '#f00');
            }
        }
        setTimeout(
                function () {
                    $("#question").fadeTo("slow", 0);
                }, 2000);
        setTimeout(
                function () {
                    $('#question').empty();
                    var tplexplications = Handlebars.compile($('#reponse').html());
                    $('#question').html(tplexplications(question));
                    if (tours === 11) {
                        document.getElementById("suivant").innerHTML = '';
                        document.getElementById("suivant").innerHTML = 'Score final';
                    }
                    $("#question").fadeTo("fast", 1);
                    /*********************Passer à la question suivante*********************/

                    document.getElementById('suivant').onclick = function () {
                        $("#question").fadeTo("slow", 0);
                        if (tours < 11) {
                            setTimeout(
                                    function () {
                                        document.location.href = "quiz.html?niveau=" + niveaux + "&tours=" + tours + "&score=" + score;
                                    }, 500);
                        } else {
                            $("#bandeau").fadeTo("slow", 0);
                            $("#question").fadeTo("slow", 0);
                            setTimeout(
                                    function () {
                                        document.location.href = "score.html?niveau=" + niveaux + "&score=" + score;
                                    }, 1000);
                        }
                    };
                }, 2800);
    };

    /***Revenir sur le menu principal***/

    $(document).on('click', '#retour', function () {
        document.location.href = "menu.html";
    });

});