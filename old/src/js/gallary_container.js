import * as THREE from './THREE/three.module.js'
import GallaryItem from './gallary_item.js'
import config from './config.js'
import { scene } from './_base.js'

class GallaryContainer {

	constructor() {

		this.totalWorkers = navigator.hardwareConcurrency || 4

		this.all = []
		this.allObjects = new THREE.Object3D()
		this.done = []
		this.waitingList = []
		this.processing = []

		this.data = []

		const width = config.gallary.tile.width,
			margin = config.gallary.tile.margin,
			number =  config.gallary.tile.number

		//							For first element - For entire width 		- For margin
		this.allObjects.translateX( ( width / 2 ) - ( ( number / 2 ) * width ) - ( ( number - 1 ) * margin / 2 ) )
		scene.add( this.allObjects )

	}

	set setNewData( data ) {

		const startIndex = this.data.length

		this.data = this.data.concat( data )

		this.createGallaryItems( data, startIndex )

	}

	createGallaryItems( data, startIndex ) {

		data.forEach( ( dat, i ) => {

			const item = new GallaryItem( dat, startIndex + i )
			this.all.push( item )
			this.allObjects.add( item.mesh )
			//this.waitingList.push( item )
			//item.startProssesing()

		} )

		//this.checkForAvailableWorkers()

	}

	/*checkForAvailableWorkers() {

		if ( this.processing.length === this.totalWorkers || this.waitingList.length === 0 ) return

		const availableSpaceInWorker = this.totalWorkers - this.processing.length

		for ( let i = 0; i < availableSpaceInWorker; i++ ) {

			const item = this.waitingList.splice( 0, 1 )[ 0 ]

			this.processing.push( item )
			item.mesh.addEventListener( 'done', this.itemIsDone )
			item.startProssesing()

		}

	}*/

	itemIsDone( e ) {

		console.log( 'event',  e )
		// console.log( 'this.processing', this.processing )

		// const index = this.processing.indexOf( e.target )
		// this.processing.splice( index, 1 )
		// this.done.push( e.target )

		// console.log( 'this.processing', this.processing )

	}

}

const gallaryContainer = new GallaryContainer()
export default gallaryContainer
