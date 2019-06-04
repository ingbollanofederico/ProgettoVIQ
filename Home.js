
function colorLink(x,y){
    let element=document.getElementById(x);
    element.style.color="rgba(150,0,0,1)";

    let contenitore=document.getElementById(y);
    contenitore.style.backgroundColor="azure";


}

function decolorLink(x, y){
    let element=document.getElementById(x);
    element.style.color="azure";

    let contenitore=document.getElementById(y);
    contenitore.style.backgroundColor="rgba(150,0,0,1)";

}


window.onload = function () {

    //grafico default pagina grafici
    Plotly.d3.csv("DATASET_REGIONI_MOD.csv", function (error, data) {

        //Creazione
        let regioni = [];
        let numHotel = [];
        let numBeb = [];
        let numExtra = [];

        for (let i = 0; i < data.length; i++) {
            let regione = data[i]["Regione"];
            regioni.push(regione);

            let hotel = data[i]["TotaleHotel"];
            numHotel.push(hotel);

            let beb = data[i]["TotaleBeB"];
            numBeb.push(beb);

            let extra = data[i]["TotaleAltreStrutture"];
            numExtra.push(extra);
        }
        console.log("A:" + regioni + " B:" + numHotel);

        trace1 = {
            name: "Hotel",
            y: numHotel,
            x: regioni,
            /*text:numHotel.map(String),
            textposition: 'outside',
            */
            hoverinfo: 'x+y',
            orientation: "v",
            type: "bar",

            marker: {color: 'salmon', opacity: 0.6},
        };
        trace2 = {
            name: "B&B",
            y: numBeb,
            x: regioni,
            /*text:numBeb.map(String),
            textposition: 'outside',*/
            hoverinfo: 'x+y',
            orientation: "v",
            type: "bar",

            marker: {color: 'blue', opacity: 0.6},
        };
        trace3 = {
            name: "Strutture Extra-Alberghiere",
            y: numExtra,
            x: regioni,
            /*text:numExtra.map(String),
            textposition: 'outside',*/
            hoverinfo: 'x+y',


            orientation: "v",
            type: "bar",

            marker: {color: 'gree', opacity: 0.6},
        };
        let layout = {

            margin: {t: 40, l: 70, r: 30, b: 100},

            hovermode: "x+y",

            legend: {
                y: 1.02, x: 0.5,
                yanchor: "bottom",
                xanchor: "center",
                orientation: "h",

            },


        };
        data = [trace1, trace2, trace3];

        Plotly.plot("graph", data, layout);

    });

}



