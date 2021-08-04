$.getScript("../br-lab/js-beautify/beautify-html.min.js", function (data, textStatus, jqxhr) {
  $.getScript("../br-lab/js-beautify/beautify-css.min.js", function (data, textStatus, jqxhr) {
    $.getScript("../br-lab/codemirror-5.53.2/lib/codemirrorv1.js", function (data, textStatus, jqxhr) {
      $.getScript("../br-lab/codemirror-5.53.2/addon/hint/show-hint.js", function (data, textStatus, jqxhr) {
        $.getScript("../br-lab/codemirror-5.53.2/addon/edit/matchbrackets.js", function (data, textStatus, jqxhr) {
          if (!window.binaryRide) {
            window.binaryRide = {};
          }
          window.binaryRide.isCodeMirrorJSReady = true;

          // FULLSCREEN
          let fullscreen = function (divID, showFull) {
            if (divID) {
              if (showFull) {
                $('#' + divID).css({
                  position: 'fixed',
                  margin: 0,
                  top: 52,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  zIndex: 999
                });
                $('#la-expand').hide();
                $('#la-compress').show();

              } else {
                $('#' + divID).css({
                  'min-height': 450,
                  'margin-top': 40,
                  position: 'relative',
                  zIndex: 0,
                  top: 0
                });
                $('#la-compress').hide();
                $('#la-expand').show();
              }
            }
          }

          window.binaryRide.fullscreen = fullscreen;
          // END FULLSCREEN


        });
      });
    });
  });
});
