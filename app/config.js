import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function configLayer() {
    const render = new THREE.WebGLRenderer();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const scene = new THREE.Scene();
    const ambientLight = new THREE.AmbientLight(0xf0f0f0, 0.5);
    const controlls = new OrbitControls(camera, render.domElement);
    // desatia o pan do botão direito
    controlls.mouseButtons.RIGHT = -1;

    scene.add(ambientLight);
    render.setSize(window.innerWidth, window.innerHeight - 1);
    document.body.appendChild(render.domElement);
    camera.position.z = 125;

    // Adicione um ouvinte para o evento 'render' do Three.js

    return {
        scene, camera, render, controlls
    }
}