export function lab() {
    var myCodeMirror =
      CodeMirror(document.querySelector('.first'), {
        lineNumbers: true,
        tabSize: 2,
        value: "function myScript(){return 100;}\n",
        mode: "htmlmixed",
        theme: 'monokai'
      });
  
    const first = document.querySelector(".first");
    const iframe = document.querySelector("iframe");
    const btn = document.querySelector("button");
  
    btn.addEventListener("click", () => {
      var html = first.textContent;
      iframe.src = "data:text/html;charset=utf-8," + encodeURI(html);
    });
  
  
    first.addEventListener('keyup', () => {
      var html = first.textContent;
      iframe.src = "data:text/html;charset=utf-8," + encodeURI(html);
    })
  
    first.addEventListener("paste", function (e) {
      e.preventDefault();
      var text = e.clipboardData.getData("text/plain");
      document.execCommand("insertText", false, text);
    });
  
  
  }
  