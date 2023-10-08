
import { InitMoon } from './moon.js';
import { initSun } from './sun.js';
import { initApolloLunarModules } from './apolloModules.js';
import { configLayer } from './config.js';
import { initSimiologicData } from './sismicQuake.js';
import { initMaresLabels } from './mares.js';
import { moonTextureState } from './handlers/moonTextures.js';


async function Main() {
    const { scene, camera, render, controlls } = configLayer();
    const moon = InitMoon();
    const sun = initSun(scene);

    initApolloLunarModules(moon);
    initSimiologicData(moon);
    initMaresLabels(moon);

    moonTextureState.initMoonTexture({moon,sun,scene});
    scene.add(moon);
    scene.add(sun);

    //pegar luz do sol
    // const directionalLight = sun.children.find(child => child instanceof THREE.DirectionalLight);
    // directionalLight.intensity = 0.5;





    const animateFn = animate(render)(scene)(camera)(controlls)(moon);
    animateFn();
}

function animate(renderer) {
    return function (scene) {
        return function (camera) {
            return function (controlls) {
                return function (moon) {
                    return function recursion() {
                        requestAnimationFrame(recursion);
                        controlls.update();
                        moon.rotation.y += 0.0002
                        renderer.render(scene, camera);
                    }
                }
            }
        }
    }
}

Main();

