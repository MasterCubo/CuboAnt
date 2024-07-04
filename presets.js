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

// you can also grab palletes by using Lospec's API, https://Lospec.com/palette-list/greyt-bit.json
// this outputs json, so json["colors"] contains a list of all of the hex codes.
// p5 has the built-in loadJSON function which works fllawlessly.

let output = []
function colorsArrayFromURL(url) {
  let test = 'hi'
  let json = loadJSON(url, success => {
  let hexes = json.colors
  output = []
  for (let c of hexes) {
    output.push([color(`#${c}`)])
  }
  })
  console.log(json)
  return output
}


function presetSwitch() {
  // presets
  // https://arxiv.org/pdf/math/9501233
  // https://en.wikipedia.org/wiki/Langton's_ant#Extension_to_multiple_ants
  // https://josephpetitti.com/ant

  // color palletes
  // https://lospec.com/palette-list

  switch (preset) {
    case 0:
      // the standard (works)
      presetInfo =
        "Preset 0:<br>The standard Langton's Ant.<br>Rules: LR <br>Colors: black-white.";
      wrap = false;
      W = 100;
      H = 100;
      SF = 4;
      ipr = 1;
      ants = [[floor(W / 2), floor(H / 2), dir_R]];
      rulesC = [color("white"), color("black")];
      rulesD = [turn_R, turn_L];
      break;

    case 1:
      // wierd bars!!! (works)
      presetInfo =
        "Preset 1:<br>Wierd bars that are generated using the 'No Change' command. <br>Rules: RN <br>Colors: white-black.";
      W = 100;
      H = 100;
      SF = 4;
      ipr = 5;
      wrap = false;
      ants = [
        [57, 57, dir_U],
        [57, 43, dir_L],
        [43, 43, dir_D],
        [43, 57, dir_R],
      ];
      rulesC = [color("white"), color("black")];
      rulesD = [turn_R, turn_N];
      break;

    case 2:
      presetInfo =
        "Preset 2:<br>Symmetric growth<br>Rules: LLRR<br>Colors: black-white-magenta-cyan";
      // LLRR symmetric growth (works)
      W = 200;
      H = 200;
      SF = 2;
      ipr = 10;
      wrap = true;
      ants = [[floor(W / 2), floor(H / 2), dir_L]];
      rulesC = [
        color("black"),
        color("white"),
        color("magenta"),
        color("cyan"),
      ];
      rulesD = [turn_L, turn_L, turn_R, turn_R];
      break;

    case 3:
      // RLLR
      presetInfo =
        "Preset 3:<br>More Symmetric growth<br>Rules: RLLR<br>Colors: <a href='https://lospec.com/palette-list/ice-cream-gb'>ICE CREAM GB Pallete</a>";
      H = 200;
      W = 200;
      SF = 2;
      ipr = 10;
      wrap = true;
      ants = [[floor(W / 2), floor(H / 2), dir_L]];
      rulesC = [
        color("#7c3f58"),
        color("#eb6b6f"),
        color("#f9a875"),
        color("#fff6d3"),
      ];
      rulesD = [turn_R, turn_L, turn_L, turn_R];
      break;

    case 4:
      // new rules! LRDU
      presetInfo =
        "Preset 4:<br>An ant using all 4 rules, turn left, turn right, no change, and u-turn<br>Rules: LRNU<br>Colors: <a href='https://lospec.com/palette-list/lava-gb'>LAVA-GB Pallete</a>";
      H = 200;
      W = 200;
      SF = 2;
      ipr = 10;
      wrap = true;
      ants = [[floor(W / 2), floor(H / 2), dir_U]];
      rulesC = [
        color("#051f39"),
        color("#4a2480"),
        color("#c53a9d"),
        color("#ff8e80"),
      ];
      rulesD = [turn_L, turn_R, turn_N, turn_U];
      break;

    case 5:
      // random LRLRLR
      presetInfo =
        "Preset 5:<br>A chaotic but normal ant with many rules.<br>Rules: LRLRLR<br>Colors: <a href='https://lospec.com/palette-list/curiosities'>CURIOSITIES Pallete</a>";
      H = 200;
      W = 200;
      SF = 2;
      ipr = 10;
      wrap = true;
      ants = [[floor(W / 2), floor(H / 2), dir_U]];
      rulesC = [
        color("#46425e"),
        color("#15788c"),
        color("#00b9be"),
        color("#ffeecc"),
        color("#ffb0a3"),
        color("#ff6973"),
      ];
      rulesD = [turn_L, turn_R, turn_L, turn_R, turn_L, turn_R];
      break;

    case 6:
      // spiral pattern LRLRLR SUPER SICK
      presetInfo =
        "Preset 6: <br>Very interesting spiral pattern that repeats. <br>Rules: 4 ants, LRLRLR<br>Colors: <a href='https://lospec.com/palette-list/curiosities'>CURIOSITIES Pallete</a>";
      W = 100;
      H = 100;
      SF = 4;
      ipr = 3;
      wrap = true;
      ants = [
        [50, 45, dir_D],
        [55, 50, dir_L],
        [50, 55, dir_U],
        [45, 50, dir_R],
      ];
      rulesC = [
        color("#46425e"),
        color("#15788c"),
        color("#00b9be"),
        color("#ffeecc"),
        color("#ffb0a3"),
        color("#ff6973"),
      ];
      rulesD = [turn_L, turn_R, turn_L, turn_R, turn_L, turn_R];
      wrap = true;
      break;

    case 7:
      // big triangular prism RRLLLRLLLRRR
      presetInfo =
        "Preset 7:<br>Creates a filled triangle shape that grows and moves after 15900~ iterations<br>Rules: RRLLLRLLLRRR<br>Colors: <a href='https://lospec.com/palette-list/everglow-diamond'>EVERGLOW DIAMOND Pallete</a>";
      W = 400;
      H = 400;
      SF = 1;
      ipr = 30;
      wrap = true;
      ants = [[floor(W / 2), floor(H / 2), dir_U]];
      rulesC = [
        color("#1a1c22"),
        color("#3f272b"),
        color("#54353d"),
        color("#50494c"),
        color("#6a5960"),
        color("#701f17"),
        color("#942626"),
        color("#a62e36"),
        color("#a14626"),
        color("#b15c34"),
        color("#d58941"),
        color("#ffe257"),
      ]; // or make #942626/#1a1c22 the background :D
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
      break;

    case 8:
      // RLR chaotic growth, no highway confirmed
      presetInfo =
        "Preset 8:<br>Chaotic growth with no confirmed highway<br>Rules: RLR <br>Colors: <a href='https://lospec.com/palette-list/minimal-red-3'>MINIMAL-RED-3 Pallete</a>";
      W = 200;
      H = 200;
      SF = 2;
      ipr = 25;
      wrap = true;
      ants = [[floor(W / 2), floor(H / 2), dir_U]];
      rulesC = [color("#373435"), color("#ed3237"), color("#fefefe")];
      // // alternate palettes, Bumblebit, 1-bit STYX, Mystique life 3, blue snow
      rulesD = [turn_R, turn_L, turn_R];
      break;

    case 9:
      // LLRRRLRLRLLR "creates a convoluted highway" 🤓
      presetInfo =
        "Preset 9:<br>Creates a convoluted highway.<br>Rules: LLRRRLRLRLLR<br>Colors: <a href='https://lospec.com/palette-list/ghost-town'>GHOST TOWN Pallete</a>";
      W = 200;
      H = 200;
      SF = 2;
      ipr = 50;
      wrap = true;
      ants = [[floor(W / 2), floor(H / 2), dir_D]];
      rulesC = [
        color("#496b83"),
        color("#2f325d"),
        color("#39456d"),
        color("#425879"),
        color("#517d91"),
        color("#528c9f"),
        color("#54a295"),
        color("#70bc93"),
        color("#8cd589"),
        color("#b7e097"),
        color("#daefab"),
        color("#f1f2b6"),
      ];
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
      break;

    case 10:
      //// LRRRRRLLR "fills itself in a square"
      presetInfo =
        "Preset 10:<br>Fills space in a square around itself.<br>Rules: LRRRRRLLR <br>Colors: <a href='https://lospec.com/palette-list/white-scape'>WHITE SCAPE Pallete</a>";
      W = 200;
      H = 200;
      SF = 2;
      wrap = true;
      ipr = 50;
      ants = [[floor(W / 2), floor(H / 2), dir_D]];
      rulesC = [
        color("#000000"),
        color("#1f232e"),
        color("#5f737b"),
        color("#a2b3b2"),
        color("#431837"),
        color("#a53551"),
        color("#e18f89"),
        color("#e1c0a9"),
        color("#e8e3e3"),
      ]; // alternate palletes, basic bit,  abyss-9, bloodmoon21
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
      break;
    case 11:
      presetInfo =
        "Preset 11:<br>The standard Langton's Ant, but 4 times. Oscillates infintely within a finite space<br>Rules: 4 ants, LR <br>Colors: <a href='https://lospec.com/palette-list/bitbee'>BITBEE Pallete</a>";
      wrap = false;
      W = 100;
      H = 100;
      SF = 4;
      ipr = 3;
      ants = [
        [57, 57, dir_U],
        [57, 43, dir_L],
        [43, 43, dir_D],
        [43, 57, dir_R],
      ];
      rulesC = [color("#292b30"), color("#cfab4a")];
      rulesD = [turn_R, turn_L];
      break;
    case 12:
      presetInfo =
        "Preset 12:<br>Another interesting oscillator, preset 6 copied 4 times. Repeats after 165,000 iterations. <br>Rules: 16 ants, LRLRLR <br>Colors: <a href='https://lospec.com/palette-list/autumn-decay'>AUTUMN DECAY Pallete</a>";
      wrap = true;
      W = 200;
      H = 200;
      SF = 2;
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
      rulesC = [
        color("#313638"),
        color("#574729"),
        color("#975330"),
        color("#c57938"),
        color("#ffad3b"),
        color("#ffe596"),
      ];
      rulesD = [turn_L, turn_R, turn_L, turn_R, turn_L, turn_R];
      break;
    case 13:
      presetInfo =
        "Preset 13:<br>idk yet<br>Rules: DLUR <br>Colors: <a href='https://lospec.com/palette-list/nostalgia'>NOSTALGIA Pallete</a>";
      wrap = false;
      W = 100;
      H = 100;
      SF = 4;
      ipr = 3;
      ants = [[50, 50, dir_U]]
      rulesC = [color("#d0d058"), color("#a0a840"), color("#708028"), color("#405010")];
      rulesD = [turn_D, turn_L, turn_U, turn_R];
      break;
  }
}

