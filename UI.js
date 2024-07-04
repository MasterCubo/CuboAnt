function createUI() {
  p_presetInfo = createP("Placeholder");
  p_presetInfo.style("color", "#ddd");
  p_presetInfo.position(W * SF * 4, 0, "static");

  let playReverse = createButton("⏮");
  playReverse.mousePressed(
    (func = () => {
      reverse = true;
      loop();
    })
  );
  let stepReverse = createButton("⏴");
  stepReverse.mousePressed(
    (func = () => {
      reverse = true;
      noLoop();
      draw();
    })
  );
  let pause = createButton("⏸");
  pause.mousePressed(
    (func = () => {
      noLoop();
    })
  );
  let reset = createButton("↺");
  reset.mousePressed(
    (func = () => {
      setup();
    })
  );
  let stepForward = createButton("⏵");
  stepForward.mousePressed(
    (func = () => {
      reverse = false;
      noLoop();
      draw();
    })
  );
  let playForward = createButton("⏭");
  playForward.mousePressed(
    (func = () => {
      reverse = false;
      loop();
    })
  );

  let presetSelect = createSelect();
  for (let i = 0; i<presets.length; i++){
    presetSelect.option(i)
  }
  let loadPreset = createButton("Load");
  loadPreset.mousePressed(
    (func = () => {
      preset = presetSelect.selected()
      setup();
    })
  );
  
  renderAnts = createCheckbox("Render Ants: ", true);
  
  

  let p_sti = createP("Skip To Iteration");
  p_sti.style("color", "#ddd");
  let stiInput = createInput();
  let stiRun = createButton("Skip");
  stiRun.mousePressed(
    (func = () => {
      sti(stiInput.value());
    })
  );

  let p_ipr = createP(`Iterations Per Refresh (IPR)`);
  p_ipr.style("color", "#ddd");
  let iprInput = createInput();
  let iprRun = createButton("Set");
  iprRun.mousePressed(
    (func = () => {
      ipr = parseInt(iprInput.value());
    })
  );
}
