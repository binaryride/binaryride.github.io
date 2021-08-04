$('#nav-logo').on("click", () => {
  window.location.href = "https://www.binaryride.github.io";
})

$.getScript("../br-lab/js-beautify/beautify-html.min.js", function (data, textStatus, jqxhr) {
  $.getScript("../br-lab/js-beautify/beautify-css.min.js", function (data, textStatus, jqxhr) {
    $.getScript("../br-lab/codemirror-5.53.2/lib/codemirrorv1.js", function (data, textStatus, jqxhr) {
      $.getScript("../br-lab/codemirror-5.53.2/addon/hint/show-hint.js", function (data, textStatus, jqxhr) {
        $.getScript("../br-lab/codemirror-5.53.2/addon/edit/matchbrackets.js", function (data, textStatus, jqxhr) {
          if (!window.binaryRide) {
            window.binaryRide = {};
          }
          window.binaryRide.isCodeMirrorJSReady = true;

          function lab(brLabIDs) {
            let {
              editorID,
              outputID,
              outputIframeID,
              dragBarID,
              stopperID
            } = brLabIDs;

            let localCM = CodeMirror(document.getElementById(editorID), {
              lineNumbers: true,
              tabSize: 2,
              value: "",
              mode: "text/html",
              theme: 'default',
              extraKeys: {
                "Ctrl-Space": "autocomplete"
              },
              autoCloseTags: true,
              htmlMode: true,
              styleActiveLine: true,
              matchBrackets: true
            });

            // window.binaryRide.brCodeMirror.push(localCM);

            // for (let i = 0; i < window.brCodeMirror.length; i++) {
            localCM.on('change', editor => {
              $('#' + outputIframeID).contents().find("body").html(editor.getValue());
            });

            // }



            let isDragging = false;

            if (window.addEventListener) {
              window.addEventListener("resize", browserResize);
            } else if (window.attachEvent) {
              window.attachEvent("onresize", browserResize);
            }

            document.getElementById('la-expand').addEventListener('click', () => {
              browserResize();
            })

            document.getElementById('la-compress').addEventListener('click', () => {
              browserResize();
            })

            function getStyleValue(ele, style) {
              if (window.getComputedStyle) {
                return window.getComputedStyle(ele, null).getPropertyValue(style);
              } else {
                return ele.currentStyle[style];
              }
            }

            function browserResize() {
              updateDragBarPos();
            }

            function updateDragBarPos() {
              let brEditorheight, brEditorWidth, brDragBarWidth, bgOutputMargin, dragleft;
              document.getElementById(dragBarID).style.width = "5px";
              brEditorWidth = Number(getStyleValue(document.getElementById(editorID), "width").replace("px", ""));
              bgOutputMargin = Number(getStyleValue(document.getElementById(outputID), "margin-left").replace("px", ""));
              brDragBarWidth = Number(getStyleValue(document.getElementById(dragBarID), "width").replace("px", ""));
              brEditorheight = getStyleValue(document.getElementById(editorID), "height");
              dragleft = brEditorWidth - (brDragBarWidth / 2);
              document.getElementById(dragBarID).style.left = dragleft + bgOutputMargin - 2 + "px";
              document.getElementById(dragBarID).style.height = brEditorheight;
              document.getElementById(dragBarID).style.cursor = "ew-resize";
            }

            function dragstart(e) {
              e.preventDefault();
              isDragging = true;
            }

            function dragmove(e) {
              if (isDragging) {
                document.getElementById(stopperID).style.display = "block";
                let percentage = (e.pageX / window.innerWidth) * 100;
                if (percentage > 7 && percentage < 95) {
                  let mainPercentage = 100 - percentage;
                  document.getElementById(editorID).style.width = percentage + "%";
                  document.getElementById(outputID).style.width = mainPercentage + "%";
                  updateDragBarPos();
                }
              }
            }

            function dragend() {
              document.getElementById(stopperID).style.display = "none";
              isDragging = false;
              let vend = navigator.vendor;
              if (window.editor && vend.indexOf("Apple") == -1) {
                window.editor.refresh();
              }
            }

            if (window.addEventListener) {
              document.getElementById(dragBarID).addEventListener("mousedown", function (e) {
                dragstart(e);
              }, {
                passive: true
              });
              document.getElementById(dragBarID).addEventListener("touchstart", function (e) {
                dragstart(e);
              }, {
                passive: true
              });
              window.addEventListener("mousemove", function (e) {
                dragmove(e);
              }, {
                passive: true
              });
              window.addEventListener("touchmove", function (e) {
                dragmove(e);
              }, {
                passive: true
              });
              window.addEventListener("mouseup", dragend, {
                passive: true
              });
              window.addEventListener("touchend", dragend, {
                passive: true
              });
              window.addEventListener("load", updateDragBarPos);
            }

            function dragstart(e) {
              e.preventDefault();
              isDragging = true;
            }



            return localCM;

          }


          let brLabIDs = {
            editorID: "br-editor",
            outputID: "br-output",
            outputIframeID: "br-iframe",
            dragBarID: "br-dragbar",
            stopperID: "br-stopper"
          }
          let editor = lab(brLabIDs);
          let editorCode =
            `
                         <html>
                          <style> body{ background-color: green; color: white; margin: 20px; } </style> 
                          <body> <h1 style="text-decoration: underline;"> This is a heading </h1> <p> This is a paragraph. </p> <div> <input type="text" value="" id="nameInput" placeholder="Type your name here"/> <button onclick="displayName()"> Submit </button> </div> <p id="myName"> </p> <script> function displayName(){ let myName = document.getElementById("myName"); myName.innerHTML = "Welcome to BR Lab, <i>" + document.getElementById("nameInput").value + "</i> !"; } <\/script> <\/body> <\/html>`;

          let html_beautify = window.html_beautify(editorCode);
          let css_beautify = window.css_beautify(html_beautify);
          editor.getDoc().setValue(window.html_beautify(css_beautify));

          // THEME
          var input = document.getElementById("select-theme");

          function selectTheme() {
            var theme = input.options[input.selectedIndex].textContent;
            editor.setOption("theme", theme);
            location.hash = "#" + theme;
          }
          var choice = (location.hash && location.hash.slice(1)) ||
            (document.location.search &&
              decodeURIComponent(document.location.search.slice(1)));
          if (choice) {
            input.value = choice;
            editor.setOption("theme", choice);
          }
          CodeMirror.on(window, "hashchange", function () {
            var theme = location.hash.slice(1);
            if (theme) {
              input.value = theme;
              selectTheme();
            }
          });

          window.binaryRide.selectTheme = selectTheme;
          // END THEME

          // Format Code
          function formatCode() {
            let html_beautify = window.html_beautify(editor.getValue());
            let css_beautify = window.css_beautify(html_beautify);
            editor.getDoc().setValue(window.html_beautify(css_beautify));
          }

          window.binaryRide.formatCode = formatCode;
          // END Format Code


        });
      });
    });
  });
});
