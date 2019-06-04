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

function visibilityStelle(x,y){
if(y==="sceltaStrutture1"){
    if(x!="TotaleHotel") {
        document.f.sceltaStelle1.style.visibility="hidden";
    }

    else
        document.f.sceltaStelle1.style.visibility="visible";
}
else if(y==="sceltaStrutture2"){
    if(x!="TotaleHotel") {
        document.f3.sceltaStelle2.style.visibility="hidden";
    }

    else
        document.f3.sceltaStelle2.style.visibility="visible";
}

}
window.onload = function () {

    //grafico default pagina grafici
    Plotly.d3.csv("DATASET_REGIONI_MOD.csv", function (error, data) {

        visibilityStelle("TutteLeStrutture", "sceltaStrutture1");
        //Creazione
        let regioni = [];
        let numHotel = [];
        let numBeb=[];
        let numExtra=[];

        for (let i = 0; i < data.length; i++) {
            let regione = data[i]["Regione"];
            regioni.push(regione);

            let hotel = data[i]["TotaleHotel"];
            numHotel.push(hotel);

            let beb=data[i]["TotaleBeB"];
            numBeb.push(beb);

            let extra=data[i]["TotaleAltreStrutture"];
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
            hoverinfo:'x+y',
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
            hoverinfo:'x+y',
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
            hoverinfo:'x+y',


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
        data=[trace1, trace2, trace3];

        Plotly.plot("graph", data, layout);

    });

    //grafico default 2 pagina grafici
    Plotly.d3.csv("DATASET_REGIONI_MOD.csv", function (error, data) {
        //Creazione
        let regioni = [];
        let numPresenze = [];

        for (let i = 0; i < data.length; i++) {
            let regione = data[i]["Regione"];
            regioni.push(regione);

            let presenze = data[i]["Presenze2017"];
            numPresenze.push(presenze);
        }
        console.log("A:" + regioni + " B:" + numPresenze);

        let trace = [{
            name: "province",
            y: numPresenze,
            x: regioni,
            text:numPresenze.map(String),
            textposition: 'outside',
            hoverinfo:'none',
            orientation: "v",
            type: "bar",

            marker: {color: 'blue', opacity: 0.6},
        }];
        let layout = {
            updatemenus: [{
                y: 0.8,
                yanchor: 'top',
                buttons: [{
                    method: 'restyle',
                    args: ['marker.color', 'red'],
                    label: 'rosso'
                }, {
                    method: 'restyle',
                    args: ['marker.color', 'blue'],
                    label: 'blu'
                }, {
                    method: 'restyle',
                    args: ['marker.color', 'Cividis'],
                    label: 'giallo'
                },{
                    method: 'restyle',
                    args: ['marker.color', 'green'],
                    label: 'verde'
                }]
            }],
            margin: {t: 40, l: 70, r: 30, b: 100},

            hovermode: "y",

            legend: {
                y: 1.02, x: 0.5,
                yanchor: "bottom",
                xanchor: "center",
                orientation: "h",
            }
        };
        Plotly.plot("graphTuristi", trace,layout)

    });
    //GRAFICO mappa prova 1

    Plotly.d3.csv("DATASET_REGIONI.csv", function (error, data) {
        //Creazione
        visibilityStelle("FlussiTuristici", "sceltaStrutture2");
        var regioni = [];
        var numPresenze = [];
        var latitude =[];
        var longitude=[];
        var hovertext=[];

        for (let i = 0; i < data.length; i++) {
            let regione = data[i]["Regione"];
            regioni.push(regione);

            let presenze = data[i]["FlussiPresenze2017"];
            pres=presenze/100000;
            numPresenze.push(pres);

            let txt=regione+"<br>Turisti: "+presenze;
            hovertext.push(txt);

            let lat =data[i]["Latitude"];
            latitude.push(lat);

            let lon =data[i]["Longitude"];
            longitude.push(lon);

        }
        debug:  console.log("A:" + regioni + " Geo: "+latitude+" - "+ longitude+" B:"+ numPresenze);

        let trace = [{
            type: 'scattergeo',
            mode: 'markers+text',
            hoverinfo: 'text',
            hovertext: hovertext,
            lon: longitude,
            lat: latitude,

            //text: regioni,
            marker: {
                size: numPresenze,
                sizemode: 'area',
                sizemin: 0,
                sizeref: 1,
                color: numPresenze,
                cmin: 0,
                cmax: 100,
                colorscale: 'Cividis',

                line: {
                    color: 'black'
                },
            },
            name: 'Citta italiane'
        }];
        let layout = {
            margin: {t: 40, l: 70, r: 30, b: 100},

            title: 'Presenze 2017 italia',
            geo: {
                scope: 'europe',
            },

            updatemenus: [{
                y: 0.8,
                yanchor: 'top',
                buttons: [{
                    method: 'restyle',
                    args: ['marker.colorscale', 'Bluered'],
                    label: 'rosso'
                }, {
                    method: 'restyle',
                    args: ['marker.colorscale', 'Blues'],
                    label: 'blu'
                },{
                    method: 'restyle',
                    args: ['marker.colorscale', 'Cividis'],
                    label: 'giallo'
                }, {
                    method: 'restyle',
                    args: ['marker.colorscale', 'Greens'],
                    label: 'verde'
                }]
            }]


        };

        Plotly.plot("graphMappa", trace, layout);
    });


};


function grafico (f1){

    Plotly.purge("graph");

    var regione = f1.sceltaLuogo.value; //italia vs regioni
    var struttura = f1.sceltaStrutture1.value; //hotel beb altri

    //attivo le strelle per gli hotel##########################
    if (struttura === "TotaleHotel") {
        struttura = f1.sceltaStelle.value; //stelle attive se hotel

    }

    if(regione==="Regione"){
        if(struttura==="TutteStrutture"){
            //grafico con 3 trace##############################################################################
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
                    updatemenus: [{
                        y: 0.8,
                        yanchor: 'top',
                        buttons: [{
                            method: 'restyle',
                            args: ['marker.color', 'red'],
                            label: 'rosso'
                        }, {
                            method: 'restyle',
                            args: ['marker.color', 'blue'],
                            label: 'blu'
                        }, {
                            method: 'restyle',
                            args: ['marker.color', 'Cividis'],
                            label: 'giallo'
                        },{
                            method: 'restyle',
                            args: ['marker.color', 'green'],
                            label: 'verde'
                        }]
                    }],
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
        }else{
            //grafico per italia con hotel, b&b o altro####################################################################
            Plotly.d3.csv("DATASET_REGIONI_MOD.csv", function (error, data) {
                //Creazione
                let regioni = [];
                let numStruttura = [];


                for (let i = 0; i < data.length; i++) {
                    if (data[i][struttura] != 0) { //NON BISGONA METTERE !== PERCHE' QUESTI ZERI DEL CSV SONO STRINGHE E NON COINCIDEREBBERO COL TIPO

                        let reg = data[i][regione];
                        regioni.push(reg);


                        let strut = data[i][struttura];
                        numStruttura.push(strut);
                    }

                }


                console.log("R: " + regioni + " S: " + numStruttura);


                var trace = [{
                    name: "Strutture",
                    y: numStruttura,
                    x: regioni,
                    text: numStruttura.map(String),//NUMERO CORRISPONDENTE A BARRA
                    textposition: 'outside', //ETICHETTA NUMERO SOPRA BARRA
                    hoverinfo: 'none',//NESSUNA INFO FACENDO HOVER SU BARRA
                    orientation: "v",
                    type: "bar",

                    marker: {color: 'salmon', opacity: 0.6},
                }];


                var layout = {
                    updatemenus: [{
                        y: 0.8,
                        yanchor: 'top',
                        buttons: [{
                            method: 'restyle',
                            args: ['marker.color', 'red'],
                            label: 'rosso'
                        }, {
                            method: 'restyle',
                            args: ['marker.color', 'blue'],
                            label: 'blu'
                        }, {
                            method: 'restyle',
                            args: ['marker.color', 'Cividis'],
                            label: 'giallo'
                        },{
                            method: 'restyle',
                            args: ['marker.color', 'green'],
                            label: 'verde'
                        }]
                    }],

                    margin: {t: 40, l: 70, r: 30, b: 100},

                    hovermode: "y",

                    /*legend: {
                        y: 1.02, x: 0.5,
                        yanchor: "bottom",
                        xanchor: "center",
                        orientation: "h",
                    },*/
                }


                Plotly.plot("graph", trace, layout);

            });
        }
    }else{
        if(struttura==="TutteStrutture"){
            //grafico per province con 3 trace############################################
            Plotly.d3.csv("DATASET_PROVINCE_MOD.csv", function (error, data) {
                //Creazione
                let province = [];
                let numHotel = [];
                let numBeb = [];
                let numExtra = [];

                for (let i = 0; i < data.length; i++) {
                    if(data[i]["Regione"]==regione) {
                        if (data[i]["TotaleHotel"] != 0 && data[i]["TotaleBeB"] != 0 && data[i]["TotaleAltreStrutture"] != 0) {
                            let provincia = data[i]["Provincia"];
                            province.push(provincia);

                            let hotel = data[i]["TotaleHotel"];
                            numHotel.push(hotel);

                            let beb = data[i]["TotaleBeB"];
                            numBeb.push(beb);

                            let extra = data[i]["TotaleAltreStrutture"];
                            numExtra.push(extra);
                        }
                    }
                }


                trace1 = {
                    name: "Hotel",
                    y: numHotel,
                    x: province,
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
                    x: province,
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
                    x: province,
                    /*text:numExtra.map(String),
                    textposition: 'outside',*/
                    hoverinfo: 'x+y',


                    orientation: "v",
                    type: "bar",

                    marker: {color: 'green', opacity: 0.6},
                };
                let layout = {
                    updatemenus: [{
                        y: 0.8,
                        yanchor: 'top',
                        buttons: [{
                            method: 'restyle',
                            args: ['marker.color', 'red'],
                            label: 'rosso'
                        }, {
                            method: 'restyle',
                            args: ['marker.color', 'blue'],
                            label: 'blu'
                        }, {
                            method: 'restyle',
                            args: ['marker.color', 'Cividis'],
                            label: 'giallo'
                        },{
                            method: 'restyle',
                            args: ['marker.color', 'green'],
                            label: 'verde'
                        }]
                    }],

                    margin: {t: 40, l: 70, r: 30, b: 100},

                    hovermode: "x+y",

                    legend: {
                        y: 1.02, x: 0.5,
                        yanchor: "bottom",
                        xanchor: "center",
                        orientation: "v",

                    },


                };
                data = [trace1, trace2, trace3];
                Plotly.plot("graph", data, layout);
            });
        }else{
            //grafico per province con hotel, b&b o altro##########################################
            Plotly.d3.csv("DATASET_PROVINCE_MOD.csv", function (error, data) {
                //Creazione
                let province = [];
                let numStruttura = [];

                console.log(regione);

                for (let i = 0; i < data.length; i++) {
                    console.log(data[i]["Regione"]);
                    if (data[i]["Regione"] === regione) {
                        if (data[i][struttura] != 0) { //NON BISGONA METTERE !== PERCHE' QUESTI ZERI DEL CSV SONO STRINGHE E NON COINCIDEREBBERO COL TIPO

                            console.log(data[i][struttura]);
                            let prov = data[i]["Provincia"];
                            province.push(prov);
                            let strut = data[i][struttura];
                            numStruttura.push(strut);
                        }
                    }
                }
                console.log("P: " + province + " S: " + numStruttura);


                var trace = [{
                    name: "Strutture",
                    y: numStruttura,
                    x: province,
                    text: numStruttura.map(String),//NUMERO CORRISPONDENTE A BARRA
                    textposition: 'outside', //ETICHETTA NUMERO SOPRA BARRA
                    hoverinfo: 'none', //NESSUNA INFO FACENDO HOVER SU BARRA
                    orientation: "v",
                    type: "bar",

                    marker: {color: 'salmon', opacity: 0.6},
                }];


                var layout = {

                    margin: {t: 40, l: 70, r: 30, b: 100},

                    hovermode: "y",

                    /*legend: {
                        y: 1.02, x: 0.5,
                        yanchor: "bottom",
                        xanchor: "center",
                        orientation: "h",
                    },*/
                }


                Plotly.plot("graph", trace, layout);

            });
        }
    }
}

function graficoTuristi(f1) {

    Plotly.purge("graphTuristi");

    var regione = f1.sceltaLuogo.value; //italia vs regioni


    if (regione === "Regione") {

        Plotly.d3.csv("DATASET_REGIONI_MOD.csv", function (error, data) {
            //Creazione
            let regioni = [];
            let numPresenze = [];

            for (let i = 0; i < data.length; i++) {
                let reg = data[i][regione];
                regioni.push(reg);

                let presenze = data[i]["Presenze2017"];
                numPresenze.push(presenze);
            }
            console.log("A:" + regioni + " B:" + numPresenze);

            let trace = [{
                name: "provinceTuristi",
                y: numPresenze,
                x: regioni,
                text:numPresenze.map(String),//NUMERO CORRISPONDENTE A BARRA
                textposition: 'outside',//ETICHETTA NUMERO SOPRA BARRA
                hoverinfo:'none',//NESSUNA INFO FACENDO HOVER SU BARRA
                orientation: "v",
                type: "bar",

                marker: {color: 'blue', opacity: 0.6},
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
            Plotly.plot("graphTuristi", trace, layout);
        });

    } else {

        Plotly.d3.csv("DATASET_PROVINCE_MOD.csv", function (error, data) {
            //Creazione
            let prov = [];
            let numPres = [];


            for (let i = 0; i < data.length; i++) {
                if (data[i]["Regione"] === regione) {

                    let pro = data[i]["Provincia"];
                    prov.push(pro);

                    let presenze = data[i]["Presenze2017"];
                    numPres.push(presenze);
                }
            }

            console.log("P: " + prov + " S: " + numPres);


            var trace = [{
                name: "TuristiProvince",
                y: numPres,
                x: prov,
                text: numPres.map(String),//NUMERO CORRISPONDENTE A BARRA
                textposition: 'outside', //ETICHETTA NUMERO SOPRA BARRA
                hoverinfo: 'none', //NESSUNA INFO FACENDO HOVER SU BARRA
                orientation: "v",
                type: "bar",

                marker: {color: 'blue', opacity: 0.6},
            }];


            var layout = {

                margin: {t: 40, l: 70, r: 30, b: 100},

                hovermode: "y",

                /*legend: {
                    y: 1.02, x: 0.5,
                    yanchor: "bottom",
                    xanchor: "center",
                    orientation: "h",
                },*/
            }


            Plotly.plot("graphTuristi", trace, layout);


        });
    }

}


function graficoMappa(f1) {

    Plotly.purge("graphMappa");

    var regione = f1.sceltaLuogo.value; //italia vs regioni

    var struttura = f1.sceltaStrutture2.value; //hotel beb altri

    //attivo le strelle per gli hotel##########################
    if (struttura === "TotaleHotel") {
        struttura = f1.sceltaStelle2.value; //stelle attive se hotel

    }


    if (regione === "Regione") {

        Plotly.d3.csv("DATASET_REGIONI.csv", function (error, data) {
            //Creazione
            var regioni = [];
            var numPresenze = [];
            var latitude =[];
            var longitude=[];
            var hovertext=[];

            for (let i = 0; i < data.length; i++) {
                let reg = data[i][regione];
                regioni.push(reg);

                var presenze;

                if(struttura === "FlussiPresenze2017") {
                    var presenze = data[i][struttura];
                    pres = presenze / 100000;
                    numPresenze.push(pres);
                }else{
                    var presenze = data[i][struttura];
                    pres = presenze / 100;
                    numPresenze.push(pres);
                }

                let txt=reg+"<br>"+struttura+": "+presenze;
                hovertext.push(txt);

                let lat =data[i]["Latitude"];
                latitude.push(lat);

                let lon =data[i]["Longitude"];
                longitude.push(lon);

            }
            debug:  console.log("A:" + regioni + " Geo: "+latitude+" - "+ longitude+" B:"+ numPresenze);

            let trace = [{
                type: 'scattergeo',
                mode: 'markers+text',
                hoverinfo: 'text',
                hovertext: hovertext,
                lon: longitude,
                lat: latitude,

                //text: regioni,
                marker: {
                    size: numPresenze,
                    sizemode: 'area',
                    sizemin: 0,
                    sizeref: 1,
                    color: numPresenze,
                    cmin: 0,
                    cmax: 100,
                    colorscale: 'Cividis',

                    line: {
                        color: 'black'
                    },
                },
                name: 'Citta italiane'
            }];
            let layout = {
                margin: {t: 40, l: 70, r: 30, b: 100},

                title: 'Presenze 2017 italia',
                geo: {
                    scope: 'europe',
                },

                updatemenus: [{
                    y: 0.8,
                    yanchor: 'top',
                    buttons: [{
                        method: 'restyle',
                        args: ['marker.colorscale', 'Bluered'],
                        label: 'rosso'
                    }, {
                        method: 'restyle',
                        args: ['marker.colorscale', 'Blues'],
                        label: 'blu'
                    },{
                        method: 'restyle',
                        args: ['marker.colorscale', 'Cividis'],
                        label: 'giallo'
                    }, {
                        method: 'restyle',
                        args: ['marker.colorscale', 'Greens'],
                        label: 'verde'
                    }]
                }]


            };

            Plotly.plot("graphMappa", trace, layout);
        });

    } else {

        Plotly.d3.csv("DATASET_PROVINCE_LAT.csv", function (error, data) {
            //Creazione
            let prov = [];
            let numPres = [];
            var latitude =[];
            var longitude=[];
            var hovertext=[];


            for (let i = 0; i < data.length; i++) {
                if (data[i]["Regione"] === regione) {
                    let pro = data[i]["Provincia"];
                    prov.push(pro);

                    if (struttura === "FlussiPresenze2017") {
                        var presenze = data[i][struttura];
                        pres = presenze / 100000;
                        numPres.push(pres);
                    } else {
                        var presenze = data[i][struttura];
                        pres = presenze / 100;
                        numPres.push(pres);
                    }

                    let txt = pro + "<br>Turisti: " + presenze;
                    hovertext.push(txt);

                    let lat = data[i]["Latitude"];
                    latitude.push(lat);

                    let lon = data[i]["Longitude"];
                    longitude.push(lon);

                }
            }

            debug:  console.log("A:" + prov + " Geo: "+latitude+" - "+ longitude+" B:"+ numPres);

            let trace = [{
                type: 'scattergeo',
                mode: 'markers+text',
                hoverinfo: 'text',
                hovertext: hovertext,
                lon: longitude,
                lat: latitude,

                //text: regioni,
                marker: {
                    size: numPres,
                    sizemode: 'area',
                    sizemin: 0,
                    sizeref: 1,
                    color: numPres,
                    cmin: 0,
                    cmax: 100,
                    colorscale: 'Cividis',

                    line: {
                        color: 'black'
                    },
                },
                name: 'Citta italiane'
            }];
            let layout = {
                margin: {t: 40, l: 70, r: 30, b: 100},

                title: 'Presenze 2017 italia',
                geo: {
                    scope: 'europe',
                },

                updatemenus: [{
                    y: 0.8,
                    yanchor: 'top',
                    buttons: [{
                        method: 'restyle',
                        args: ['marker.colorscale', 'Bluered'],
                        label: 'rosso'
                    }, {
                        method: 'restyle',
                        args: ['marker.colorscale', 'Blues'],
                        label: 'blu'
                    },{
                        method: 'restyle',
                        args: ['marker.colorscale', 'Cividis'],
                        label: 'giallo'
                    }, {
                        method: 'restyle',
                        args: ['marker.colorscale', 'Greens'],
                        label: 'verde'
                    }]
                }]


            };


            Plotly.plot("graphMappa", trace, layout);


        });
    }

}
