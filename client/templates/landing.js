Template.landing.rendered = function() {

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/pl_PL/sdk.js#xfbml=1&appId=1615730801984225&version=v2.0";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Collapsible lines
  $('.collapsible').collapsible({
    accordion : false // A setting that changes the collapsible behavior to 
                      // expandable instead of the default accordion style
  });

  // Make whole div with line clickable
  $(".collapsible-body").click(function() {
    window.location = $(this).find("a").attr("href");
    return false;
  });
};

Template.landing.events({
  'click .line-item': function(e) {
    $(this).toggleClass('active');
  }
});

Template.landing.helpers({
  subwayLines: function() {
    return listOfLines().subway;
  },
  trainLines: function() {
    return listOfLines().train;
  }
});
