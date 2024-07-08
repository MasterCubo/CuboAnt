function calculateAnts() {
  
  // doesnt work at all cuz the whole page freezes when sti()
  // add some user feedback for STI()
  if (iterCount % 1000 == 0){
    p_iterCount.innerText = iterCount
  }
  
  
  // move all of the ants, store the pixels they are changing, THEN change those pixels.

  if (!reverse) {
    // load the pixel array once
    frameBuffer.loadPixels();
    pixelChanges = [];

    // for loop: move all ants, store pixel changes 
    for (let i = 0; i < ants.length; i++) {
      let ant = ants[i]; // reference

      // get the color of the pixel the ant is on
      let antOX = ant[0];
      let antOY = ant[1];
      
      let antLocR = frameBuffer.pixels[antOX * 4 + antOY * W * 4];
      let antLocG = frameBuffer.pixels[antOX * 4 + antOY * W * 4 + 1];
      let antLocB = frameBuffer.pixels[antOX * 4 + antOY * W * 4 + 2];
      let antLocation = color(antLocR, antLocG, antLocB);

      // find what direction the ant will move due to color
      let rule = -1;
      for (let j = 0; j < rulesC.length; j++) {
        if (rulesC[j].toString() == antLocation.toString()) {
          rule = j;
        }
      }

      let ruleDirection = rulesD[rule];

      // change the ants direction
      ant[2] = (ant[2] + ruleDirection + 360) % 360; // antD
      // move the ant
      switch (
        ant[2] // antD
      ) {
        case dir_U:
          ant[1] -= 1; // antY
          break;
        case dir_R:
          ant[0] += 1; // antX
          break;
        case dir_D:
          ant[1] += 1; // antY
          break;
        case dir_L:
          ant[0] -= 1; // antX
          break;
      }
      // wrap the ants locations
      if (wrap.checked) {
        if (ant[0] >= W) {
          ant[0] = 0;
        }
        if (ant[0] < 0) {
          ant[0] = W - 1;
        }
        if (ant[1] >= H) {
          ant[1] = 0;
        }
        if (ant[1] < 0) {
          ant[1] = H - 1;
        }
      } else {
        if (ant[0] >= W) {
          ant[0] = 0;
          noLoop();
                  console.log('ant died')

        }
        if (ant[0] < 0) {
          ant[0] = W - 1;
          noLoop();
                  console.log('ant died')

        }
        if (ant[1] >= H) {
          ant[1] = 0;
          noLoop();
                  console.log('ant died')

        }
        if (ant[1] < 0) {
          ant[1] = H - 1;
          noLoop();
                  console.log('ant died')

        }
      }

      let newColor = rulesC[(rule + 1) % rulesC.length];
      pixelChanges.push([antOX, antOY, newColor]);
    }

    // make the pixel changes
    for (let i = 0; i < pixelChanges.length; i++) {
      let x = pixelChanges[i][0];
      let y = pixelChanges[i][1];
      let c = pixelChanges[i][2];
      // change the color of the pixel
      frameBuffer.pixels[x * 4 + y * W * 4] = red(c);
      frameBuffer.pixels[x * 4 + y * W * 4 + 1] = green(c);
      frameBuffer.pixels[x * 4 + y * W * 4 + 2] = blue(c);
    }
    frameBuffer.updatePixels();
    iterCount += 1;
  }
  //
  /////////////////////////////////////////
  //
  else {
    // REVERSE TIME BABY
    // load the pixel array once
    // CURRENT FIX WHEN LOOKING BEHIND THE ANT, WRAP THAT LOOK
    frameBuffer.loadPixels();
    pixelChanges = [];

    // move all ants, store pixel changes
    for (let i = 0; i < ants.length; i++) {
      let ant = ants[i]; // reference

      // get the color of the pixel behind the ant
      let antX = ant[0];
      let antY = ant[1];

      switch (ant[2]) {
        case dir_U:
          antY += 1;
          break;
        case dir_R:
          antX -= 1;
          break;
        case dir_D:
          antY -= 1;
          break;
        case dir_L:
          antX += 1;
      }
      // wrap that pixel bbg
      if (wrap.checked){
        if(antX >= W){
          antX = 0
        }
        if(antX < 0){
          antX = W-1
        }
        if(antY >= H){
          antY = 0
        }
        if(antY < 0){
          antY = H-1
        }
      }
      else{
        noLoop()
        console.log('ant died')
      }
      
      let antLocR = frameBuffer.pixels[antX * 4 + antY * W * 4];
      let antLocG = frameBuffer.pixels[antX * 4 + antY * W * 4 + 1];
      let antLocB = frameBuffer.pixels[antX * 4 + antY * W * 4 + 2];
      let antLocation = color(antLocR, antLocG, antLocB);

      // move the ant backwards
      switch (
        ant[2] // antD
      ) {
        case dir_U:
          ant[1] += 1; // antY
          break;
        case dir_R:
          ant[0] -= 1; // antX
          break;
        case dir_D:
          ant[1] -= 1; // antY
          break;
        case dir_L:
          ant[0] += 1; // antX
          break;
      }

      // find what direction the ant will move due to color behind it
      let rule = -1;
      for (let j = 0; j < rulesC.length; j++) {
        if (rulesC[j].toString() == antLocation.toString()) {
          rule = j;
        }
      }
      // get the rule of the color BEHIND the one we found 
      rule = (rule + rulesD.length-1)%rulesD.length
      let ruleDirection = rulesD[rule];
      
      // it SHOULD be turning the opposite direction of the rule behind it. (negative) but that breaks it
      // change the ants direction
      ant[2] = (ant[2] - ruleDirection + 360) % 360; // antD

      // push to pixelChanges
      newColor = rulesC[(rule+1 + rulesC.length-1) % rulesC.length];
      pixelChanges.push([antX, antY, newColor]);

      // wrap the ants locations
      if (wrap.checked) {
        if (ant[0] >= W) {
          ant[0] = 0;
        }
        if (ant[0] < 0) {
          ant[0] = W - 1;
        }
        if (ant[1] >= H) {
          ant[1] = 0;
        }
        if (ant[1] < 0) {
          ant[1] = H - 1;
        }
      }
      else {
        noLoop()
        console.log("ant died")

}
    }
    // make the pixel changes
    for (let i = 0; i < pixelChanges.length; i++) {
      let x = pixelChanges[i][0];
      let y = pixelChanges[i][1];
      let c = pixelChanges[i][2];
      // change the color of the pixel
      frameBuffer.pixels[x * 4 + y * W * 4] = red(c);
      frameBuffer.pixels[x * 4 + y * W * 4 + 1] = green(c);
      frameBuffer.pixels[x * 4 + y * W * 4 + 2] = blue(c);
    }
    frameBuffer.updatePixels();
    iterCount -= 1;
  }
}

function sti(n) {
  // skip to iteration haha
  noLoop();
  let prevSimDir = reverse

  console.log("Processing...");

  if (n > iterCount) {
    // if we need to skip forward
    reverse = false

    let times = n - iterCount -1;

    for (let i of new Array(times).keys()) {
      calculateAnts();
    }
    draw();
    reverse = prevSimDir
    
  } else if (n < iterCount) {
    // skip backwards
    let times = iterCount - n - 1;
    reverse = true;
    for (let i of new Array(times).keys()) {
      calculateAnts();
    }
    draw();
    reverse = prevSimDir
  } else {
    // you failure :D
  }
}

function restartSim() {
  console.log("restarting")
  updatePresetHTML();
  iterCount = 0;
  reverse = false;

  fillColor = rulesC[0];

  createCanvas(W * SF, H * SF);
  pixelDensity(1);
  frameRate(fR);

  frameBuffer = createGraphics(W, H);
  noSmooth();

  // fill buffer
  frameBuffer.background(color(fillColor));

}
