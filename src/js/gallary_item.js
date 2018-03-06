import * as THREE from './THREE/three.module.js'
import config from './config.js'

class GallaryItem {

	constructor( data, index ) {

		this.data = data
		this.index = index

		this.tile = config.gallary.tile

		this.doneEvent = new CustomEvent( 'done', { done: true, target: this } )

		this.renderTile()

	}

	renderTile() {

		const geometry = new THREE.PlaneGeometry( 1, 1, 1 ),
			material = new THREE.MeshBasicMaterial( { color: 0xbbbbbb } ),

			width = this.tile.width,
			margin = this.tile.margin

		this.mesh = new THREE.Mesh( geometry, material )
		this.mesh.translateX( ( this.index % width ) + ( ( this.index - 1 ) % width * margin ) )
		this.mesh.translateY( -Math.floor( this.index / width ) - ( Math.floor( this.index / width ) * margin ) )

	}

	startProssesing() {

		console.log( 'Start process of ', this )

	}

}

export default GallaryItem