import * as THREE from './THREE/three.module.js'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
camera.position.z = 5

const renderer = new THREE.WebGLRenderer( { antialias: true } )
renderer.setSize( window.innerWidth, window.innerHeight )
renderer.setPixelRatio( window.devicePixelRatio )
document.body.appendChild( renderer.domElement )

document.body.addEventListener( 'optimizedResize', resizeWindow )

const ambientlight = new THREE.AmbientLight( 0x404040 )
scene.add( ambientlight )

const axesHelper = new THREE.AxesHelper( 5 )
scene.add( axesHelper )

const controls = new THREE.OrbitControls( camera )
controls.enableZoom = true

function resizeWindow() {

	renderer.setSize( window.innerWidth, window.innerHeight )
	renderer.setPixelRatio( window.devicePixelRatio )

	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()

}

export {
	scene,
	camera,
	renderer
}