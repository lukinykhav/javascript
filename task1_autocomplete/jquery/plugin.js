/*!
 * паттерн простого плагина jQuery
 * автор: @ajpiano
 * дополнения: @addyosmani
 * лицензия MIT
 */

// предваряющие точка с запятой предотвращают ошибки соединений
// с предыдущими скриптами, которые, возможно
// не были верно «закрыты».
;(function ( $, window, document, undefined ) {

    // т.к. undefined, по определению ECMAScript 3, не является константой
    // здесь мы явно задаем неопределенную переменную
    // убеждаясь в ее действительной неопределенности
    // В стандарте ES5, undefined уже точно константа

    // window и document передаются локально, вместо глобальных
    // переменных, что немного ускоряет процесс определения
    // и позволяет более эффективно минифицировать
    // ваш код, если эти переменные часто используются
    // в вашем плагине

    // определяем необходимые параметры по умолчанию
    var pluginName = "autocomplete",
        defaults = {
            //propertyName: "value"
        };

    // конструктор плагина
    function Plugin( element, options ) {
        this.el = element;
        //this.source = options.source;

        this.$el = $(element);

        // в jQuery есть метод extend, который
        // объединяет несколько объектов в один,
        // сохраняя результат в первый объект.
        // зачастую первый объект является пустым,
        // предотвращая затирание дифолтных значений
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
        this.event();
    }

    Plugin.prototype.init = function () {
        this.$el.wrap("<div class='wrap'></div>");
        this.wrap = this.$el.closest($('.wrap'));
        //console.log(this.wrap);
        this.wrap.append('<ul class="dropdown-menu list_'+ this._name +'"></ul>');
        this.list = $(".list_" + this._name);
    };
    Plugin.prototype.event = function() {
        this.$el.on("keyup.complete", $.proxy(this.complete, this));
        this.list.on("click", "li", $.proxy(this.add_item, this));
        this.$el.on("keydown.move_item", $.proxy(this.move_item, this));
    };

    Plugin.prototype.add_item = function(e) {
        this.$el.val(e.target.innerHTML);
        this.list.hide();
    };

    Plugin.prototype.move_item = function(e) {
        var active_item = this.list.find(".active");
        //console.log(this);

        /* если нажимает клавишу вниз илли вверх
        если нажимает вниз
           смотрит существует ли у li класс актив
             если существует то удаляет у текущего li класс и добавляет к следующему
             если не существует ищет первый li и добавляет к нему класс
             если конец списка переходит на первый li

        если нажимает вверх
        ищет предыдущий li
        */
        //if (e.keyCode === 38 || e.keyCode === 40)
        //{
        //    if (active_item.length) {
        //        $("ul li").next().addClass("active");
        //    }
        //    else {
        //        $("ul li").first().addClass("active");
        //    }
        //}

        if (e.keyCode === 40) {
            if (active_item.length) {
                $(".item").next().addClass("active");
            }
            else {
                $(".item").first().addClass("active");
            }
        }
        //if(this.list.show()) {
        //
        //    //if (e.keyCode === 38 || e.keyCode === 40) {
        //    //    if($("ul li").hasClass("active")) {
        //    //        var s = $( "li").next();
        //    //        //console.log('sdasd');
        //    //        //s.addClass("active");
        //    //        //$(this).removeClass("active");
        //    //    }
        //    //    else {
        //    //        //$( "ul li" ).filter( ".active" ); // unordered list items with class of current
        //    //        console.log($("li").first());
        //    //        //$("li").first().addClass("active");
        //    //        var p = $( "li" ).first();
        //    //        p.addClass("active");
        //    //        console.log(p);
        //    //    }
        //    //        //$(".item")[i].addClass("active");
        //    //        //if(i) {
        //    //        //    $("li").next().addClass("active");
        //    //        //}
        //    //        //else {
        //    //        //    $("ul li").first().addClass("active");
        //    //        //    i++;
        //    //        //}
        //    //    //console.log($(".item"));
        //    //}
        //    //$("ul li").first().removeClass("active");
        //    //$("ul li").next().addClass("active");
        //    //$(".item").addClass("active");
        //    //})
        //
        //    if (e.keyCode == 38) { // up
        //        var target = $(e.currentTarget);
        //        console.log(target.next().focus());
        //    }
        //}
    };

    Plugin.prototype.complete = function(e) {
        var keyword = this.$el.val();
        if (keyword.length >= 1) {
            var self = this;
            $.get('ajax_array.php?ajax_agents?keyword='+keyword, {keyword:keyword}, function(data){
                var response = JSON.parse(data);

                self.buildList(response);
            })
        }
        else {
            this.list.hide();
        }
    };

    Plugin.prototype.buildList = function(response) {
        var thehtml = "";
        this.list.html("");

        $(response).each(function(key, val) {
            thehtml += '<li class="item">'+ val + '</li>';
        });
        $('.item').wrap('<ul class="list"></ul>');

        this.list.append(thehtml);
        this.list.show();
    };

    // Простой декоратор конструктора,
    // предотвращающий дублирование плагинов
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );