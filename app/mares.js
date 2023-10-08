import * as THREE from "three";
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { mares } from "../data/maresLocations.js";
import { CoordinatesToPosition } from "./helps/cordenateToPosition.js";
import { moonMaresStates } from "./handlers/moonMare.js";

export function initMaresLabels(moon){
    const loader = new FontLoader();
    const maresLabels = []
    loader.load("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", function (font) {
        mares.forEach(mare => {
            const textGeometry = new TextGeometry(mare.name, {
                font: font,
                size: 1.5,
                height: 0.1,
                
            });
    
            const textMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
            const mareLabel = new THREE.Mesh(textGeometry, textMaterial);
            const position = CoordinatesToPosition(mare.position.latitude, mare.position.longitude)
            mareLabel.castShadow = true;
            mareLabel.receiveShadow = true; 
            mareLabel.position.set(
                position.x ,
                position.y + 2,
                mare.position.z || position.z +2
            );

            maresLabels.push(mareLabel)
            moon.add(mareLabel);
        })
    });
    moonMaresStates.initMoonMaresStates(maresLabels)
}
