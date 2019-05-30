function visibilityStelle(x){

    if(x!="TotaleHotel")

        document.f.sceltaStelle.style.visibility="hidden";

    else
        document.f.sceltaStelle.style.visibility="visible";
}

function loadASync(url, success) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4)
            if (okStatus(this.status)) {
                success(this.responseText);
            } else {
                throw "Async request failed (response: " + this.status + ":" + this.statusText + ") for URL " + url;
            }
    };
    xhr.send();
}

function csvParse(csv) {
    'use strict';
    let csvRE = /(,|^|\n|\r|\r\n)[ \t]*(?:([^",\n\r]*)|"((?:[^"]*|"")*)")[ ( \r)]*/g;
    let heads = [], rows = [];
    let row, col, line = -1;
    while (true) {
        let match = csvRE.exec(csv);
        if (!match) break;
        if (match[1] !== ',') {
            if (row) rows.push(row);
            line++;
            row = line && {};
            col = 0;
        }
        let cell = match[2] ||
            (match[3] || "").replace(/""/g, '"');
        if (line === 0) heads.push(cell);
        else row[heads[col++] || "C" + col] = cell;
    }

    if (JSON.stringify(row) !== "{}") rows.push(row);
    return rows;
}

function tableToHtmlElement(data) {
    let res = document.createElement("table");
    let html = "<tr>";
    for (let h in data[0])
        if (data[0].hasOwnProperty(h))
            html += "<th>" + h + "</th>";
    html += "</tr>";
    for (let i = 0; i < data.length; ++i) {
        html += "<tr>";
        for (let f in data[i])
            if (data[i].hasOwnProperty(f))
                html += "<td>" + data[i][f] + "</td>";
        html += "</tr>";
    }
    html += "</table>";
    res.innerHTML = html;
    return res;
}

function okStatus(s) {
    return [200, 304].indexOf(s) >= 0;
}


window.onload = function () {
    loadASync("DATASET_PROVINCE_MOD.csv", function (data) {

        let csv = csvParse(data);
        console.log(csv);
        let tableElement = tableToHtmlElement(csv);
        let originalTabProvince = document.getElementById('originalTabProvince');
        originalTabProvince.append(tableElement);
    });

    loadASync("DATASET_REGIONI_MOD.csv", function (data) {

        let csv = csvParse(data);
        console.log(csv);
        let tableElement = tableToHtmlElement(csv);
        let originalTabRegioni = document.getElementById('originalTabRegioni');
        originalTabRegioni.append(tableElement);
    });

    Plotly.d3.csv("DATASET_REGIONI_MOD.csv", function (error, data) {
            //Creazione
            let regioni = [];
            let numHotel = [];

            for (let i = 0; i < data.length; i++) {
                let regione = data[i]["Regione"];
                regioni.push(regione);

                let hotel = data[i]["TotaleHotel"];
                numHotel.push(hotel);
            }
            console.log("A:" + regioni + " B:" + numHotel);

            let trace = [{
                name: "province",
                y: numHotel,
                x: regioni,
                orientation: "v",
                type: "bar",

                marker: {color: 'salmon'},
            }];
            let layout = {

                margin: {t: 40, l: 70, r: 30, b: 100},

                hovermode: "y",

                legend: {
                    y: 1.02, x: 0.5,
                    yanchor: "bottom",
                    xanchor: "center",
                    orientation: "h",
                }
            };
            Plotly.plot("graph", trace, layout);
        });
};


function grafico(f1){


    let regione = f1.sceltaLuogo.value; //italia vs regioni
    let struttura = f1.sceltaStrutture.value; //hotel beb altri

    if(struttura==="Hotel"){
        let stelle = f1.sceltaStelle.value; //stelle attive se hotel
    }

    let turisti = f1.turisti.checked; //checked turisti


    if(regione==="Regione") {

        Plotly.d3.csv("DATASET_REGIONI_MOD.csv", function (error, data) {
            //Creazione
            let regioni = [];
            let numStruttura = [];

            if(turisti) {
                var numTuristi = [];
            }


            for (let i = 0; i < data.length; i++) {
                let reg = data[i][regione];
                regioni.push(reg);


                let strut = data[i][struttura];
                numStruttura.push(strut);

                if(turisti) {
                    let tur = data[i]["Presenze2017"];
                    numTuristi.push(tur);
                }

            }
            console.log("R: "+regioni+" S: "+numStruttura+" T: "+numTuristi);


             trace1 = [{
                name: "regioni",
                y: numStruttura,
                x: regioni,
                orientation: "v",
                type: "bar",

                marker: {color: 'salmon'},
            }];

            if(turisti) {
                trace2 = [{
                    name: "regioni",
                    y: numTuristi,
                    x: regioni,
                    orientation: "v",
                    type: "bar",

                    marker: {color: 'blue'},
                }];
            }

            if(turisti){
                var layout1 = {

                    margin: {t: 40, l: 70, r: 30, b: 100},

                    barmode: "group",

                    hovermode: "y",

                    legend: {
                        y: 1.02, x: 0.5,
                        yanchor: "bottom",
                        xanchor: "center",
                        orientation: "h",
                    },

                }
            }else{
                    var layout2 = {

                        margin: {t: 40, l: 70, r: 30, b: 100},

                        hovermode: "y",

                        legend: {
                            y: 1.02, x: 0.5,
                            yanchor: "bottom",
                            xanchor: "center",
                            orientation: "h",
                        },
                }
            }

            if(turisti){
                let data = [trace1,trace2];
                Plotly.plot("graph", data, layout1);
            }else{
                Plotly.plot("graph", trace1, layout2);
            }
        });
    }
    /*else{

        DA FARE IL CASO DELLE PROVINCE UNA AD UNA

    }*/

}



