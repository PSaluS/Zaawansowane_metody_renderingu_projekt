import './style.scss';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import Stats from 'stats.js';

const root = document.getElementById("root");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, root.offsetWidth * 0.995 / root.offsetHeight * 0.995, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);
const stats = new Stats();

const PointLight = new THREE.PointLight(0xffffff, 1.3, 20);

const AmbientLight = new THREE.AmbientLight(0xffffff, 0.2);

renderer.setSize(root.offsetWidth * 0.995, root.offsetHeight * 0.995);
root.appendChild(renderer.domElement);

function animate() {

    stats.begin();



    renderer.render(scene, camera);
    controls.update();
    stats.end();
    requestAnimationFrame(animate);
}

function envTexture() {
    const loader = new THREE.CubeTextureLoader();

    const textureCube = loader.load( [
        'https://webglfundamentals.org/webgl/resources/images/computer-history-museum/pos-x.jpg',
        'https://webglfundamentals.org/webgl/resources/images/computer-history-museum/neg-x.jpg',
        'https://webglfundamentals.org/webgl/resources/images/computer-history-museum/pos-y.jpg',
        'https://webglfundamentals.org/webgl/resources/images/computer-history-museum/neg-y.jpg',
        'https://webglfundamentals.org/webgl/resources/images/computer-history-museum/pos-z.jpg',
        'https://webglfundamentals.org/webgl/resources/images/computer-history-museum/neg-z.jpg'
    ] );

    return textureCube;
}

function init() {
    camera.position.z = 8;
    camera.position.y = 8;
    renderer.setClearColor(0x8abdff, 1);

    scene.add(PointLight);
    scene.add(AmbientLight);
    PointLight.position.set(0, 5.5, 0);

    console.log(envTexture());

    const geometry = new THREE.BoxGeometry(5,5,5);
    const material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: envTexture() } );
    const box = new THREE.Mesh( geometry, material );
    scene.add( box );

    scene.background = new THREE.CubeTextureLoader()
	.load( [
		'https://webglfundamentals.org/webgl/resources/images/computer-history-museum/pos-x.jpg',
        'https://webglfundamentals.org/webgl/resources/images/computer-history-museum/neg-x.jpg',
        'https://webglfundamentals.org/webgl/resources/images/computer-history-museum/pos-y.jpg',
        'https://webglfundamentals.org/webgl/resources/images/computer-history-museum/neg-y.jpg',
        'https://webglfundamentals.org/webgl/resources/images/computer-history-museum/pos-z.jpg',
        'https://webglfundamentals.org/webgl/resources/images/computer-history-museum/neg-z.jpg'
	] );


    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    root.appendChild(stats.dom);

    // console.log(interactivObj);
    animate();
}

init();