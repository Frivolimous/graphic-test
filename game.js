function initGame() {
  daggerRect = new PIXI.Graphics();
  daggerRect.beginFill(0, 0.1);
  daggerRect.drawRect(0, 0, 100, 100);
  daggerRect.pivot.set(50, 50);
  daggerRect.position.set(400, 400);
  app.stage.addChild(daggerRect);

  daggerRect.interactive = true;
  daggerRect.buttonMode = true;
  daggerRect.addListener('pointerdown', e => throwDagger());
}

let daggers = [];
let daggerRect;

function makeDagger() {
  let dagger = new PIXI.Graphics();
  dagger.beginFill(0x00cc33);
  dagger.lineStyle(1);
  dagger.moveTo(-10, 0).lineTo(0, -50).lineTo(10, 0).lineTo(0,10).lineTo(-10,0);
  app.stage.addChild(dagger);
  dagger.position.set(daggerRect.x, daggerRect.y);
  daggers.push(dagger);
  return dagger;
}

function addDagger() {
  console.log('dagger added');
  let dagger = makeDagger();
  fanDaggers();

  new JMTween(dagger.scale, 300).from({x: 0, y: 0}).easing(Easing.Back.Out).start();
}

function throwDagger() {
  console.log('dagger thrown');
  let dagger = daggers.pop();

  new JMTween(dagger, 500).to({rotation: 0}).easing(Easing.Quadratic.Out).start().onUpdate(() => {
    let mag = 20;
    dagger.x += mag * Math.cos(dagger.rotation - Math.PI / 2);
    dagger.y += mag * Math.sin(dagger.rotation - Math.PI / 2);
  }).onComplete(() => dagger.destroy());
  fanDaggers();
}

function fanDaggers() {
  let angleBetween = Math.PI / (3 + 5 * daggers.length / 8);
  let angleA = 0 - angleBetween / 2 * (daggers.length - 1);

  daggers.forEach((dagger, i) => {
    let angle = angleA + angleBetween * i;
    new JMTween(dagger, 300).to({rotation: angle}).easing(Easing.Back.Out).start();
  });
}

window.addEventListener('keydown', e => {
  if (e.key === ' ') {
    addDagger();
  }
})
