// deck/boot.js — deck entry point.
// Original source was a single minified call:
//   C3({createDeck:A3,scenes:[$3,My,Ky,n5,g5,X5,ib,lb,yb,Pb,Bb,Gb,qb],transitions:{fade:P3,"portal-in":Xb,"portal-out":Yb,fold:$b,wash:Zb,flaps:tw,slam:iw,daybreak:sw,line:aw,tear:lw},makeAudio:G3,headless:new URLSearchParams(location.search).has("headless")});
// C3 is the boot helper (deck/framework.js), A3 builds the deck, G3 the audio bank.
// The scene constants keep their minified names; the aliases below give them their
// scene ids, and docs/scenes.md lists what each one is.
const bootDeck = C3;
const createDeck = A3;
const makeAudio = G3;

const office = $3;
const tower = My;
const boat = Ky;
const loop = n5;
const swarm = g5;
const dominoes = X5;
const calendar = ib;
const lamp = lb;
const selectall = yb;
const aim = Pb;
const futures = Bb;
const pile = Gb;
const questions = qb;

bootDeck({
  createDeck,
  scenes: [
    office,
    tower,
    boat,
    loop,
    swarm,
    dominoes,
    calendar,
    lamp,
    selectall,
    aim,
    futures,
    pile,
    questions,
  ],
  transitions: {
    fade: P3,
    "portal-in": Xb,
    "portal-out": Yb,
    fold: $b,
    wash: Zb,
    flaps: tw,
    slam: iw,
    daybreak: sw,
    line: aw,
    tear: lw,
  },
  makeAudio,
  // ?headless skips the opening loader / warmup path (used by the capture + verify scripts)
  headless: new URLSearchParams(location.search).has("headless"),
});
