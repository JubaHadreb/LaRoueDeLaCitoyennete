$(function () {

    /***Aller sur les niveaux scolaires***/
    $(document).on('click', '.jouer', function () {

        $('#menus').empty();

        var tplmenuniveau = Handlebars.compile($('#menu_niveau').html());
        $('#menus').append(tplmenuniveau);

    });

    /***Revenir sur le menu principal***/
    $(document).on('click', '.retour_principal', function () {

        $('#menus').empty();

        var tplmenuprincipal = Handlebars.compile($('#menu_principal').html());
        $('#menus').append(tplmenuprincipal);

    });

    /***Aller sur les classes dans le collège***/
    $(document).on('click', '.college', function () {

        $('#menus').empty();

        var tplmenucollege = Handlebars.compile($('#menu_college').html());
        $('#menus').append(tplmenucollege);

    });

    /***Revenir sur le menu des niveaux scolaires***/
    $(document).on('click', '.retour_niveau', function () {

        $('#menus').empty();

        var tplmenuniveau = Handlebars.compile($('#menu_niveau').html());
        $('#menus').append(tplmenuniveau);

    });

    /***Aller sur les quiz***/
    $(document).on('click', '.6eme', function () {
        document.location.href = "quiz.html?niveau=Sixieme&tours=1&score=0";
    });
    
    $(document).on('click', '.5eme', function () {
        document.location.href = "quiz.html?niveau=Cinquieme&tours=1&score=0";
    });

});