var camera;
var scene;
var renderer;
var controls;
var clock;
var gallery = new THREE.Group(); // Grupo de objetos 
var arquitecture;
var ambientLight;
var light;
var tl = gsap.timeline();
var lookAtPicture = 0;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(perspectiveCamera(), window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 200, 100);
    camera.rotation.x = -30 * Math.PI / 180;

    scene = new THREE.Scene();

    scene.add(camera);

    const dataPictures = getImages();
    galleryGeometry(dataPictures);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor("0x000000", 1);
    renderer.setSize(window.innerWidth, window.innerHeight);

    clock = new THREE.Clock();
    controls = new THREE.FirstPersonControls(camera);
    controls.movementSpeed = 100;
    controls.lookSpeed = 0.09;

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.soft = true;

    document.body.appendChild(renderer.domElement);
}

function galleryGeometry(dataPictures) {


    // Geometry

    var generalGeometry = new THREE.Geometry();

    var floorGeometry = new THREE.CubeGeometry(800, 1, 600);
    floorGeometry.applyMatrix(
        new THREE.Matrix4().makeTranslation(0, 0.5, 0));

    var wallGeometry = new THREE.CubeGeometry(400, 1, 200);
    wallGeometry.applyMatrix(
        new THREE.Matrix4().makeTranslation(0, 0.5, 0));

    var sideWallGeometry = new THREE.CubeGeometry(200, 1, 600);
    wallGeometry.applyMatrix(
        new THREE.Matrix4().makeTranslation(0, 0.5, 0));


    var picture0Geometry = new THREE.CubeGeometry(dataPictures[0].width, 1, dataPictures[0].height);
    wallGeometry.applyMatrix(
        new THREE.Matrix4().makeTranslation(0, 0.5, 0));

    var picture1Geometry = new THREE.CubeGeometry(dataPictures[1].width, 1, dataPictures[1].height);
    wallGeometry.applyMatrix(
        new THREE.Matrix4().makeTranslation(0, 0.5, 0));

    var picture2Geometry = new THREE.CubeGeometry(dataPictures[2].width, 1, dataPictures[2].height);
    wallGeometry.applyMatrix(
        new THREE.Matrix4().makeTranslation(0, 0.5, 0));

    var picture3Geometry = new THREE.CubeGeometry(dataPictures[3].width, 1, dataPictures[3].height);
    wallGeometry.applyMatrix(
        new THREE.Matrix4().makeTranslation(0, 0.5, 0));

    var picture4Geometry = new THREE.CubeGeometry(dataPictures[4].width, 1, dataPictures[4].height);
    wallGeometry.applyMatrix(
        new THREE.Matrix4().makeTranslation(0, 0.5, 0));

    // Material

    const planeSize = 20;

    const loader = new THREE.TextureLoader();
    const texture = loader.load('images/floor.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    var wallMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, wireframe: false });

    var floorTexture = new THREE.TextureLoader().load('images/floor.jpg');
    floorMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        overdraw: false,
        side: THREE.DoubleSide
    });

    var texturePicture0 = new THREE.TextureLoader().load(dataPictures[0].url);
    pictureMaterial0 = new THREE.MeshBasicMaterial({
        map: texturePicture0,
        overdraw: true
    });

    var texturePicture1 = new THREE.TextureLoader().load(dataPictures[1].url);
    pictureMaterial1 = new THREE.MeshBasicMaterial({
        map: texturePicture1,
        overdraw: true
    });

    var texturePicture2 = new THREE.TextureLoader().load(dataPictures[2].url);
    pictureMaterial2 = new THREE.MeshBasicMaterial({
        map: texturePicture2,
        overdraw: true
    });

    var texturePicture3 = new THREE.TextureLoader().load(dataPictures[3].url);
    pictureMaterial3 = new THREE.MeshBasicMaterial({
        map: texturePicture3,
        overdraw: true
    });

    var texturePicture4 = new THREE.TextureLoader().load(dataPictures[4].url);
    pictureMaterial4 = new THREE.MeshBasicMaterial({
        map: texturePicture4,
        overdraw: true
    });

    // Mesh and position

    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.updateMatrix();

    var wall1 = new THREE.Mesh(sideWallGeometry.clone());
    wall1.position.x = 200;
    wall1.rotation.z = 90 * (Math.PI / 180);
    wall1.position.y = 100;
    wall1.updateMatrix();

    var wall2 = new THREE.Mesh(sideWallGeometry.clone());
    wall2.position.x = -200;
    wall2.rotation.z = 90 * (Math.PI / 180);
    wall2.position.y = 100;
    wall2.updateMatrix();

    var wall3 = new THREE.Mesh(wallGeometry.clone());
    wall3.rotation.x = 90 * (Math.PI / 180);
    wall3.position.y = 100;
    wall3.position.z = -150;
    wall3.updateMatrix();

    // Pinturas

    // Central

    galleryPicture1 = new THREE.Mesh(picture0Geometry, pictureMaterial0);
    galleryPicture1.rotation.x = 90 * (Math.PI / 180);
    galleryPicture1.position.y = 110;
    galleryPicture1.position.z = -140;
    galleryPicture1.updateMatrix();

    // Pintura izquierda derecha

    galleryPicture2 = new THREE.Mesh(picture1Geometry, pictureMaterial1);
    galleryPicture2.rotation.x = 90 * (Math.PI / 180);
    galleryPicture2.rotation.z = -90 * (Math.PI / 180);
    galleryPicture2.position.x = -195;
    galleryPicture2.position.y = 110;
    galleryPicture2.position.z = 0;
    galleryPicture2.updateMatrix();

    // Pintura  derecha izquierda

    galleryPicture3 = new THREE.Mesh(picture2Geometry, pictureMaterial2);
    galleryPicture3.rotation.x = 90 * (Math.PI / 180);
    galleryPicture3.rotation.z = 90 * (Math.PI / 180);
    galleryPicture3.position.x = 195;
    galleryPicture3.position.y = 110;
    galleryPicture3.position.z = 0;
    galleryPicture3.updateMatrix();

    // Pintura derecha derecha

    galleryPicture4 = new THREE.Mesh(picture3Geometry, pictureMaterial3);
    galleryPicture4.rotation.x = -90 * (Math.PI / 180);
    galleryPicture4.rotation.z = -90 * (Math.PI / 180);
    galleryPicture4.position.x = 195;
    galleryPicture4.position.y = 110;
    galleryPicture4.position.z = 190;
    galleryPicture4.updateMatrix();

    // Pintura izquierda izquierda

    galleryPicture5 = new THREE.Mesh(picture4Geometry, pictureMaterial4);
    galleryPicture5.rotation.x = -90 * (Math.PI / 180);
    galleryPicture5.rotation.z = 90 * (Math.PI / 180);
    galleryPicture5.position.x = -195;
    galleryPicture5.position.y = 110;
    galleryPicture5.position.z = 190;
    galleryPicture5.updateMatrix();

    // Merge 

    generalGeometry.merge(wall1.geometry, wall1.matrix);
    generalGeometry.merge(wall2.geometry, wall2.matrix);
    generalGeometry.merge(wall3.geometry, wall3.matrix);

    arquitecture = new THREE.Mesh(generalGeometry, wallMaterial);
    arquitecture.castShadow = true;
    arquitecture.receiveShadow = true;

    gallery.add(floor);
    gallery.add(arquitecture);
    gallery.add(galleryPicture1);
    gallery.add(galleryPicture2);
    gallery.add(galleryPicture3);
    gallery.add(galleryPicture4);
    gallery.add(galleryPicture5);

    // Luces

    var light = new THREE.PointLight(0xdeddd5, 1);
    light.castShadow = true;
    light.position.set(10, 125, 0);

    scene.add(light);

    scene.add(new THREE.AmbientLight(0x181818));

    // Rombo de ayuda

    const helper = new THREE.PointLightHelper(light);
    scene.add(helper);

    // Grupo de geometrias

    scene.add(gallery);


}


