let app = window.document.querySelector("app");
let renderer = new window.THREE.WebGLRenderer({ antialias: true });
let scene = (() => {
    let scene = new window.THREE.Scene();
    scene.fog = new window.THREE.Fog(0xffffff, 0.025, 1000);
    return scene;
})();
let camera = (() => {
    let camera = new window.THREE.PerspectiveCamera(
        75, app.offsetWidth / app.offsetHeight, 0.1, 500
    );
    camera.position.y = 20;
    camera.position.z = 45;
    return camera;
})();
let frame = { ms: 1000 / 50 };
let animate = (() => {
    let now = window.Date.now();
    let from = window.Date.now();
    let diff;
    return () => {
        window.requestAnimationFrame(animate);
        now = window.Date.now();
        diff = now - from;
        if (diff > frame.ms) {
            from = now - (diff % frame.ms);
            renderer.render(scene, camera);
        }
    };
})();
renderer.setSize(app.offsetWidth, app.offsetHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = window.THREE.PCFSoftShadowMap;
app.append(renderer.domElement);
scene.add((() => {
    let mesh = new window.THREE.Mesh(
        new window.THREE.CircleGeometry(100, 32),
        new window.THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.BackSide })
    );
    mesh.rotation.x = window.Math.PI / 2;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
})());
scene.add((() => {
    let mesh = new window.THREE.Mesh(
        new window.THREE.SphereGeometry(100, 32, 32),
        new window.THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.BackSide })
    );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
})());
scene.add(new window.THREE.AmbientLight(0xffffff, 0.2));
animate();
new window.THREE.OrbitControls(camera, renderer.domElement);