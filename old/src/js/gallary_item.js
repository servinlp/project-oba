import * as THREE from './THREE/three.module.js'
import config from './config.js'

class GallaryItem {

	constructor( data, index ) {

		this.data = data
		this.index = index

		this.tile = config.gallary.tile

		/*this.doneEvent = new CustomEvent( 'done', {
			detail: {
				done: true
			},
			 bubbles: true,
			cancelable: true
		} )*/

		this.renderTile()

	}

	renderTile() {

		this.canvas = document.createElement( 'canvas' )
		this.texture = new THREE.Texture( this.canvas )

		console.log( 'Texture',  this.texture )

		this.canvas.width = 1024
		this.canvas.height = 1024

		const number = this.tile.number,
			margin = this.tile.margin,
			width = this.tile.width,

			geometry = new THREE.BoxGeometry( width, width, width / 2 ),
			material = new THREE.MeshBasicMaterial( { color: 0xbbbbbb, map: this.texture } )

		this.mesh = new THREE.Mesh( geometry, material )
		this.mesh.translateX( this.index % number + ( margin * ( this.index % number ) ) )
		this.mesh.translateY( -Math.floor( this.index / number ) - ( Math.floor( this.index / number ) * margin ) )

		this.startProssesing()

	}

	startProssesing() {

		this.theOldFashionWay()

		//const canvas = document.createElement( 'canvas' )

		// if ( !( 'transferControlToOffscreen' in canvas ) ) {
        //
		// 	throw new Error( 'webgl in worker unsupported' )
		// 	this.theOldFashionWay()
        //
		// } else {
        //
		// 	console.log( 'Start process of ', this )
        //
		// 	this.worker = new Worker( './worker.js' )
        //
		// 	this.worker.postMessage( 'hello there' )
        //
		// 	this.worker.onmessage = function( e ) {
		// 		console.log( e )
		// 	}
        //
		// }

	}

	theOldFashionWay() {

		const that = this,
			g = this.canvas.getContext( '2d' ),
			img = new Image()

		//requestCORSIfNotSameOrigin( img, this.data.img.value )
		img.crossOrigin = '*'
		console.log( img )

		img.addEventListener( 'load', _drawImage )

		img.src = this.data.img.value

		//document.body.appendChild( this.canvas )
		//document.body.appendChild( img )

		function _drawImage() {

			console.log( 'im drawing' )

			let width, height
			const position = []

			if ( this.naturalWidth > this.naturalHeight ) {

				const ratio = 1024 / this.naturalWidth

				width = this.naturalWidth * ratio
				height = this.naturalHeight * ratio

				position.push( 0 )
				position.push( ( 1024 - height ) / 2 )

			} else {

				const ratio = 1024 / this.naturalHeight

				width = this.naturalWidth * ratio
				height = this.naturalHeight * ratio

				position.push( ( 1024 - width ) / 2 )
				position.push( 0 )

			}

			g.drawImage( this, position[ 0 ], position[ 1 ], width, height )

			//that.mesh.material.map = new THREE.Texture( canvas )

			console.log( that.mesh )
			that.mesh.material.map.needsUpdate = true

			//console.log( that.doneEvent )
			//that.mesh.dispatchEvent( that.doneEvent )

		}

		function requestCORSIfNotSameOrigin(img, url) {

			if ( ( new URL( url ) ).origin !== window.location.origin ) {

				img.crossOrigin = ""

			}

		}

	}

}

export default GallaryItem
