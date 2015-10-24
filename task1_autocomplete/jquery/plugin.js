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
        this.$el.parent().append('<ul class="dropdown-menu list_'+ this._name +'"></ul>');
        $.list = $(".list_" + this._name);
    };
    Plugin.prototype.event = function() {
        this.$el.on("keyup", $.proxy(this.complete, this));
    };

    Plugin.prototype.complete = function(e) {
        var keyword = this.$el.val();
        var self = this;
        if (keyword.length >= 1) {
            var self = this;
            $.get('ajax_array.php?ajax_agents?keyword='+keyword, {keyword:keyword}, function(data){
                var response = JSON.parse(data);

                self.buildList(response);
            })
        }
        else {
            $.list.hide();
        }
        $.list.on("click", "li", function() {
            self.$el.val($(this).html());
            $.list.hide();
        });

        if($.list.show()) {
            //if (e.keyCode === 38 || e.keyCode === 40) {
            //    //console.log();
            //    if($("ul li").hasClass("active")) {
            //        var s = $( "li").next();
            //        //console.log('sdasd');
            //        //s.addClass("active");
            //        //$(this).removeClass("active");
            //    }
            //    else {
            //        //$( "ul li" ).filter( ".active" ); // unordered list items with class of current
            //        console.log($("li").first());
            //        //$("li").first().addClass("active");
            //        var p = $( "li" ).first();
            //        p.addClass("active");
            //        console.log(p);
            //    }
            //        //$(".item")[i].addClass("active");
            //        //if(i) {
            //        //    $("li").next().addClass("active");
            //        //}
            //        //else {
            //        //    $("ul li").first().addClass("active");
            //        //    i++;
            //        //}
            //    //console.log($(".item"));
            //}
                //$("ul li").first().removeClass("active");
                //$("ul li").next().addClass("active");
                //$(".item").addClass("active");
            //})

            if (e.keyCode == 38) { // up
                var target = $(e.currentTarget);
                console.log(target.next().focus());
            }
        }
    };

    Plugin.prototype.buildList = function(response) {
        var thehtml = "";
        $.list.html("");

        $(response).each(function(key, val) {
            thehtml += '<li class="item">'+ val + '</li>';
        });
        $('.item').wrap('<ul class="list"></ul>');

        $.list.append(thehtml);
        $.list.show();
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