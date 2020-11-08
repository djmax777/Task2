function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function filesave(fileContent) {
    var bb = new Blob([fileContent], {
        type: 'text/html'
    });
    var a = document.createElement('a');
    a.download = 'rates.html';
    a.href = window.URL.createObjectURL(bb);
    a.click();
}

function genHtml(json, date) {
    var html = '<html><body><style>table,td,th{border:1px solid grey; border-spacing:0; border-collapse:collapse; padding:5px;}</style><table>';
    html += '<tr style="background-color:lightgray"><th>Currency</th><th>Exchange rate (base EUR)</th></tr>';
    html += '<tr><td>USD</td><td>' + json.rates[date].USD + '</td></tr>';
    html += '<tr><td>EEK</td><td>' + json.rates[date].EEK + '</td></tr>';
    html += '</table></body></html>';
    return html;
}
function getData(date) {
    var txt = httpGet('https://api.exchangeratesapi.io/history?start_at=' + date + '&end_at=' + date + '&symbols=USD,EEK');
    var json = JSON.parse(txt);
    var code = genHtml(json, date);
    return code;
}
var htmldata = getData("2010-01-15");
filesave(htmldata);
