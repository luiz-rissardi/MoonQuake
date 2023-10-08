import * as THREE from "three"



class MoonTextureState {

    #moonModel;
    #sun;
    #scene;
    #shadow;

    constructor() { }

    initMoonTexture({ moon, sun, scene }) {
        this.#moonModel = moon;
        this.#sun = sun;
        this.#scene = scene;
        this.#shadow = new THREE.DirectionalLight(0xffffff, -0.45);
    }

    showOneTexture(type) {
        switch (type) {

            case "normal":
                {
                    const newTexture = new THREE.TextureLoader().load("./models/moon/moon.jpg");
                    this.#moonModel.material.map = newTexture;
                    this.#moonModel.material.normalMap = null;
                    this.#moonModel.material.needsUpdate = true;

                    const directionalLightSun = this.#sun.children.find(child => child instanceof THREE.DirectionalLight);
                    directionalLightSun.intensity = 3;

                    const directionalLighShadowScene = this.#scene.children.find(child => child instanceof THREE.DirectionalLight);
                    directionalLighShadowScene.intensity = -0.43;

                    this.#scene.remove(this.#shadow);
                }
                break;

            case "textured":
                {
                    const moonMap = new THREE.TextureLoader().load("./models/moon/moonTextured.jpg");
                    const moontexture = new THREE.TextureLoader().load("./models/moon/moon.jpg");
                    this.#moonModel.material.map = moonMap;
                    this.#moonModel.material.normalMap = moontexture;
                    this.#moonModel.material.needsUpdate = true;

                    const directionalLightSun = this.#sun.children.find(child => child instanceof THREE.DirectionalLight);
                    directionalLightSun.intensity = 0;

                    const directionalLighShadowScene = this.#scene.children.find(child => child instanceof THREE.DirectionalLight);
                    directionalLighShadowScene.intensity = 0;

                    this.#scene.add(this.#shadow);
                }
                break;

            case "topographic":
                const moonMap = new THREE.TextureLoader().load("./models/moon/topographic.jpg");
                this.#moonModel.material.map = moonMap;
                this.#moonModel.material.normalMap = null;
                this.#moonModel.material.needsUpdate = true;

                const directionalLightSun = this.#sun.children.find(child => child instanceof THREE.DirectionalLight);
                directionalLightSun.intensity = 3;

                const directionalLighShadowScene = this.#scene.children.find(child => child instanceof THREE.DirectionalLight);
                directionalLighShadowScene.intensity = -0.43;

                this.#scene.remove(this.#shadow);
                break;

        }
    }
}

const moonTextureState = new MoonTextureState();

export {
    moonTextureState
}