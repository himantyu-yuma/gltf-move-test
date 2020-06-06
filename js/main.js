window.addEventListener('DOMContentLoaded', init);

function init() {
    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({antialias:true});
    // ウィンドウサイズ設定
    width = window.innerWidth / 1.6;
    height = window.innerHeight / 1.6;
    renderer.setPixelRatio(1);
    renderer.setSize(width, height);
    renderer.setClearColor(0xf3f3f3, 1.0);
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;

    console.log(window.devicePixelRatio);
    console.log(width + ", " + height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000);
    camera.position.set(0, 0, 30);
    // 光源を追加
    const light = new THREE.AmbientLight(0xffffff, 1);
    // const light = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(light);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Load GLTF or GLB
    const loader = new THREE.GLTFLoader();

    let model = null;
    loader.load('./models/panjan2.glb', function (data) {
        const gltf = data;
        const obj = gltf.scene;
        model = obj;
        scene.add(obj);
    });
    loader.load('./models/NOI_base.glb', function (data) {
        const gltf = data;
        const obj = gltf.scene;
        console.log(obj);
        obj.scale.set(2, 2, 2);
        obj.position.set(5, 0, 10);
        scene.add(obj);
    });

    // アニメーション用追記
    let mixer;
    let clock = new THREE.Clock();
    // 

    loader.load('./models/Orga.glb', function (data) {
        const gltf = data;
        const obj = gltf.scene;
        // obj.scale.set(2, 2, 2);
        obj.scale.set(3, 3, 3);
        obj.position.set(-10, -5, 10);
        // アニメーション用追記
        const animations = gltf.animations;
        //Animation Mixerインスタンスを生成
        mixer = new THREE.AnimationMixer(obj);

        let animation = animations[0];
        //Animation Actionを生成
        let action = mixer.clipAction(animation);
        //ループ設定
        action.setLoop(THREE.Loop);
        //アニメーションの最後のフレームでアニメーションが終了
        action.clampWhenFinished = true;
        //アニメーションを再生
        action.play();
        // 

        scene.add(obj);

        //アニメーションの切り替え
        changeAction = num => {
            mixer.stopAllAction();
            const action = mixer.clipAction(animations[num]);
            action.setLoop(THREE.Loop)
            action.clampWhenFinished = true

            action.play();
        }

    });



    document.getElementById("webGL").appendChild(renderer.domElement);
    // 初回実行
    tick();

    function tick() {
        // requestAnimationFrame(tick);
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(tick);

        mixer.update(clock.getDelta());
        model.rotation.x += 1;
    }
}