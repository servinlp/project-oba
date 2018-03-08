import { unique } from './helpers.js'

function getCategories( cb ) {

        if ( window.localStorage.getItem( 'categories' ) ) {

		cb( JSON.parse( window.localStorage.getItem( 'categories' ) ) )

        } else {
                const sparqlquery = `
			PREFIX dc: <http://purl.org/dc/elements/1.1/>
			SELECT DISTINCT ?type (COUNT(?cho) AS ?count) WHERE {
				  ?cho dc:type ?type
			}
			GROUP BY ?type
			ORDER BY DESC(?count)
			LIMIT 500`,
			encodedquery = encodeURIComponent( sparqlquery ),
			queryurl = `https://api.data.adamlink.nl/datasets/AdamNet/all/services/endpoint/sparql?default-graph-uri=&query=${ encodedquery }&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on`

		fetch( queryurl )
			.then( res => res.json() )
			.then( res => {

				console.log( res )
				const data = res.results.bindings.map( el => ( {
					count: el.count.value,
					type: el.type.value
			       	} ) )
				window.localStorage.setItem( 'categories', JSON.stringify( data ) )
				cb( data )

			} )
			.catch( err => {

				console.log( err )

			} )

																	        }

}

function singleCategorieData( categorie ) {

	return new Promise( ( resolve, reject ) => {

		if ( window.localStorage.getItem( categorie ) ) {

	                resolve( JSON.parse( window.localStorage.getItem( categorie ) ) )

	        } else {

	                const sparqlquery = `
					PREFIX dc: <http://purl.org/dc/elements/1.1/>
					PREFIX foaf: <http://xmlns.com/foaf/0.1/>
					SELECT ?cho ?title ?img ?subjects WHERE {
						?cho dc:type "${ categorie }"^^xsd:string .
						?cho dc:subject ?subjects .
						?cho dc:title ?title .
						?cho foaf:depiction ?img .
					}
					LIMIT 1000`,
				encodedquery = encodeURIComponent( sparqlquery ),
				queryurl = `https://api.data.adamlink.nl/datasets/AdamNet/all/services/endpoint/sparql?default-graph-uri=&query=${ encodedquery }&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on`

		fetch( queryurl )
			.then( res => res.json() )
			.then( res => {

				const data = unique( res.results.bindings.map( el => {

					return {
						cho: el.cho.value,
						title: el.title.value,
						img: el.img.value,
						subjects: el.subjects.value,
						slug: '/c/' + categorie.toLowerCase().replace( / /g, '-' ) + '/single/' + el.title.value.toLowerCase().replace( / /g, '-' ),
						titleSlug: el.title.value.toLowerCase().replace( / /g, '-' ),
						categorie: categorie[ 0 ].toUpperCase() + categorie.substr( 1, categorie.length )
					}

				} ) )

				window.localStorage.setItem( categorie, JSON.stringify( data ) )
				resolve( data )

	                } )
			.catch( err => {

				console.log( err )
				reject( err )

			} )

		}

	} )

}

function singleItemData( categorie, titleSlug ) {

	return new Promise( ( resolve, reject ) => {

		const storage = JSON.parse( window.localStorage.getItem( categorie ) )

		if ( storage && storage.filter( el => el.titleSlug === titleSlug ).length > 0 ) {

			const data = storage.filter( el => el.titleSlug === titleSlug )[ 0 ]
			resolve( data )

		} else {

		}

		reject( 'woops something whent wrong' )

	} )

}

export {
	getCategories,
	singleCategorieData,
	singleItemData
}
