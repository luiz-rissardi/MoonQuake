import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { apolloLocations } from '../data/apollosLocations.js';
import { CoordinatesToPosition } from './helps/cordenateToPosition.js';
import { apolloLunarModuleState } from './handlers/apolloLunarModule.js';

const labels = [];

export function initApolloLunarModules(moonModel) {
    try {
        let models = [];
        apolloLocations.forEach(module => {
            const loader = new GLTFLoader();
            loader.load("./models/apolloModule/apollo_11_lunar_module.glb", (glb) => {
                const sonda = glb.scene;
                const position = CoordinatesToPosition(module.position.latitude, module.position.longitude)
                sonda.scale.set(0.02, 0.02, 0.02);
                sonda.position.copy(position)
                moonModel.add(sonda)
                initApolloLabels(module, moonModel);
                models.push(sonda)
            })
        })
        apolloLunarModuleState.initStateApolloLunarModule(models);
        apolloLunarModuleState.initLabelsApolloModules(labels);

    } catch (error) {
        console.log(error)
    }
}

export function initApolloLabels(module, moon) {
    const loader = new FontLoader();
    loader.load("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", function (font) {
        const textGeometry = new TextGeometry(module.name, {
            font: font,
            size: 1.5,
            height: 0.1,
            
        });


        const textMaterial = new THREE.MeshStandardMaterial({ color: 0xFF0000 });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        const position = CoordinatesToPosition(module.position.latitude, module.position.longitude)
        textMesh.castShadow = true;
        textMesh.receiveShadow = true; 
        textMesh.position.set(
            position.x - 5,
            position.y + 2,
            position.z + 3
        );
        labels.push(textMesh);
        moon.add(textMesh);
    });
}