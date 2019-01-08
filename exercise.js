$Meteoclimate = "http://pixel.uji.es/meteo/api/api.php/stations";
$JSONProxy = "https://jsonp.afeld.me/?callback=?&url=";

//Event to Populate UI of MateoClimatePage
$(document).on("pagebeforeshow", "#mateoClimatePage", function(e) {
    e.preventDefault();

    $.getJSON($JSONProxy + $Meteoclimate, function(data) {

        $colHeads = [];
        $colHeadsIndex = [];
        $colHeadsPriority = [];

        $MC = $('#MateoClimate span');
        $MC.each($l => {
            // get the columns required in the table
            $colHeads.push($($MC[$l]).attr('data-metro-colname'));
        });
        $MH = $('#MateoClimate th');
        $MH.each($l => {
            // get the columns priority in the table
            $colHeadsPriority.push($($MH[$l]).attr('data-priority'));
        });
        $colHeads.forEach(h => { $colHeadsIndex.push(data.stations.columns.indexOf(h)) }); // find the indexof column that are in the main display
        console.log(data);
        // Populating table
        data.stations.records.forEach(row => {
            // adding rows
            $tr = $('<tr>');
            $colHeadsIndex.forEach(i => { $tr.append($('<td><span>' + row[i] + '</span></td>')) });
            $tr.appendTo($('#MateoClimate > tbody:last-child'));
            $tr.children().each(c => {
                $($tr.children()[c]).addClass('ui-table-priority-' + $colHeadsPriority[c])
            })
        })
    });
});