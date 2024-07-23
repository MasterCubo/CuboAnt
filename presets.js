// others 
// https://www.reddit.com/r/cellular_automata/comments/h83t3z/this_is_the_largest_highway_ive_found_on_langtons/
// RRLRLLRRLRRRRRRRRRLLLLRLRR loops at 6518789812888 

// Rule	                           Estimated period
// LLRLRRRLRRLLLRRLLLLLLRLLRLRR	   3e154
// LLRLRRLLRLLLLLLRRLLLR	       >=1.104122836656e15
// RRLRLLRRLRRRRRRRRRLLLRLLRLR	   >=4.18492189e13
// RRRLRRLLRLRRRRLLRRRLLRLR	       3.77616273e16
// RRRLRRLLRLRRRRRRRRRLR	       5.64742157e15
// LLRLRRLLRLLLLLLLLRRRRRRLRLR	   >=5.730524292850e12
// RRLRLLRRLRRRRRRRRRLRRLRLRR	   >= 1.18229126e13
// LLRLRRLLRLLLLLLLLRRRLLRLR	   -
// LLRLRRLLRLLLLLLLLLLRLRLR	       -

// http://www.thealmightyguru.com/Wiki/index.php?title=Langton%27s_ant
// LLRLRLL - Generates a triangular highway.
// RRLLLRRL - Has a very slow growth, but the pattern looks like a throwing star.
// LLRLRRLLL - A 90 degree very big pyramid-like highway.
// RLRRLLLLL - Has aspects of a Sierpinski triangle.
// LFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFR - Circles with tendrils which become more noisy as they near the center. (F's are N's)
// LLBR - The ant goes out on long excursions before returning to the central mass. (B's are U's

// make a 256 rule setup, I bet i can find a 256 color pallete



// can get more palletes of these sizes:
// good ish 4, 2, 6,
// more 12, 3, 9, 11

let palletes = {}
let promises = []
let pallete = "⏸"
let fillColorIdx = 0

let customRotate = false
let customW = false
let customH = false
let customSF = false

function loadAllJSON(){
  palleteURLS = [
      "ice-cream-gb",
      "lava-gb",
      "everglow-diamond",
      "curiosities",
      "minimal-red-3",
      "ghost-town",
      "white-scape",
      "bitbee",
      "autumn-decay",
      "nostalgia",
      "bumblebit",
      "1bit-styx",
      "mystique-life-3",
      "blue-snow",
      "basic-bit",
      "abyss-9",
      "bloodmoon21",
      "mother-nature",
      "inkpink",
      "1bit-monitor-glow",
      "gato-roboto-virtual-cat",
      "gato-roboto-goop",
      "generic-milk-carton",
      "ys-postapocalyptic-sunset",
      "casio-basic",
      "1-bit-chill",
      "cubo-ant-1-rejected-r4GF",
      "cloudfrenzy",
      "joker-6",
      "royalguard",
      "ice-cream-spice",
      "moonlight-gb",
      "wish-gb",
      "gold-gb",
      "horehound-4",
      "minty-fresh",
      "lava-has-the-viscosity-of-ketchup",
      "enchanted-purple",
      "nebulosa",
      "skyline-12",
      "12-bit-rainbow",
      // "",
      // "",
      // "",
      // "",
      // "",
      // "",
    
                 ]
  for (let pURL of palleteURLS){
    console.log("loading",pURL)
    promises.push(loadJSONasync(`https://Lospec.com/palette-list/${pURL}.json`));
  }
}
  
function loadJSONasync(url){
  return new Promise((success, failure) => {
    loadJSON(url, parseJSON, failure);
  });  
}


function success(){
  console.log("promise success")
}

function failure(err){
  console.log(err)
}

function parseJSON(json){
  console.log("loaded", json.name)
  let hexes = json.colors
  let output = []
  for (let c of hexes){
    output.push(color(`#${c}`))
  }
  palletes[json.name] = {size: output.length, colors: output, author: json.author}
}


function loadPreset(){
  console.log(preset)
  presets[preset]();
}

