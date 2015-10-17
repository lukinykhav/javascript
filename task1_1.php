<!DOCType html>
<html>
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
<div class="col-md-10">
    <h1>Autocomplete</h1>
</div>
<div class="col-md-6">
    <div class="input-group">
        <span class="input-group-addon">Language</span>
        <form method="GET">
            <input type="text" class="form-control" id="language" autocomplete="off">
            <ul id="language_list_id" class="dropdown-menu"></ul>
        </form>
    </div>
</div>
</body>
</html>
<script>
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

    document.getElementById("language").addEventListener("keyup", function() {
        var keyword = document.getElementById('language').value;
        var list = document.getElementById("language_list_id");
        var body = 'keyword=' + encodeURIComponent(keyword);

        if (keyword.length > 2) {
            var xhr = getXmlHttp();
            xhr.open("GET", '/ajax_array.php/ajax_agents?keyword='+keyword, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                if (xhr.readyState != 4) return;

                if (xhr.status == 200) {
                    var thehtml = "";
                    var resp = JSON.parse(xhr.responseText);
                    resp.forEach(function (val) {
                        thehtml += '<li class="item">' + val + '</li>';
                    });
                    list.innerHTML = thehtml;
                    var item = document.getElementsByClassName("item");
                    if(item.length) list.style.display = 'block';

                    for(var i = 0; i < item.length; i++) {
                        item[i].addEventListener("click", function() {
                            document.getElementById("language").value = this.innerHTML;
                            list.style.display = 'none';
                        });
                    }
                } else {
                    handleError(xhr.statusText);
                }
            }
            xhr.send(body);
        }
        else {
            list.style.display = 'none';
        }
    });
</script>