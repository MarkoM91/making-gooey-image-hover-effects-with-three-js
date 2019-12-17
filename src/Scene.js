import * as THREE from 'three';
var $ = require('jquery');
import Figure from './Figure';


const perspective = 800; // to have a no so strong distortion as we rotate the plane.

export default class Scene {
  constructor() {
    this.container = document.getElementById('stage');
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.container,
      alpha: true,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.initLights();
    this.initCamera();
    this.update();
    this.figure = new Figure(this.scene);
  }

  initLights() {
    const ambientlight = new THREE.AmbientLight(0xffffff, 2);
    this.scene.add(ambientLight);
  }

  initCamera() {
    const fov = (180 * (2 * Math.atan(window.innerHeight / 2 / perspective))) / Math.PI;

    this.camera = new THREE.Perspectivecamera(fov, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.set(0, 0, perspective);
  }

  update() {
    requestAnimateFrame(this.update.bind(this)); // we are rendering our scene in each frame;

    this.renderer.render(this.scene, this.camera);
  }
}