function preset0() {
      presetInfo =
        "Preset 0:<br>The standard Langton's Ant.";
      wrap.checked = false;
  
      W =  customW ? W : 100
      H = customH ? H : 100
      SF = customSF ? SF : 4;
  
      ipr = 1;
      ants = [[floor(W/2), floor(H/2), dir_R]];
  
      pallete = pallete.includes("⏸") ? "1bit Monitor Glow" : pallete;
  
      if(!customRotate){
        rulesC = Array.from(palletes[pallete].colors)
        fillColorIdx = 0
        for (let i = 0; i < fillColorIdx; i++) { // rotates the array to have a different fillColor
          rulesC.push(rulesC.shift());
        }
      }
  
      rulesD = [turn_R, turn_L];
  

      pallete = pallete+"⏸" // fixes custom pallete-ing, when you set a custom pallete it DOESNT put the pause on it. So you can check if its custom by seeing if theres a pause on it. I'm not entirely sure I need this, but its effects are negligible. This wasn't meant to be perfect code, it was a week-long fun project. 😁
      customRotate = false

  
}

function preset1() {
  // wierd bars!!! (works)
      presetInfo =
        "Preset 1:<br>Wierd bars that are generated using the 'No Change' command. Counts up in binary bars. ";
      W = customW ? W :100;
      H = customH ? H : 100;
      SF = customSF ? SF : 4;
      ipr = 5;
      wrap.checked = false;
      ants = [
        [floor(W/2)+7, floor(H/2)+7, dir_U],
        [floor(W/2)+7, floor(H/2)-7, dir_L],
        [floor(W/2)-7, floor(H/2)-7, dir_D],
        [floor(W/2)-7, floor(H/2)+7, dir_R],
      ];
      pallete = pallete.includes("⏸") ? "Casio Basic" : pallete;
      if(!customRotate){
        rulesC = Array.from(palletes[pallete].colors)
        fillColorIdx = 0
        for (let i = 0; i < fillColorIdx; i++) { // rotates the array to have a different fillColor
          rulesC.push(rulesC.shift());
        }
      }
      rulesD = [turn_R, turn_N];
  
    pallete = pallete+"⏸"
    customRotate = false
}

function preset2() {
   presetInfo =
        "Preset 2:<br>Symmetric growth, grows into a cardioid shape";
      // LLRR symmetric growth (works)
      W = customW ?  W : 200;
      H = customH ?  H : 200;
      SF = customSF ? SF :2;
      ipr = 10;
      wrap.checked = true;
      ants = [[floor(W/2), floor(H/2), dir_L]];
      pallete = pallete.includes("⏸") ? "Cubo Ant 1" : pallete;
      if(!customRotate){
        rulesC = Array.from(palletes[pallete].colors)
        fillColorIdx = 0
        for (let i = 0; i < fillColorIdx; i++) { // rotates the array to have a different fillColor
          rulesC.push(rulesC.shift());
        }
      }
      rulesD = [turn_L, turn_L, turn_R, turn_R];
   pallete = pallete+"⏸"
    customRotate = false
}

function presetLOSPECSUBMISSION() {
   presetInfo =
        "Preset 2:<br>Symmetric growth, grows into a cardioid shape";
      // LLRR symmetric growth (works)
      W = customW ?  W : 232;
      H = customH ?  H : 60;
      SF = customSF ? SF :2;
      ipr = 10;
      wrap.checked = true;
      ants = [[114, 32, dir_L], [50, 32, dir_U], [114+64, 32, dir_D]];
      pallete = pallete.includes("⏸") ? "" : pallete;
      rulesC = [
        color("black"),
        color("white"),
        color("magenta"),
        color("cyan"),
      ];
      rulesD = [turn_L, turn_L, turn_R, turn_R];
}

function preset3() {
  // RLLR
      presetInfo =
        "Preset 3:<br>More Symmetric growth";
      H = customH ?  H :200;
      W = customW ?  W :200;
      SF = customSF ? SF :2;
      ipr = 10;
      wrap.checked = true;
      ants = [[floor(W/2), floor(H/2), dir_L]];
      pallete = pallete.includes("⏸") ? "Ice Cream GB" : pallete;
      if(!customRotate){
        rulesC = Array.from(palletes[pallete].colors)
        fillColorIdx = 0
        for (let i = 0; i < fillColorIdx; i++) { // rotates the array to have a different fillColor
          rulesC.push(rulesC.shift());
        }
      }  
      rulesD = [turn_R, turn_L, turn_L, turn_R];
    pallete = pallete+"⏸"
    customRotate = false
}

