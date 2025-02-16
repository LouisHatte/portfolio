<script lang="ts">
  import { onMount } from "svelte";
  import * as THREE from "three";
  import { GLTFLoader } from "three-stdlib";

  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let prevYRotation: number;
  let models: THREE.Group[] = [];
  let modelIndex = 0;

  function loadModel(url: string): Promise<THREE.Group> {
    const loader = new GLTFLoader();
    return new Promise((resolve, reject) => {
      loader.load(
        url,
        (gltf) => resolve(gltf.scene),
        undefined,
        (error) => reject(error)
      );
    });
  }

  onMount(async () => {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    try {
      const greenModel = await loadModel("/coin-blue.glb");
      const blueModel = await loadModel("/coin-red.glb");
      const redModel = await loadModel("/coin-green.glb");

      models.push(greenModel, blueModel, redModel);
      models.forEach((model) => {
        model.rotation.y = Math.PI / 2;
        scene.add(model);
      });
    } catch (error) {
      console.error("Error loading models:", error);
    }

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    models.forEach((model, index) => {
      if (index !== 0) {
        model.visible = false;
      }
    });
    renderer.render(scene, camera);
    renderer.domElement.style.zIndex = "-1";
    document.getElementById("cube-container")?.appendChild(renderer.domElement);

    camera.position.z = 25;

    const topLight = new THREE.DirectionalLight(0xffffff, 1);
    topLight.position.set(500, 500, 500);
    topLight.castShadow = true;
    scene.add(topLight);

    const bottomLight = new THREE.DirectionalLight(0xffffff, 1);
    bottomLight.position.set(-500, -500, -500);
    bottomLight.castShadow = true;
    scene.add(bottomLight);

    const ambientLight = new THREE.AmbientLight(0x333333, 1);
    scene.add(ambientLight);

    function animate() {
      requestAnimationFrame(animate);
      scene.rotation.y += 0.01;
      scene.rotation.x += 0.005;
      const currentYRotation = Math.round(scene.rotation.y % Math.PI);
      if (prevYRotation !== undefined && prevYRotation > currentYRotation) {
        models[modelIndex].visible = false;
        modelIndex = (modelIndex + 1) % models.length;
        models[modelIndex].visible = true;
      }
      prevYRotation = currentYRotation;
      renderer.render(scene, camera);
    }

    window.addEventListener("resize", function () {
      const container = document.getElementById("cube-container")!;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });

    animate();
  });
</script>

<div id="cube-container"></div>

<style>
  #cube-container {
    height: 100%;
    display: flex;
    justify-content: center;
    /* align-items: center; */
    z-index: var(--z-last);
  }
</style>
