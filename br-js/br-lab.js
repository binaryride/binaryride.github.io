export function snippet(editorID) {
  let localCM = CodeMirror(document.getElementById(editorID), {
    lineNumbers: true,
    tabSize: 2,
    value: "",
    mode: "text/html",
    theme: 'default',
    autoCloseTags: true,
    htmlMode: true,
    styleActiveLine: true,
    matchBrackets: true
  });

  return localCM;
}

export function lab(brLabIDs) {
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