function preset4() {
  // new rules! LRDU
      presetInfo =
        "Preset 4:<br>An ant using all 4 rules, turn left, turn right, no change, and u-turn";
      H = customH ?  H :200;
      W = customW ?  W :200;
      SF = customSF ? SF :2;
      ipr = 10;
      wrap.checked = true;
      ants = [[floor(W/2), floor(H/2), dir_U]];
      pallete = pallete.includes("⏸") ? "Lava-GB" : pallete;
      if(!customRotate){
        rulesC = Array.from(palletes[pallete].colors)
        fillColorIdx = 0
        for (let i = 0; i < fillColorIdx; i++) { // rotates the array to have a different fillColor
          rulesC.push(rulesC.shift());
        }
      }
      rulesD = [turn_L, turn_R, turn_N, turn_U];
  pallete = pallete+"⏸"
    customRotate = false
}

function preset5() {
  // random LRLRLR
      presetInfo =
        "Preset 5:<br>A chaotic but normal ant with many rules.";
      H = customH ?  H :200;
      W = customW ?  W :200;
      SF = customSF ? SF :2;
      ipr = 10;
      wrap.checked = true;
      ants = [[floor(W/2), floor(H/2), dir_U]];
      pallete = pallete.includes("⏸") ? "INKPINK" : pallete;
      if(!customRotate){
        rulesC = Array.from(palletes[pallete].colors)
        fillColorIdx = 5
        for (let i = 0; i < fillColorIdx; i++) { // rotates the array to have a different fillColor
          rulesC.push(rulesC.shift());
        }
      }
      rulesD = [turn_L, turn_R, turn_L, turn_R, turn_L, turn_R];
  pallete = pallete+"⏸"
    customRotate = false
}

function preset6() {
  // spiral pattern LRLRLR SUPER SICK
      presetInfo =
        "Preset 6: <br>Very interesting spiral pattern that repeats. ";
      W = customW ?  W :100;
      H = customH ?  H :100;
      SF = customSF ? SF :4;
      ipr = 3;
      wrap.checked = true;
      ants = [
        [floor(W/2), floor(H/2)-5, dir_D],
        [floor(W/2)+5, floor(H/2), dir_L],
        [floor(W/2), floor(H/2)+5, dir_U],
        [floor(W/2)-5, floor(H/2), dir_R],
      ];
      pallete = pallete.includes("⏸") ? "curiosities" : pallete;
      if(!customRotate){
        rulesC = Array.from(palletes[pallete].colors)
        fillColorIdx = 0
        for (let i = 0; i < fillColorIdx; i++) { // rotates the array to have a different fillColor
          rulesC.push(rulesC.shift());
        }
      }
      rulesD = [turn_L, turn_R, turn_L, turn_R, turn_L, turn_R];
  pallete = pallete+"⏸"
    customRotate = false
}

function preset7() {
  // big triangular prism RRLLLRLLLRRR
      presetInfo =
        "Preset 7:<br>Creates a filled triangle shape that grows and moves after 15900~ iterations";
      W = customW ?  W :400;
      H = customH ?  H :400;
      SF = customSF ? SF :1;
      ipr = 30;
      wrap.checked = true;
      ants = [[floor(W/2), floor(H/2), dir_U]];
      pallete = pallete.includes("⏸") ? "Everglow Diamond" : pallete;
      if(!customRotate){
        rulesC = Array.from(palletes[pallete].colors)
        fillColorIdx = 0
        for (let i = 0; i < fillColorIdx; i++) { // rotates the array to have a different fillColor
          rulesC.push(rulesC.shift());
        }
      }
      rulesD = [
        turn_R,
        turn_R,
        turn_L,
        turn_L,
        turn_L,
        turn_R,
        turn_L,
        turn_L,
        turn_L,
        turn_R,
        turn_R,
        turn_R,
      ];
  pallete = pallete+"⏸"
    customRotate = false
}

