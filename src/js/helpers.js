import Routes from './routes.js'

function unique( xs ) {

	  return xs.filter( ( x, i ) => {

		  const index = xs.findIndex( el => el.title === x.title )
		  return index === i

	  } )

}

function handleClickEvent( e ) {

	const link = e.target.tagName === 'A' ? e.target : e.target.parentNode.parentNode

	if ( !link.href.includes( window.location.origin ) ) return

	e.preventDefault()

	if ( window.history ) {

		window.history.pushState( {}, '', link.getAttribute( 'href' ) )

	}

	const header = document.querySelector( 'header' ),
		main = document.querySelector( 'main' ),
		oldA = Array.from( document.querySelectorAll( 'a' ) )

	oldA.forEach( el => {

		el.removeEventListener( 'click', handleClickEvent )

	} )

	header.remove()
	main.remove()

	const routes = new Routes()

	routes.goTo( link.getAttribute( 'href' ), true )

}

export {
	unique,
	handleClickEvent
}
