import '../css/style.scss'

import * as THREE from './THREE/three.module'
import OrbitControls from './THREE/OrbitControls'
import initializeScene from './initialize_scene'

( function IFFE() {

	initializeScene()

} )()

// https://developer.mozilla.org/en-US/docs/Web/Events/resize
( function() {

    const throttle = function( type, name, obj ) {

        obj = obj || window
        let running = false
        const func = function() {

            if ( running ) return

            running = true

            requestAnimationFrame( () => {

                obj.dispatchEvent( new CustomEvent( name ) )
                running = false

            })
        }

        obj.addEventListener( type, func )

    }

    /* init - you can init any event */
    throttle( 'resize', 'optimizedResize' )

} )()