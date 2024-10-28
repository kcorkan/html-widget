var config = {
    type: "Defect",
    xAxis: "State",
    yAxis: "Project.Name",
    includeBlanks: true,
    includeRowTotals: true,
    includeColTotals: true,
    sortAlpha: true, 
    sortDirection: "Desc",
    maxRows: -1,
    query:  "(Release.Name = \"FY24-Q4 PI\")",
    pageSize: 2000,
    fetch: "Name,State,Project" 
}

if ($RallyContext.ViewFilter.Type == 'Release'){
   
}
if ($RallyContext.ViewFilter.Type == 'Iteration'){
   
}


var url = `/slm/webservice/v2.0/${config.type}?project=${$RallyContext.GlobalScope.Project._ref}&projectScopeDown=${$RallyContext.GlobalScope.ProjectScopeDown}&projectScopeUp=${$RallyContext.GlobalScope.ProjectScopeUp}&pagesize=${config.pageSize}&fetch=${config.fetch}&query=${config.query}`;
var matrix = [];
var xProperties = config.xAxis.split('.'),
    yProperties = config.yAxis.split('.'),
    columns = [], rows=[];

fetch(url)
.then(response => {return response.json()})
.then(queryResult => { 
    console.log('queryResult',queryResult); 
    queryResult.QueryResult.Results.forEach(workItem => {
        console.log('workitem',workItem,xProperties,yProperties)
        var xVal = workItem, yVal = workItem;
        console.log('xVal',xVal,'yVal',yVal)
        xProperties.forEach(prop => { xVal = xVal[prop] || 'None' }); //todo - what if the field is null? 
        yProperties.forEach(prop => { yVal = yVal[prop] || 'None' });
        if (!matrix[xVal]){ matrix[xVal] = []; columns.push(xVal)}
        if (!matrix[yVal]){ matrix[xVal][yVal] = 0; rows.push(yVal)}
        matrix[xVal][yVal] = matrix[xVal][yVal] + 1;
        
    })
    console.log('matrix', matrix, columns, rows)


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
