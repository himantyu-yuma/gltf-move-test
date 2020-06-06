window.addEventListener('DOMContentLoaded', init);

function init() {
    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    // ウィンドウサイズ設定
    // width = window.innerWidth / 1.6;
    // height = window.innerHeight / 1.6;
    width = window.innerWidth;
    height = window.innerHeight-5;
    renderer.setPixelRatio(1);
    renderer.setSize(width, height);
    renderer.setClearColor(0xf3f3f3, 1.0);
    // renderer.gammaOutput = true;
    // renderer.gammaFactor = 2.2;
    renderer.outputEncoding = THREE.GammaEncoding;

    console.log(window.devicePixelRatio);
    console.log(width + ", " + height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000);
    camera.position.set(0, 0, 30);
    // 光源を追加
    // const light = new THREE.AmbientLight(0xffffff, 1);
    const light = new THREE.AmbientLight(0x666666, 1);
    // const light = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(light);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Load GLTF or GLB
    const loader = new THREE.GLTFLoader();

    let model = null;
    loader.load('./models/panjan2_join.glb', function (data) {
        const gltf = data;
        const obj = gltf.scene;

        changeColor = (color) => {
            const children = obj.children;
            children.forEach(child => {
                child.material.color.set(color);
            });
        }

        model = obj;
        scene.add(obj);
        // 初回実行
        tick();

        function tick() {
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(tick);
            model.rotation.x += axis[0] * speed;
            model.rotation.y += axis[1] * speed;
            model.rotation.z += axis[2] * speed;
        }
    });

    document.getElementById("webGL").appendChild(renderer.domElement);

    let speed = 0;
    let axis = [1, 0, 0];

    changeSpeed = num => {
        speed += num;
    }

    changeAxis = btnAxis => {
        axis = btnAxis;
        console.log(axis);
    }

}