function Autocomplete(options) {
    this.el = options.el;
    this.url = options.url;

    this.list = document.createElement('ul');
    this.list.className = "language_list dropdown-menu";
    this.wrap(this.el, this.list);

    this.events();
}

Autocomplete.prototype.wrap = function( node, wrapperEl ) {
    // todo: add ability to wrap collection of elements
    var parent = node.parentNode;
    console.log(parent);
    parent.appendChild( wrapperEl );
    //wrapperEl.appendChild( node );
};


Autocomplete.prototype.events = function() {
    this.el.addEventListener("keyup", this.request.bind(this));

    this.list.addEventListener("click", this.add_item.bind(this));
}

Autocomplete.prototype.request = function() {
    var url = this.url+'?keyword='+this.el.value;
    var self = this;
    if (this.el.value.length > 0) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;

            if (xhr.status == 200) {
                var resp = JSON.parse(xhr.responseText);
                self.buildList(resp);
            } else {
                console.log('error');
            }
        };
        xhr.send(null);
    }
    else {
        this.list.style.display = 'none';
    }
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

    self.add_item();
}


Autocomplete.prototype.add_item = function(e) {
    if(e.target.tagName.toUpperCase() == "LI") {
        this.el.value = e.target.innerHTML;
        this.list.style.display = 'none';
    }
}

