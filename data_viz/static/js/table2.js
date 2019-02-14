
endpoint = 'asmr_channels'

function drawTable(endpoint) {
	console.log(endpoint)
	d3.json(endpoint).then(function(asmr_data) {
		console.log(endpoint)
        console.log(asmr_data)
				var headers = d3.keys(asmr_data[0])
				headers = headers.slice(0,6).concat(headers.slice(7,9))
        console.log(headers)
		
	function tabulate(data, columns) {
		var dataTable = d3.select('#table').append('table').attr('class', 'datatable table table-striped');
		var header = dataTable.append('thead').selectAll('th').data(headers).enter()
			.append('th')
			.attr('class', 'sortable')
			.attr('value', d => d)
			.attr('id', d => `${d}-header`)
			.text(d => d)
		var tbody = dataTable.append('tbody')
		var rows = tbody.selectAll('tr').data(asmr_data).enter()
			.append('tr')
		var content = rows.selectAll('td').data(function (row) {
			return columns.map(function (column) {
				return {column: column, value: row[column]};
				});
			})
			.enter()
			.append('td')
			.text(d => d.value)
		rows.on('mouseover', function(d, i) {
				d3.select(this).style('background-color', 'rgb(0, 14, 142').style('color', 'silver')
			})
		rows.on('mouseout', function(d, i) {
				d3.select(this).style('background-color', null).style('color', null)
				d3.select('.data').append('table').classed('table table-striped table-sortable', true)
			})
      var sortAscending = true
    header.on('click',function(d, i) {
      var sort_value = d3.select(this).attr('value')
      var numeric = headers.slice(5, 8)
      console.log(numeric)
      console.log(sort_value)
      if (sortAscending === true) {
        if (numeric.includes(sort_value)) {
          rows.sort((a,b) => d3.ascending(parseFloat(a[sort_value]), parseFloat(b[sort_value])))
        }
        else {
          rows.sort((a,b) => d3.ascending(a[sort_value], b[sort_value]))
        }
        sortAscending = false
        d3.select(this).attr('class', 'asc')
      } else {
        if (numeric.includes(sort_value)) {
          rows.sort((a,b) => d3.descending(parseFloat(a[sort_value]), parseFloat(b[sort_value])))
        }
        else {
          rows.sort((a,b) => d3.descending(a[sort_value], b[sort_value]))
        }
        sortAscending = true
        d3.select(this).attr('class', 'desc')
      }
    })
	}
    tabulate(asmr_data, headers)    
	})
}
drawTable(endpoint)


  