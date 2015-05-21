Session.setDefault('easter egg counter', 0);

Template.allgood.helpers({
  duzo: function() {
    return Session.get('easter egg counter') > 6;
  },
});

Template.allgood.events({
    'click .cover': function(event) {
        Session.set('easter egg counter', Session.get('easter egg counter') + 1);
    },
});

Template.allgood.onRendered(function() {

  var ninja = this.find("#play-ninja");
  var cover = this.find(".cover");

  var transform;
  var timer;

  if (!ninja) {
    return false;
  }

  var mc = new Hammer.Manager(ninja);

  mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
  mc.add(new Hammer.Swipe()).recognizeWith(mc.get('pan'));
  mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(mc.get('pan'));
  mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([mc.get('pan'), mc.get('rotate')]);

  mc.on("panstart panmove", onPan);
  mc.on("rotatestart rotatemove", onRotate);
  mc.on("pinchstart pinchmove", onPinch);

  mc.on("hammer.input", function(ev) {
    if (ev.isFinal) {
      resetElement();
    }
  });

  function resetElement() {
    ninja.className = 'animate';
    transform = {
      translate: { x: 0, y: 0 },
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
    };
    window.requestAnimationFrame(updateElementTransform);
  }

  function updateElementTransform() {
    var value = [
      'translate3d(' + transform.translate.x + 'px, ' +
        transform.translate.y + 'px, 0)',
      'scale(' + transform.scale + ', ' + transform.scale + ')',
      'rotateX('+ transform.rotateX + 'deg)',
      'rotateY('+ transform.rotateY + 'deg)',
      'rotateZ('+ transform.rotateZ + 'deg)',
    ];

    value = value.join(" ");
    ninja.style.webkitTransform = value;
    ninja.style.mozTransform = value;
    ninja.style.transform = value;
  }

  var max = Math.min(cover.offsetWidth / 2, cover.offsetHeight / 2);

  function damp(x, max) {
    var abs = max * (1 - Math.exp(-0.005 * Math.abs(x)));
    return x > 0 ? abs : -abs;
  }

  function onPan(ev) {
    ninja.className = '';
    transform.translate = {
      x: damp(ev.deltaX, max),
      y: damp(ev.deltaY, max)
    };

    transform.rotateX = - damp(ev.deltaY, 90);
    transform.rotateY = damp(ev.deltaX, 90);

    window.requestAnimationFrame(updateElementTransform);
  }

  var initScale = 1;
  function onPinch(ev) {
    if(ev.type == 'pinchstart') {
      initScale = transform.scale || 1;
    }

    ninja.className = '';
    transform.scale = initScale * ev.scale;

    window.requestAnimationFrame(updateElementTransform);
  }

  var initAngle = 0;
  function onRotate(ev) {
    if(ev.type == 'rotatestart') {
      initAngle = transform.angle || 0;
    }

    ninja.className = '';
    transform.rz = 1;
    transform.angle = initAngle + ev.rotation;

    window.requestAnimationFrame(updateElementTransform);
  }

  resetElement();

});

