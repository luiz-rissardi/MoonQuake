import * as THREE from "three"

export function initSun(scene) {
    const sunGeometry = new THREE.SphereGeometry(30, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: "yellow" });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(100, 20, 900);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(100, 0, 0);

    const directionalShadow = new THREE.DirectionalLight(0xffffff, -0.43);
    directionalShadow.position.set(0, 0, -350);

    //certa pra textura
    // const directionalLight4= new THREE.DirectionalLight(0xffffff, -0.45);
    // directionalLight.position.set(1,1,1);

    scene.add(directionalShadow);
    sun.add(directionalLight);
    return sun
}