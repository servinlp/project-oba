import * as THREE from './THREE/three.module.js'
import render from './render.js'
import Stats from './stats.js'
import { renderer } from './_base.js'
import { getOverviewData } from './api.js'

function initializeScene() {

	getOverviewData()

	renderer.animate( render )

	const stats = new Stats()
	stats.showPanel( 0 )
	document.body.appendChild( stats.dom )

	requestAnimationFrame( animate )

	function animate() {

		stats.begin()

		stats.end()

		requestAnimationFrame( animate )

	}

}


export default initializeScene