let select2 = $('.matches');

select2.select2();

if ($('.add-forecast').length > 0 ) {
    $.get( "https://cors-anywhere.herokuapp.com/https://part.sport1xbet.com/PartLine/GetAllGames", { lng: "ru"} )
        .done(function( data ) {
            $.each(data, function (key, value) {
                var start = value.Start.slice(6);
                start = start.slice(0, -2);

                var data = {
                    id: key,
                    text: value.Home + ' - ' + value.Away,
                    start: start,
                    liga: value.Liga,
                    sport: value.Sport,
                    h: value.H,
                    d: value.D,
                    a: value.A,
                    hd: value.HD,
                    ha: value.HA,
                    ad: value.AD,
                    tp: value.TP,
                    to: value.TO,
                    tu: value.TU,
                    hp: value.HP,
                    hf: value.HF,
                    ap: value.AP,
                    af: value.AF,
                };

                var newOption = new Option(data.text, data.id, false, false);
                newOption.setAttribute('data-title', data.text);
                newOption.setAttribute('data-start', data.start);
                newOption.setAttribute('data-liga', data.liga);
                newOption.setAttribute('data-sport', data.sport);
                newOption.setAttribute('data-h', data.h);
                newOption.setAttribute('data-d', data.d);
                newOption.setAttribute('data-a', data.a);
                newOption.setAttribute('data-hd', data.hd);
                newOption.setAttribute('data-ha', data.ha);
                newOption.setAttribute('data-ad', data.ad);
                newOption.setAttribute('data-tp', data.tp);
                newOption.setAttribute('data-to', data.to);
                newOption.setAttribute('data-tu', data.tu);
                newOption.setAttribute('data-hp', data.hp);
                newOption.setAttribute('data-hf', data.hf);
                newOption.setAttribute('data-ap', data.ap);
                newOption.setAttribute('data-af', data.af);
                select2.append(newOption);
            });
            select2.val('0'); // Select the option with a value of '1'
            select2.trigger('change');
            updateMatchData($('.matches option:selected')[0].dataset);
        });
}

select2.on('select2:select', function (e) {
    var data = e.params.data;
    updateMatchData(data.element.dataset);
});

function updateMatchData(option) {
    $.each(option, function (key, value) {
        if (value == 'null' || value == 'undefined') {
            $('#'+key+'-value').find('strong').html('');
        }
        else if (key === 'start') {
            var start = Number(value);
            start = new Date(start);
            $('#'+key+'-value').find('strong').html(start.getDate() + '.' + ("0" + (start.getMonth() + 1)).slice(-2) + '.' + start.getFullYear() + ' ' +
                start.getHours() + ':' + (start.getMinutes()<10?'0':'') + start.getMinutes());

            $('.' + key + '-value').val(start.getFullYear() + '-' + ("0" + (start.getMonth() + 1)).slice(-2) + '-' + start.getDate() + ' ' + start.getHours() + ':' + (start.getMinutes()<10?'0':'') + start.getMinutes());
        }
        else {
            $('#'+key+'-value').find('strong').html(value);

            $('.' + key + '-value').val(value);
        }
    });
}

$("#add-match").on('click', function(e) {
    e.preventDefault();

    var matchData = $('.matches option:selected')[0].dataset;
    var typeBet = $('select[name=type_bet] option:selected').val();

    var title = matchData.title;
    var coeff = matchData[typeBet];

    $('.list-matches').append("<p>"+title+" / Коэф: "+ coeff +"</p>")
    $('.list-matches').append("<input type='hidden' class='coeffs' value='"+coeff+"'>");

    var total = 1;
    $.each($('.coeffs'), function(key, value){
        total *= $(value).val();
    });
    total = total.toFixed(2);
    $('#total strong').html(total);
    $('#total-input').val(total);

    $('.matches option:selected').remove();
    select2.val(Math.round(total)); // Select the option with a value of '1'
    select2.trigger('change');
});