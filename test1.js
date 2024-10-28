var config = {
    type: "Defect",
    xAxis: "Severity",
    yAxis: "Project",
    includeBlanks: true,
    includeRowTotals: true,
    includeColTotals: true,
    sortAlpha: true, 
    sortDirection: "Desc",
    maxRows: -1,
    query:  "(Release.Name = \"FY24-Q4 PI\")",
    pageSize: 200,
    fetch: "Name,State,Project" 
}

// $RallyContext:Begin
// $RallyContext:End
if ($RallyContext.ViewFilter.Type == 'Release'){
   
}
if ($RallyContext.ViewFilter.Type == 'Iteration'){
   
}


var url = `/slm/webservice/v2.0/${config.type}?pagesize=${config.pageSize}&fetch=${config.fetch}&query=${config.query}`;
fetch(url)
.then(response => {return response.json()})
.then(queryResult => { 
    console.log('queryResult',queryResult); 
});

// const grid = new gridjs.Grid({
//     columns: ['Component','BuildId','Date'],
//     server: {
//         url: url,
//         then: data => {
//             console.log('data',data)
//         //     var ret = data.QueryResult.Results.reduce(t,d => {
//         //     var x = d[config.xAxis] || null,
//         //         y = d[config.yAxis] || null; 
            
//         //     if (!t[y]){ t[y] = {} }
//         //     if (!t[y][x]) { t[y][x] = 0 }
//         //     t[y][x]++;
//         //     console.log(t)
//         //     return t; 

//         // },{})
//         // console.log('ret',ret)
//     }}
// }).render(document.getElementById("wrapper"));
