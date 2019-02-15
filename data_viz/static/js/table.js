
endpoint = 'asmr_channels'

function getAge(data) {
	return ((Date.now()/1000/3600/24) - (new Date(data.date_created)/1000/3600/24)).toFixed()
}

function drawTable(endpoint) {
	console.log(endpoint)
	d3.json(endpoint).then(function(asmr_data) {
		console.log(endpoint)
        console.log(asmr_data)
				var headers = d3.keys(asmr_data[0])
				headers = headers.slice(0,6).concat(headers.slice(7,9))
				headers.splice(5, 0, 'channel_age (days)')
				var averages = ['upload_frequency', 'avg_views/video', 'avg_views/subscriber']
				headers = headers.concat(averages)
				
				console.log(headers)
		var dataTable = d3.select('#table').append('table').attr('class', 'datatable table table-striped');
		var header = dataTable.append('thead').selectAll('th').data(headers).enter()
			.append('th')
			.attr('class', 'sortable')
			.attr('value', d => d)
			.attr('id', d => `${d}-header`)
			.text(d => d)
		var tbody = dataTable.append('tbody')
		var content = tbody.selectAll('tr').data(asmr_data).enter()
			.append('tr')
			.html((data, i) => (`
			  <td class="col_0 row_${i + 1}">${data.channel_id}</td><td class="col_1 row_${i + 1}">${data.channel_name}</td>
				<td class="col_2 row_${i + 1}">${data.channel_type}</td><td class="col_3 row_${i + 1}">${data.country}</td>
				<td class="col_4 row_${i + 1}">${data.date_created}</td><td class="col_5 row_${i + 1}">${getAge(data)}</td>
				<td class="col_6 row_${i + 1}">${data.subs}</td><td class="col_7 row_${i + 1}">${data.uploads}</td>
				<td class="col_8 row_${i + 1}">${data.views}</td><td class="col_9 row_${i + 1}">${(getAge(data)/data.uploads).toFixed(2)}</td>
				<td class="col_10 row_${i + 1}">${(data.views/data.uploads).toFixed(2)}</td><td class="col_8 row_${i + 1}">${(data.views/data.subs).toFixed(2)}</td>
				`
			))
			.on('mouseover', function(d, i) {
				d3.select(this).style('background-color', 'rgb(0, 14, 142').style('color', 'silver')
			})
			.on('mouseout', function(d, i) {
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
					content.sort((a,b) => d3.ascending(parseFloat(a[sort_value]), parseFloat(b[sort_value])))
				}
				else {
					content.sort((a,b) => d3.ascending(a[sort_value], b[sort_value]))
				}
				sortAscending = false
				d3.select(this).attr('class', 'asc')
			} else {
				if (numeric.includes(sort_value)) {
					content.sort((a,b) => d3.descending(parseFloat(a[sort_value]), parseFloat(b[sort_value])))
				}
				else {
					content.sort((a,b) => d3.descending(a[sort_value], b[sort_value]))
				}
				sortAscending = true
				d3.select(this).attr('class', 'desc')
			}
		})
	})
}
drawTable(endpoint)


  