function preset8(){
  // RLR chaotic growth, no highway confirmed
      presetInfo =
        "Preset 8:<br>Chaotic growth with no confirmed highway";
      W = customW ?  W :200;
      H = customH ?  H :200;
      SF = customSF ? SF :2;
      ipr = 25;
      wrap.checked = true;
      ants = [[floor(W/2), floor(H/2), dir_U]];
      pallete = pallete.includes("⏸") ? "1bit-styx" : pallete;
      if(!customRotate){
        rulesC = Array.from(palletes[pallete].colors)
        fillColorIdx = 2
        for (let i = 0; i < fillColorIdx; i++) { // rotates the array to have a different fillColor
          rulesC.push(rulesC.shift());
        }
      }
      // // alternate palettes, BumbleBit, 1bit-styx, Mystique life 3, Blue Snow, Minimal-Red-3
      rulesD = [turn_R, turn_L, turn_R];
       pallete = pallete+"⏸"
      customRotate = false
}

function preset9(){
  // LLRRRLRLRLLR "creates a convoluted highway" 🤓
      presetInfo =
        "Preset 9:<br>Creates a convoluted highway.";
      W = customW ?  W :200;
      H = customH ?  H :200;
      SF = customSF ? SF :2;
      ipr = 50;
      wrap.checked = true;
      ants = [[floor(W/2), floor(H/2), dir_D]];
      pallete = pallete.includes("⏸") ? "Ghost Town" : pallete;
  
      if(!customRotate){
        rulesC = Array.from(palletes[pallete].colors)
        fillColorIdx = 3
        for (let i = 0; i < fillColorIdx; i++) { // rotates the array to have a different fillColor
          rulesC.push(rulesC.shift());
        }
      }
      rulesD = [
        turn_L,
        turn_L,
        turn_R,
        turn_R,
        turn_R,
        turn_L,
        turn_R,
        turn_L,
        turn_R,
        turn_L,
        turn_L,
        turn_R,
      ];
  pallete = pallete+"⏸"
    customRotate = false
}

function preset10(){
  //// LRRRRRLLR "fills itself in a square"
      presetInfo =
        "Preset 10:<br>Fills space in a square around itself.";
      W = customW ?  W :200;
      H = customH ?  H :200;
      SF = customSF ? SF :2;
      wrap.checked = true;
      ipr = 50;
      ants = [[floor(W/2), floor(H/2), dir_D]];
      pallete = pallete.includes("⏸") ? "White Scape" : pallete;
      if(!customRotate){
        rulesC = Array.from(palletes[pallete].colors)
        fillColorIdx = 0
        for (let i = 0; i < fillColorIdx; i++) { // rotates the array to have a different fillColor
          rulesC.push(rulesC.shift());
        }
      }
      rulesD = [
        turn_L,
        turn_R,
        turn_R,
        turn_R,
        turn_R,
        turn_R,
        turn_L,
        turn_L,
        turn_R,
      ];
  pallete = pallete+"⏸"
    customRotate = false
}

function preset11(){
  presetInfo =
        "Preset 11:<br>The standard Langton's Ant, but 4 times. Oscillates infintely within a finite space";
      wrap.checked = false;
      W = customW ?  W :100;
      H = customH ?  H :100;
      SF = customSF ? SF :4;
      ipr = 3;
      ants = [
        [floor(W/2)+7, floor(H/2)+7, dir_U],
        [floor(W/2)+7, floor(H/2)-7, dir_L],
        [floor(W/2)-7, floor(H/2)-7, dir_D],
        [floor(W/2)-7, floor(H/2)+7, dir_R],
      ];
      pallete = pallete.includes("⏸") ? "Bitbee" : pallete;
      if(!customRotate){
        rulesC = Array.from(palletes[pallete].colors)
        fillColorIdx = 0
        for (let i = 0; i < fillColorIdx; i++) { // rotates the array to have a different fillColor
          rulesC.push(rulesC.shift());
        }
      }
      rulesD = [turn_R, turn_L];
  pallete = pallete+"⏸"
    customRotate = false
}

