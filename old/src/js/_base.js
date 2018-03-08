import * as THREE from './THREE/three.module.js'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
camera.position.z = 5

const renderer = new THREE.WebGLRenderer( { antialias: false } )
renderer.setSize( window.innerWidth, window.innerHeight )
renderer.setPixelRatio( window.devicePixelRatio )
document.body.appendChild( renderer.domElement )

window.addEventListener( 'resize', resizeWindow )

const ambientlight = new THREE.AmbientLight( 0x404040 )
scene.add( ambientlight )

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 )
directionalLight.position.z = 4

scene.add( directionalLight )

const axesHelper = new THREE.AxesHelper( 5 )
scene.add( axesHelper )

//const controls = new THREE.OrbitControls( camera )
//controls.enableZoom = false

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
