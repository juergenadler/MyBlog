function addHTML() {
   /*Iterate all DOM*/
   let el = document.getElementsByTagName("div"); // We allow this attribute only in div tags
   for (let i = 0; i < el.length; i++) {
      let domEl = el[i];

      /*find the element having include-html attribute*/
      let fileName = domEl.getAttribute("include-html");
      if (fileName) {
         /*http request with attribute value as file name*/
         let xmlHttp = new XMLHttpRequest();
         xmlHttp.onreadystatechange = function () {
            if (this.readyState == 4) {
               if (this.status == 200) {
                  domEl.innerHTML = this.responseText;
               }
               if (this.status == 404) {
                  domEl.innerHTML = "Page not found.";
               }

               /* Remove the attribute and invoke the function again*/
               domEl.removeAttribute("include-html");
               addHTML();
            }
         }
         xmlHttp.open("GET", fileName, true);
         xmlHttp.send();      
         return;
      }
   }
}
addHTML();