function preset12(){
  presetInfo =
        "Preset 12:<br>Another interesting oscillator, preset 6 copied 4 times. Repeats after 165,000 iterations. ";
      wrap.checked = true;
      W = customW ?  W : 200;
      H = customH ?  H : 200;
      SF = customSF ?  SF : 2;
      ipr = 100;
      ants = [
        [50, 45, dir_D],
        [55, 50, dir_L],
        [50, 55, dir_U],
        [45, 50, dir_R],
        [150, 45, dir_D],
        [155, 50, dir_L],
        [150, 55, dir_U],
        [145, 50, dir_R],
        [150, 145, dir_D],
        [155, 150, dir_L],
        [150, 155, dir_U],
        [145, 150, dir_R],
        [50, 145, dir_D],
        [55, 150, dir_L],
        [50, 155, dir_U],
        [45, 150, dir_R]
      ];
      pallete = pallete.includes("⏸") ? "Autumn Decay" : pallete;
      if(!customRotate){
        rulesC = Array.from(palletes[pallete].colors)
        fillColorIdx = 0
        for (let i = 0; i < fillColorIdx; i++) { // rotates the array to have a different fillColor
          rulesC.push(rulesC.shift());
        }
      }
      rulesD = [turn_L, turn_R, turn_L, turn_R, turn_L, turn_R];
  pallete = pallete+"⏸"
    customRotate = false

}

function preset13(){
   presetInfo =
        "Preset 13:<br>Interesting cross pattern with linear highways and a knot in the middle";
      wrap.checked = true;
      W = customW ?  W :100;
      H = customH ?  H :100;
      SF = customSF ? SF :4;
      ipr = 10;
      ants = [[50, 50, dir_U]]
      pallete = pallete.includes("⏸") ? "Nostalgia" : pallete;
      if(!customRotate){
        rulesC = Array.from(palletes[pallete].colors)
        fillColorIdx = 0
        for (let i = 0; i < fillColorIdx; i++) { // rotates the array to have a different fillColor
          rulesC.push(rulesC.shift());
        }
      }
      rulesD = [turn_U, turn_L, turn_N, turn_R];
  pallete = pallete+"⏸"
    customRotate = false
}

function preset14() {
      presetInfo =
        "Preset 14:<br>Falls into a pattern of making Archimedes' spiral, surrounded by a solid square of cells.";
      wrap.checked = false;
      W = customW ?  W :400;
      H = customH ?  H :400;
      SF = customSF ? SF :1;
      ipr = 25;
      ants = [[200, 200, dir_R]];
      pallete = pallete.includes("⏸") ? "Mother nature" : pallete;
      if(!customRotate){
        rulesC = Array.from(palletes[pallete].colors)
        fillColorIdx = 0
        for (let i = 0; i < fillColorIdx; i++) { // rotates the array to have a different fillColor
          rulesC.push(rulesC.shift());
        }
      }
      rulesD = [turn_L, turn_R, turn_R, turn_R, turn_R, turn_L, turn_L, turn_L, turn_R, turn_R, turn_R];
  pallete = pallete+"⏸"
    customRotate = false
}

function preset15() {
  //RLLLLRRRLLLR
  //Falls into a pattern of making a logarithmic spiral, surrounded by a solid square of cells.
        presetInfo =
        "Preset 15:<br>Falls into a pattern of making a Logarithmic spiral, surrounded by a solid square of cells.";
      wrap.checked = false;
      W = customW ?  W :400;
      H = customH ?  H :400;
      SF = customSF ? SF :1;
      ipr = 25;
      ants = [[200, 200, dir_R]];
      pallete = pallete.includes("⏸") ? "Everglow Diamond" : pallete;
      if(!customRotate){
        rulesC = Array.from(palletes[pallete].colors)
        fillColorIdx = 3
        for (let i = 0; i < fillColorIdx; i++) { // rotates the array to have a different fillColor
          rulesC.push(rulesC.shift());
        }
      }
      rulesD = [turn_R, turn_L, turn_L, turn_L, turn_L, turn_R, turn_R, turn_R, turn_L, turn_L, turn_L, turn_R];
  pallete = pallete+"⏸"
    customRotate = false
}

let presets = [preset0, preset1, preset2, preset3, preset4, preset5, preset6, preset7, preset8, preset9, preset10, preset11, preset12, preset13, preset14, preset15]
