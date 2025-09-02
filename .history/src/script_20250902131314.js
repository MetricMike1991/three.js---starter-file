directionalLight.shadow.radius = 1;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
scene.add(directionalLight);
ground.receiveShadow = true;
ground.castShadow = false;
ground.visible = true;
scene.add(ground);
groundMaterial.alphaMap = radialAlphaMap;
groundMaterial.alphaMap.needsUpdate = true;
groundMaterial.transparent = true;
groundFolder.add(groundGuiParams, 'mode', ['Circle', 'Shadow Catcher']).name('Ground Mode').onChange((mode) => {
groundFolder.addColor(groundGuiParams, 'color').name('Color').onChange((value) => {
groundFolder.add(ground.material, 'roughness', 0, 1, 0.01).name('Roughness');
groundFolder.add(ground.material, 'metalness', 0, 1, 0.01).name('Metalness');
groundFolder.add(ground.material, 'opacity', 0, 1, 0.01).name('Opacity').onChange((value) => {
groundFolder.add(groundGuiParams, 'fade').name('Fade Edges').onChange((fade) => {
groundFolder.add(groundGuiParams, 'shadowOpacity', 0, 1, 0.01).name('Shadow Opacity').onChange((value) => {
groundFolder.add(ground, 'receiveShadow').name('Receive Shadow');
groundFolder.add(ground, 'castShadow').name('Cast Shadow');
groundFolder.add(ground, 'visible').name('Visible').onChange((v) => {
groundFolder.open();
ground.material.roughness = defaultSettings.ground.roughness;
ground.material.metalness = defaultSettings.ground.metalness;
ground.receiveShadow = defaultSettings.ground.receiveShadow;
ground.castShadow = defaultSettings.ground.castShadow;
ground.visible = defaultSettings.ground.visible;
directionalLight.intensity = defaultSettings.light.intensity;
directionalLight.color.set(defaultSettings.light.color);
directionalLight.position.set(
directionalLight.castShadow = defaultSettings.light.castShadow;
directionalLight.shadow.bias = defaultSettings.light.shadowBias;
directionalLight.shadow.radius = defaultSettings.light.shadowBlur;
directionalLight.shadow.mapSize.width = defaultSettings.light.shadowMapWidth;
directionalLight.shadow.mapSize.height = defaultSettings.light.shadowMapHeight;

// ...existing code...
        "color": "rgb(0,0,0)",

