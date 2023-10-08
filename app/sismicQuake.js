import { SismicsData } from '../data/sismicsData.js';
import { CoordinatesToPosition } from './helps/cordenateToPosition.js';
import { sismicMarkState } from './handlers/sismicMark.js';
import * as THREE from "three"

export function initSimiologicData(moonModel) {
    const geometry = new THREE.SphereGeometry(1, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color: "red" });

    const data = SismicsData.map(data => {
        const sismicMark = new THREE.Mesh(geometry, material);
        const position = CoordinatesToPosition(data.latitude, data.longitude);
        sismicMark.position.copy(position);
        sismicMark.visible = false;
        moonModel.add(sismicMark);
        return sismicMark
    })
    sismicMarkState.initStateSismicMarks(data);
}