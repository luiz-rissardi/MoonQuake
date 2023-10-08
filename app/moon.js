import * as THREE from "three"

const moonRadius = 64;

export function InitMoon() {
    const textureLoader = new THREE.TextureLoader();
    const modelGeometry = new THREE.SphereGeometry(moonRadius, 1000, 1000, -Math.PI / 2);
    const moontexture = textureLoader.load("./models/moon/moon.jpg");
    const material = new THREE.MeshPhongMaterial(
        {
            map: moontexture,
        }
    );
    const moonModel = new THREE.Mesh(modelGeometry, material);
    return moonModel;
}