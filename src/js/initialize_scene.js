import * as THREE from './THREE/three.module'
import render from './render'
import { renderer } from './_base'
import { getOverviewData } from './api'

function initializeScene() {

	getOverviewData()

	renderer.animate( render )

}

export default initializeScene