function Autocomplete(options) {
    this.el = options.el;
    this.url = options.url;

    this.list = document.createElement('ul');
    this.list.className = "language_list dropdown-menu";

    document.getElementById("list").appendChild(this.list);

    this.events();
    //this.add_item();
    //функция обработчик на инпут которая обрабатывает введные данные делает аякс запрос
    //функция которая получает данные с сервера и
    // формируется html со списком элементы списка можно выбрать с помощью клика или enter
    // добавляет выбранный элемент в инпут
}

Autocomplete.prototype.events = function() {
    var keyword = this.el;
    var url = this.url;
    var list = this.list;
    var self = this;
    this.el.addEventListener("keyup", function() {
        if (keyword.value.length > 0) {
            var xhr = getXmlHttp();
            xhr.open("GET", url+'?keyword='+keyword.value, true);
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
            list.style.display = 'none';
        }
    });

}

Autocomplete.prototype.buildList = function(resp) {
    var thehtml = "";
    var self = this;
    resp.forEach(function (val) {
        thehtml += '<li class="item">' + val + '</li>';
    });
    this.list.innerHTML = thehtml;

    self.add_item();
}


Autocomplete.prototype.add_item = function() {
    var item = document.getElementsByClassName("item");
    var list = this.list;
    if(item.length) this.list.style.display = 'block';

    for(var i = 0; i < item.length; i++) {
        item[i].addEventListener("click", function() {
            document.getElementById("language").value = this.innerHTML;
            list.style.display = 'none';
        });
    }
}

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

//document.getElementById("language").addEventListener("keyup", function() {
//    var keyword = document.getElementById('language').value;
//    var list = document.getElementById("language_list_id");
//    var body = 'keyword=' + encodeURIComponent(keyword);
//
//    if (keyword.length > 2) {
//        var xhr = getXmlHttp();
//        xhr.open("GET", '/ajax_array.php/ajax_agents?keyword='+keyword, true);
//        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//        xhr.onreadystatechange = function() {
//            if (xhr.readyState != 4) return;
//
//            if (xhr.status == 200) {
//                var thehtml = "";
//                var resp = JSON.parse(xhr.responseText);
//                resp.forEach(function (val) {
//                    thehtml += '<li class="item">' + val + '</li>';
//                });
//                list.innerHTML = thehtml;
//                var item = document.getElementsByClassName("item");
//                if(item.length) list.style.display = 'block';
//
//                for(var i = 0; i < item.length; i++) {
//                    item[i].addEventListener("click", function() {
//                        document.getElementById("language").value = this.innerHTML;
//                        list.style.display = 'none';
//                    });
//                }
//            } else {
//                handleError(xhr.statusText);
//            }
//        }
//        xhr.send(body);
//    }
//    else {
//        list.style.display = 'none';
//    }
//});