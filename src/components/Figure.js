import * as THREE from 'three';
import { TweenMax } from'gsap';
var glsl;
import vertexShader from '../shaders/vertexShader.glsl';
import fragmentShader from '../shaders/fragmentShader.glsl';
var glslify = require('glslify');

export default class Figure {
    constructor(scene) {
        this.$image = document.querySelector('.tile__image')
        this.scene = scene

        this.loader = new THREE.TextureLoader()

        this.image = this.loader.load(this.$image.src)
        this.hoverImage = this.loader.load(this.$image.dataset.hover)
        this.$image.style.opacity = 0
        this.sizes = new THREE.Vector2(0, 0)
        this.offset = new THREE.Vector2(0, 0)

        this.getSizes()

        this.createMesh()

        this.mouse = new THREE.Vector2(0, 0)
        window.addEventListener('mousemove', ev => {
            this.onMouseMove(ev)
        })
    }

    getSizes() {
        const { width, height, top, left } = this.$image.getBoundingClientRect()

        this.sizes.set(width, height)
        this.offset.set(
            left - window.innerWidth / 2 + width / 2,
            -top + window.innerHeight / 2 - height / 2
        )
    }

    createMesh() {
        this.uniforms = {
           u_image: { type: 't', value: this.image },
           u_imagehover: { type: 't', value: this.hover },
           u_mouse: { value: this.mouse },
           u_time: { value: 0 },
           u_res: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
        }

        this.geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1)
        this.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            defines: {
               PR: window.devicePixelRatio.toFixed(1)
            }
        })

        this.mesh = new THREE.Mesh(this.geometry, this.material)

        this.mesh.position.set(this.offset.x, this.offset.y, 0)
        this.mesh.scale.set(this.sizes.x, this.sizes.y, 1)

        this.scene.add(this.mesh)
    }

    onMouseMove(event) {
        TweenMax.to(this.mouse, 0.5, {
            x: (event.clientX / window.innerWidth) * 2 - 1,
            y: -(event.clientY / window.innerHeight) * 2 + 1
        })

        TweenMax.to(this.mesh.rotation, 0.5, {
            x: -this.mouse.y * 0.3,
            y: this.mouse.x * (Math.PI / 6)
        })
    }

    update() {
    	this.uniforms.u_time.value += 0.01
    }
} ////we create a new class and we pass the scene as a property;

//const vertexShader = `
//	uniform float uProgress;
//	uniform vec2 uMeshScale;
//	uniform vec2 uMeshPosition;
//	uniform vec2 uViewSize;
//	void main(){
//	    vec3 pos = position.xyz;
//      float activation = uv.x;
//      float latestStart = 0.5;
//      float startAt = activation * latestStart;
//      float vertexProgress = smoothstep(startAt,1.,uProgress);
//      // Base state: pos.x
//      // Target state: flippedX
//      // Interpolation with: vertexProgress
//      float flippedX = -pos.x;
//      pos.x = mix(pos.x,flippedX, vertexProgress);
//      // Put vertices that are closer to its target in front.
//      pos.z += vertexProgress;
//	    	// Scale to page view size/page size
//	        vec2 scaleToViewSize = uViewSize / uMeshScale - 1.;
//          // Base state = 1.
//          // Target state = uScaleToViewSize;
//          // Interpolation value: vertexProgress
//            vec2 scale = vec2(
//              1. + scaleToViewSize * vertexProgress
//            );
//            pos.xy *= scale;
//            // Move towards center
//            // Base state = pos
//            // Target state = -uPlaneCenter;
//            // Interpolation value: vertexProgress
//            pos.y += -uMeshPosition.y * uProgress;
//            pos.x += -uMeshPosition.x * uProgress;
//             gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);
//	    }
//`;
//
//const fragmentShader = `
//uniform vec3 uColor;
//	void main(){
//    vec3 color = uColor;
//         gl_FragColor = vec4(color/255.,1.);
//	}
//`;
//
//const fragmentShader = `
//uniform vec3 uColor;
//	void main(){
//    vec3 color = uColor;
//         gl_FragColor = vec4(color/255.,1.);
//	}
//`;
//
