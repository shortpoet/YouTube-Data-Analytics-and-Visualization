
endpoint = 'asmr_channels'


function drawTable(endpoint) {
	console.log(endpoint)
	d3.json(endpoint).then(function(asmr_data) {
		console.log(endpoint)
        console.log(asmr_data)
				var headers = d3.keys(asmr_data[0])
				console.log(headers)
				// headers = headers.slice(4,8).concat(headers.slice(2,3)).concat(headers.slice(8,9)).concat(headers.slice(12,14)).concat(headers.slice(11,12)).concat(headers.slice(10,11)).concat(headers.slice(0,2)).concat(headers.slice(3,4))
				headers = headers.slice(5,7).concat(headers.slice(17,18)).concat(headers.slice(12,13)).concat(headers.slice(18,19)).concat(headers.slice(8,9))
					.concat(headers.slice(3,4)).concat(headers.slice(16,17)).concat(headers.slice(1,2)).concat(headers.slice(0,1)).concat(headers.slice(7,8))
					.concat(headers.slice(10,11)).concat(headers.slice(2,3)).concat(headers.slice(14,16)).concat(headers.slice(9,10)).concat(headers.slice(4,5))
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
			  <td class="col_0 row_${i + 1}">${data.channel_name}</td><td class="col_1 row_${i + 1}">${data.channel_type}</td>
				<td class="col_2 row_${i + 1}">${data.uploads}</td><td class="col_3 row_${i + 1}">${data.subs}</td>
				<td class="col_4 row_${i + 1}">${data.views}</td><td class="col_5 row_${i + 1}">${data.date_created}</td>
				<td class="col_6 row_${i + 1}">${data.channel_age}</td><td class="col_7 row_${i + 1}">${data.upload_frequency}</td>
				<td class="col_8 row_${i + 1}">${data.avg_views_video}</td><td class="col_9 row_${i + 1}">${data.avg_views_subscriber}</td>
				<td class="col_10 row_${i + 1}">${data.country}</td><td class="col_11 row_${i + 1}">${data.gender}</td>
				<td class="col_12 row_${i + 1}">${data.birthyear}</td><td class="col_13 row_${i + 1}">${data.twitch}</td>
				<td class="col_14 row_${i + 1}">${data.twitter}</td><td class="col_15 row_${i + 1}">${data.facebook}</td>
				<td class="col_16 row_${i + 1}">${data.channel_id}</td>
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


  