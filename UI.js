function handleUI() {
  let p_sti = document.getElementById("p_sti");
  p_sti.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      let v = parseInt(p_sti.value);
      if (Number.isInteger(v)) {
        sti(v);
        p_sti.value = "";
      } else {
        p_sti.value = "Please enter a number";
      }
    }
  });

  let p_ipr = document.getElementById("p_ipr");
  let pP_ipr = document.getElementById("pP_ipr");
  p_ipr.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      let v = parseInt(p_ipr.value);
      if (Number.isInteger(v)) {
        ipr = v;
        p_ipr.value = ipr;
        pP_ipr.innerText = ipr
      } else {
        p_ipr.value = "Please enter a number";
      }
    }
  });

  let p_W = document.getElementById("p_W");
  p_W.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      let v = parseInt(p_W.value);
      if (Number.isInteger(v)) {
        customW = true;
        W = v;
        loadPreset();
        restartSim();
      } else {
        p_W.value = "Error";
      }
    }
  });

  let p_H = document.getElementById("p_H");
  p_H.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      let v = parseInt(p_H.value);
      if (Number.isInteger(v)) {
        customH = true;
        H = v;
        loadPreset();
        restartSim();
      } else {
        p_H.value = "Error";
      }
    }
  });

  let p_SF = document.getElementById("p_SF");
  p_SF.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      let v = parseInt(p_SF.value);
      if (Number.isInteger(v)) {
        customSF = true;
        SF = v;
        loadPreset();
        restartSim();
      } else {
        p_SF.value = "Error";
      }
    }
  });

  let s_preset = document.getElementById("s_preset");
  for (let i = 0; i < presets.length; i++) {
    let option = document.createElement("option");
    option.text = i;
    s_preset.add(option);
  }
}

function loadPresetButton() {
  customRotate = false;
  customW = false;
  customH = false;
  customSF = false;

  let s_preset = document.getElementById("s_preset");
  preset = parseInt(s_preset.value);
  loadPreset();
  restartSim();
}

function loadPallete() {
  let s_pallete = document.getElementById("s_pallete");
  let palleteChoice = s_pallete.value;
  pallete = palleteChoice;
  loadPreset();
  restartSim();
}

function rotatePallete() {
  let s_pallete = document.getElementById("s_pallete");
  let palleteChoice = s_pallete.value;
  pallete = palleteChoice;
  customRotate = true;
  rulesC.push(rulesC.shift());
  loadPreset();
  restartSim();
}

function playReverse() {
  reverse = true;
  loop();
}
function stepReverse() {
  noLoop();
  reverse = true;
  draw();
}
function pause() {
  noLoop();
}

function reset() {
  let s_pallete = document.getElementById("s_pallete");
  let palleteChoice = s_pallete.value;
  pallete = palleteChoice;
  customRotate = true;
  loadPreset();
  restartSim();
}
function stepForward() {
  reverse = false;
  noLoop();
  draw();
}
function playForward() {
  reverse = false;
  loop();
}

function updatePresetHTML() {
  
    document.getElementById("p_presetInfo").innerHTML = presetInfo;
  
  
  let p_rules = document.getElementById("p_rules");
  let string = `&ensp;${ants.length} ant(s),&ensp;`;
  for (let r of rulesD) {
    switch (r) {
      case turn_L:
        string += "L";
        break;
      case turn_R:
        string += "R";
        break;
      case turn_N:
        string += "N";
        break;
      case turn_U:
        string += "U";
        break;
    }
  }
  p_rules.innerHTML = string;

  let p_pallete = document.getElementById("p_pallete");
  let palleteURL = pallete.slice(0, -1);
  // turn all spaces to '-' and take any non-letter, non-numbers out.
  palleteURL = palleteURL
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
  p_pallete.innerHTML = `&ensp;<a href="https://lospec.com/palette-list/${palleteURL}">${pallete.slice(0,-1)} Pallete</a>`;

  let s_pallete = document.getElementById("s_pallete");

  // Remove all options to add the new ones
  while (s_pallete.options.length > 0) {
    s_pallete.remove(0);
  }

  let size = rulesC.length;
  let namesWithSize = [];
  for (let [name, attributes] of Object.entries(palletes)) {
    if (attributes.size === size) {
      namesWithSize.push(name);
    }
  }
  let option = document.createElement("option");
  option.text = pallete.slice(0, -1);
  s_pallete.add(option);
  namesWithSize.splice(namesWithSize.indexOf(pallete.slice(0, -1)), 1);
  for (let name of namesWithSize) {
    let option = document.createElement("option");
    option.text = name;
    s_pallete.add(option);
  }

  let p_W = document.getElementById("p_W");
  let p_H = document.getElementById("p_H");
  let p_SF = document.getElementById("p_SF");
  p_W.value = W;
  p_H.value = H;
  p_SF.value = SF;
  
  let p_ipr = document.getElementById("p_ipr")
  p_ipr.value = ipr
  let pP_ipr = document.getElementById("pP_ipr")
  pP_ipr.innerText = ipr
}

function createUI() {
  //   p_presetInfo = createP("Placeholder");
  //   p_presetInfo.style("color", "#ddd");
  //   p_presetInfo.position(W * SF * 4, 0, "static");
  //   let playReverse = createButton("⏮");
  //   playReverse.mousePressed(
  //     (func = () => {
  //       reverse = true;
  //       loop();
  //     })
  //   );
  //   let stepReverse = createButton("⏴");
  //   stepReverse.mousePressed(
  //     (func = () => {
  //       reverse = true;
  //       noLoop();
  //       draw();
  //     })
  //   );
  //   let pause = createButton("⏸");
  //   pause.mousePressed(
  //     (func = () => {
  //       noLoop();
  //     })
  //   );
  //   let reset = createButton("↺");
  //   reset.mousePressed(
  //     (func = () => {
  //       setup();
  //     })
  //   );
  //   let stepForward = createButton("⏵");
  //   stepForward.mousePressed(
  //     (func = () => {
  //       reverse = false;
  //       noLoop();
  //       draw();
  //     })
  //   );
  //   let playForward = createButton("⏭");
  //   playForward.mousePressed(
  //     (func = () => {
  //       reverse = false;
  //       loop();
  //     })
  //   );
  //   renderAnts = createCheckbox("Render Ants", true);
  //   renderAnts.id("renderAnts")
  //   // wrap = createCheckbox("Wrap Screen", false)
  //   // wrap.id("wrap")
  //   let p_ps = createP("Load Preset:");
  //   p_ps.style("color", "#ddd");
  //   let presetSelect = createSelect();
  //   for (let i = 0; i<presets.length; i++){
  //     presetSelect.option(i)
  //   }
  //   let loadPreset = createButton("Load");
  //   loadPreset.mousePressed(
  //     (func = () => {
  //       preset = presetSelect.selected()
  //       setup();
  //     })
  //   );
  //   let p_sti = createP("Skip To Iteration");
  //   p_sti.style("color", "#ddd");
  //   let stiInput = createInput();
  //   let stiRun = createButton("Skip");
  //   stiRun.mousePressed(
  //     (func = () => {
  //       sti(stiInput.value());
  //     })
  //   );
  //   let p_ipr = createP(`Iterations Per Refresh (IPR)`);
  //   p_ipr.style("color", "#ddd");
  //   let iprInput = createInput();
  //   let iprRun = createButton("Set");
  //   iprRun.mousePressed(
  //     (func = () => {
  //       ipr = parseInt(iprInput.value());
  //     })
  //   );
}