function animate() {

    requestAnimationFrame(animate);
    //controls.update(clock.getDelta());


    renderer.render(scene, camera);
}

function nextMove() {

    if (lookAtPicture === 0) {
        positionPicture1();
        lookAtPicture++;

    } else if (lookAtPicture === 1) {
        positionPicture2();
        lookAtPicture++;

    } else if (lookAtPicture === 2) {
        positionPicture3();
        lookAtPicture++;

    } else if (lookAtPicture === 3) {
        // lookAtPicture = 0;
        positionPicture4();
        lookAtPicture++;

    } else if (lookAtPicture === 4) {
        // lookAtPicture = 0;
        positionPicture5();
        lookAtPicture++;

    }

    else if (lookAtPicture === 5) {
        positionPicture6();
        lookAtPicture = 0;

    }

}


function positionPicture0() {

    tl.to(camera.rotation, {
        y: 360 * Math.PI / 180,
        duration: 1.5,
    })

        .to(camera.position, {
            y: 250,
            duration: 2.5,
        })

        .to(camera.position, {
            z: 300,
            duration: 1.5,
        })

        .to(camera.rotation, {
            x: -30 * Math.PI / 180,
            duration: 1.5,
        })
}

function positionPicture1() {

    tl.to(camera.position, {
        y: 100,
        duration: 2.5,
    })

        .to(camera.position, {
            z: -20,
            duration: 1.5,
        })

        .to(camera.rotation, {
            x: 0 * Math.PI / 180,
            duration: 1.5,
        })
}

function positionPicture2() {

    tl.to(camera.rotation, {
        y: 90 * Math.PI / 180,
        duration: 1.5,

    })

        .to(camera.position, {
            x: -100,
            duration: 1.5,
        })

        .to(camera.position, {
            z: 3.5,
            duration: 1.5,
        })
}

function positionPicture3() {

    tl.to(camera.position, {
        z: 190,
        duration: 1.5,
    })
}


function positionPicture4() {

    tl.to(camera.rotation, {
        y: -90 * Math.PI / 180,
        duration: 1.5,
    })

        .to(camera.position, {
            x: 100,
            duration: 1.5,
        })
}

function positionPicture5() {

    tl.to(camera.position, {
        z: 0,
        duration: 1.5,
    })
}


function positionPicture6() {


    tl.to(camera.position, {
        x: 0,
        duration: 1.5,
    })

        .to(camera.rotation, {
            y: 1.5708 * Math.PI / 180,
            duration: 1.5,
        })


        .to(camera.position, {
            y: 200,
            duration: 1.5,
        })

        .to(camera.position, {
            z: 100,
            duration: 1.5,
        })

        .to(camera.rotation, {
            x: -30 * Math.PI / 180,
            duration: 1.5,
        })
}

function changeImages() {

    if (JSON.parse(localStorage.getItem('gallerySet'))) {

        localStorage.setItem('gallerySet', "false");
        document.location.reload();
    } else {

        localStorage.setItem('gallerySet', "true");
        document.location.reload();
    }
}

function perspectiveCamera() {

    const displayWidth = window.innerWidth;

    if (displayWidth < 981) {

        return 100
    } else {

        return 90
    }
}

