import gallaryContainer from './gallary_container.js'

function getOverviewData() {

	if ( window.localStorage.getItem( 'overview' ) ) {

		gallaryContainer.setNewData = JSON.parse( window.localStorage.getItem( 'overview' ) )

	} else {
		const sparqlquery = `
				PREFIX dc: <http://purl.org/dc/elements/1.1/>
				PREFIX foaf: <http://xmlns.com/foaf/0.1/>
				SELECT DISTINCT ?type (COUNT(?cho) AS ?count) ?title ?img WHERE {
					?cho dc:type ?type .
					?cho dc:title ?title .
					?cho foaf:depiction ?img .
				}
				ORDER BY DESC(?count)
				LIMIT 5`,
			encodedquery = encodeURIComponent( sparqlquery ),
			queryurl = `https://api.data.adamlink.nl/datasets/AdamNet/all/services/endpoint/sparql?default-graph-uri=&query=${ encodedquery }&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on`

		fetch( queryurl )
			.then( res => res.json() )
			.then( res => {

				console.log( res )
				gallaryContainer.setNewData = res.results.bindings
				window.localStorage.setItem( 'overview', JSON.stringify( res.results.bindings ) )

			} )
			.catch( err => {

				console.log( err )

			} )

	}

}

export {
	getOverviewData
}
