Template.allgood.helpers({
  viewingFavs: viewingFavs,
  status: function() {
    var self = Template.instance();
    if (Session.get('easter egg counter') < 7) {
      return 'Jest dobrze.';
    } else if (self.taunts.length) {
      var randpos = Math.floor(Math.random() * self.taunts.length);
      return self.taunts.splice(randpos, 1)[0];
    } else {
      return 'Jest dużodobrze.';
    }
  },
});

function resetTaunts () {
  Session.set('easter egg counter', 0);
  this.taunts = taunts.slice();
}

Template.allgood.events({
  'click .cover': function(event, self) {
    trackEvent('Fun', 'Allgood tap');
    var eggCounter = Session.get('easter egg counter');
    if (eggCounter < 15) {
      Session.set('easter egg counter', eggCounter + 1);
    } else {
      resetTaunts.call(self);
    }
  },
});

Template.allgood.onCreated(function() {
  resetTaunts.call(this);
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
    ninja.classList.add('animate');
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
    ninja.classList.remove('animate');
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

    ninja.classList.remove('animate');
    transform.scale = initScale * ev.scale;

    window.requestAnimationFrame(updateElementTransform);
  }

  var initAngle = 0;
  function onRotate(ev) {
    if(ev.type == 'rotatestart') {
      initAngle = transform.angle || 0;
    }

    ninja.classList.remove('animate');
    transform.rz = 1;
    transform.angle = initAngle + ev.rotation;

    window.requestAnimationFrame(updateElementTransform);
  }

  resetElement();

});

Template.favinfo.events({
  'click .ok': function() {
    viewingFavs(false);
    Session.set('current tab', 'linie');
    window.history.replaceState('linie', null, 'linie');
  },
});
