function Autocomplete(options) {
    this.el = options.el;
    this.url = options.url;

    this.list = document.createElement('ul');
    this.list.className = "language_list dropdown-menu";
    this.el.parentNode.appendChild(this.list);

    this.events();
}

Autocomplete.prototype.events = function() {
    var self = this;
    this.el.addEventListener("keyup", function() {
        var url = self.url+'?keyword='+self.el.value;
        if (self.el.value.length > 0) {
            var xhr = getXmlHttp();
            xhr.open("GET", url, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                if (xhr.readyState != 4) return;

                if (xhr.status == 200) {
                    var resp = JSON.parse(xhr.responseText);
                    self.buildList(resp);
                } else {
                    handleError(xhr.statusText);
                }
            }
            xhr.send(null);
        }
        else {
            self.list.style.display = 'none';
        }
    });

    this.list.addEventListener("click", function(e) {
        if(e.target.tagName.toUpperCase() == "LI") {
            self.el.value = e.target.innerHTML;
            self.list.style.display = 'none';
        }
    })

}

Autocomplete.prototype.buildList = function(resp) {
    var thehtml = "";
    var self = this;
    resp.forEach(function (val) {
        thehtml += '<li class="item">' + val + '</li>';
    });
    this.list.innerHTML = thehtml;

    var item = document.getElementsByClassName("item");
    if(item.length) this.list.style.display = 'block';

    //self.add_item();
}


//Autocomplete.prototype.add_item = function() {
//    var item = document.getElementsByClassName("item");
//    var list = this.list;
//    if(item.length) this.list.style.display = 'block';
//
//    for(var i = 0; i < item.length; i++) {
//        item[i].addEventListener("click", function() {
//            document.getElementById("language").value = this.innerHTML;
//            list.style.display = 'none';
//        });
//    }
//}

function getXmlHttp(){
    var xmlhttp;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

function handleError(message) {
    alert("Ошибка: " + message);
}
