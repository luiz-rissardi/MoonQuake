import * as THREE from "three"

const moonRadius = 64;

export function InitMoonTexture() {
    const textureLoader = new THREE.TextureLoader();
    const modelGeometry = new THREE.SphereGeometry(moonRadius, 1000, 1000, -Math.PI / 2);
    const moonMap = textureLoader.load("./models/moon/moon.jpg");
    const moontexture = textureLoader.load("./models/moon/moonTextured.jpg");
    const material = new THREE.MeshPhongMaterial(
        {
            map: moonMap,
            normalMap:moontexture
        }
    );
    const moonModel = new THREE.Mesh(modelGeometry, material);
    return moonModel;
}