import * as THREE from 'three';
import { TweenMax } from'gsap';

export default class Figure { //we create a new class and we pass the scene as a property;
  constructor(scene) {
    this.$image = document.querySelector('.tile__image');
    this.scene = scene;

    this.loader = new THREE.TextureLoader(); // to load our images and convert them into a texture, in order to use it in our shaders;

    this.image = this.loader.load(this.$image.dataset.src);
    this.hoverImage = this.loader.load(this.$image.dataset.hover);
    this.sizes = new THREE.Vector2(0, 0); // dimension when we store the position of our DOM image
    this.offset = new THREE.Vector2(0, 0);//in which we store the position of our DOM image;

    this.getSizes();
    this.createMesh();
  }
  getSizes() {
    const { width, height, top, left } = this.$image.getBoundingClientrect(); // we get our image information in the object get BoundingRect();
    this.sizes.set(width, height);
    this.offset.set(left - window.innerWidth / 2 + width / 2, -top + window.innerHeight / 2 - height / 2);
  }
  createMesh() {
    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1); //we have created a plane of 1 on 1px with 1 row and 1 column.;
    this.material = new THREE.MeshBasicMaterial({
      map: this.image
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.position.set(this.offset.x, this.offset.y, 0);
    this.mesh.scale.set(this.sizes.x, this.sizes.y, 1);

    this.scene.add(this.mesh);
  }
}

this.mouse = new THREE.Vector2(0, 0);
window.addEvenListener('mousemove', (ev) => { this.onMouseMove(ev) });

onMouseMove(event) {
	TweenMax.to(this.mouse, 0.5, {
		x: (event.clientX / window.innerWidth) * 2 - 1,
		y: -(event.clientY / window.innerHeight) * 2 + 1,
	})

	TweenMax.to(this.mesh.rotation, 0.5, {
		x: -this.mouse.y * 0.3,
		y: this.mouse.x * (Math.PI / 6)
	})
}
