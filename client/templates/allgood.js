Template.allgood.helpers({
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
  'click .nj-cover__ninja': function(event, self) {
    trackEvent('Fun', 'Latest: Allgood tap');
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
  var ninja = this.find('.nj-cover__ninja');

  var transform;
  var timer;

  if (!ninja) {
    return false;
  }

  var mc = new Hammer.Manager(ninja);

  mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
  mc.add(new Hammer.Swipe()).recognizeWith(mc.get('pan'));

  mc.on("panstart panmove", onPan);

  mc.on("hammer.input", function(ev) {
    if (ev.isFinal) {
      resetElement();
    }
  });

  function resetElement() {
    ninja.classList.add('nj-cover__ninja--animated');
    transform = {
      translate: { x: 0, y: 0 },
    };
    window.requestAnimationFrame(updateElementTransform);
  }

  function updateElementTransform() {
    var value = [
      'translate3d(' + transform.translate.x + 'px, ' +
        transform.translate.y + 'px, 0)',
    ];

    value = value.join(" ");
    ninja.style.webkitTransform = value;
    ninja.style.mozTransform = value;
    ninja.style.transform = value;
  }

  var max = Math.min(window.innerWidth / 2, window.innerHeight / 2);

  function damp(x, max) {
    var abs = max * (1 - Math.exp(-0.005 * Math.abs(x)));
    return x > 0 ? abs : -abs;
  }

  function onPan(ev) {
    ninja.classList.remove('nj-cover__ninja--animated');
    transform.translate = {
      x: damp(ev.deltaX, max),
      y: damp(ev.deltaY, max)
    };

    window.requestAnimationFrame(updateElementTransform);
  }

  resetElement();

});