function preset0() {
      presetInfo =
        "Preset 0:<br>The standard Langton's Ant.<br>Rules: LR <br>Colors: black-white.";
      wrap = false;
      W = 100;
      H = 100;
      SF = 4;
      ipr = 1;
      ants = [[floor(W / 2), floor(H / 2), dir_R]];
      rulesC = [color("white"), color("black")];
      rulesD = [turn_R, turn_L];
}

function preset1() {
  // wierd bars!!! (works)
      presetInfo =
        "Preset 1:<br>Wierd bars that are generated using the 'No Change' command. <br>Rules: RN <br>Colors: white-black.";
      W = 100;
      H = 100;
      SF = 4;
      ipr = 5;
      wrap = false;
      ants = [
        [57, 57, dir_U],
        [57, 43, dir_L],
        [43, 43, dir_D],
        [43, 57, dir_R],
      ];
      rulesC = [color("white"), color("black")];
      rulesD = [turn_R, turn_N];
}

function preset2() {
   presetInfo =
        "Preset 2:<br>Symmetric growth<br>Rules: LLRR<br>Colors: black-white-magenta-cyan";
      // LLRR symmetric growth (works)
      W = 200;
      H = 200;
      SF = 2;
      ipr = 10;
      wrap = true;
      ants = [[floor(W / 2), floor(H / 2), dir_L]];
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
        "Preset 3:<br>More Symmetric growth<br>Rules: RLLR<br>Colors: <a href='https://lospec.com/palette-list/ice-cream-gb'>ICE CREAM GB Pallete</a>";
      H = 200;
      W = 200;
      SF = 2;
      ipr = 10;
      wrap = true;
      ants = [[floor(W / 2), floor(H / 2), dir_L]];
      rulesC = [
        color("#7c3f58"),
        color("#eb6b6f"),
        color("#f9a875"),
        color("#fff6d3"),
      ];
      rulesD = [turn_R, turn_L, turn_L, turn_R];
}

function preset4() {
  // new rules! LRDU
      presetInfo =
        "Preset 4:<br>An ant using all 4 rules, turn left, turn right, no change, and u-turn<br>Rules: LRNU<br>Colors: <a href='https://lospec.com/palette-list/lava-gb'>LAVA-GB Pallete</a>";
      H = 200;
      W = 200;
      SF = 2;
      ipr = 10;
      wrap = true;
      ants = [[floor(W / 2), floor(H / 2), dir_U]];
      rulesC = [
        color("#051f39"),
        color("#4a2480"),
        color("#c53a9d"),
        color("#ff8e80"),
      ];
      rulesD = [turn_L, turn_R, turn_N, turn_U];
}

let presets = [preset0, preset1, preset2, preset3, preset4, preset5, preset6, preset7, preset8, preset9, preset10, preset11, preset12, preset13]
