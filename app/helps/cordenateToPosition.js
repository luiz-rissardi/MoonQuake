
import * as THREE from "three";
import { degToRad } from 'three/src/math/MathUtils.js';

const r = 64;

export function CoordinatesToPosition(latitude, longitude) {
    const x = r * Math.sin(Math.PI / 2 - degToRad(latitude)) * Math.sin(degToRad(longitude));
    const y = r * Math.cos(Math.PI / 2 - degToRad(latitude));
    const z = r * Math.sin(Math.PI / 2 - degToRad(latitude)) * Math.cos(degToRad(longitude));
    
    return new THREE.Vector3(x, y, z);
    
}