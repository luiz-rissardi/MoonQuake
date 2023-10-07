import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';


const moonRadius = 64;
let mouse = new THREE.Vector2();
let raycaster = new THREE.Raycaster();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const scene = new THREE.Scene();

function configLayer() {
    const render = new THREE.WebGLRenderer();
    const ambientLight = new THREE.AmbientLight(0xf0f0f0, 0.5);
    const controlls = new OrbitControls(camera, render.domElement);
    // desatia o pan do botão direito
    controlls.mouseButtons.RIGHT = -1;


    window.addEventListener('mousemove', onMouseMove, false);

    scene.add(ambientLight);
    render.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(render.domElement);
    camera.position.z = 125;
    return {
        scene, camera, render, controlls
    }
}


function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        showCoordinates(intersects[0].point);
    }
}

function showCoordinates(position) {
    console.log(`Latitude: ${position.y.toFixed(2)}°, Longitude: ${position.x.toFixed(2)}°`);
}



function InitMoon() {
    const textureLoader = new THREE.TextureLoader();
    const modelGeometry = new THREE.SphereGeometry(moonRadius, 32, 32, -Math.PI / 2);
    const moontexture = textureLoader.load("./moon/moon3.jpg");
    const material = new THREE.MeshPhongMaterial(
        {
            map: moontexture,
        }
    );

    const moonModel = new THREE.Mesh(modelGeometry, material);
    return moonModel;
}

function initSun(scene) {
    const sunGeometry = new THREE.SphereGeometry(30, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: "yellow" });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(900, 20, 0);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
    directionalLight.position.set(100, 0, 0);

    const directionalShadow = new THREE.DirectionalLight(0xffffff, -0.43);
    directionalShadow.position.set(-100, 0, 0);

    scene.add(directionalShadow);
    sun.add(directionalLight);
    return sun
}

function initApolloLunarModule() {
    return new Promise((resolve, reject) => {
        try {
            const loader = new GLTFLoader();
            loader.load("moon/apollo_11_lunar_module.glb", (glb) => {
                const model = glb.scene;
                model.scale.set(0.02, 0.02, 0.02);
                model.position.set(moonRadius, 15, 0);
                model.rotation.z = 30;


                resolve(model)
            })

        } catch (error) {
            console.log(error)
        }
    })
}

function calculateLunarCoordinates(latitude, longitude) {
    // Converter latitude e longitude lunar para coordenadas 3D
    const lunarX = moonRadius * Math.cos((latitude * Math.PI) / 180) * Math.cos((longitude * Math.PI) / 180);
    const lunarY = moonRadius * Math.cos((latitude * Math.PI) / 180) * Math.sin((longitude * Math.PI) / 180);
    const lunarZ = moonRadius * Math.sin((latitude * Math.PI) / 180);
    return { x: lunarX, y: lunarY, z: lunarZ };
}


async function Main() {
    const { scene, camera, render, controlls } = configLayer();
    const moonModel = InitMoon();
    const sun = initSun(scene);
    const sonda = await initApolloLunarModule();

    const lunarLatitude = 20.19080; // Latitude aproximada
    const lunarLongitude = 30.77168; // Longitude aproximada


    const loader = new FontLoader();
    loader.load("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", function (font) {
        const textGeometry = new TextGeometry("Apollo 17", {
            font: font,
            size: 2,
            height: 0.1,
        });

        const textMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff});
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set
            (
                lunarLongitude,
                lunarLatitude,
                moonRadius - 10
            );
        scene.add(textMesh);
    });


    sonda.position.set
        (
            lunarLongitude,
            lunarLatitude,
            moonRadius - 10
        );
    sonda.rotation.y = 30;

    scene.add(sonda);
    scene.add(sun);
    scene.add(moonModel);


    const animateFn = animate(render)(scene)(camera)(controlls)(moonModel);
    animateFn();
}

function animate(renderer) {
    return function (scene) {
        return function (camera) {
            return function (controlls) {
                return function (moon) {
                    return function recursion() {
                        requestAnimationFrame(recursion);
                        const moonRotionSpeed = 2 * Math.PI / (27.3 * 24 * 60 * 60);
                        controlls.update();
                        moon.rotation.y += moonRotionSpeed;
                        renderer.render(scene, camera);
                    }
                }
            }
        }
    }
}

Main();

