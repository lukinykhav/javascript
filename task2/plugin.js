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
        this.element = element;

        // в jQuery есть метод extend, который
        // объединяет несколько объектов в один,
        // сохраняя результат в первый объект.
        // зачастую первый объект является пустым,
        // предотвращая затирание дифолтных значений
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.wrap(this.element);
        this.init();
    }

    Plugin.prototype.wrap = function( node ) {
        // todo: add ability to wrap collection of elements
        var parent = $(node).parent();
        parent.append('<ul class="list dropdown-menu"></ul>');
    };

    Plugin.prototype.init = function () {
        var self = this;
        $(this.element).keypress(function(){
            var keyword = $(self.element).val();
            if (keyword.length >= 1) {
                $.ajax({
                    url: 'ajax_array.php?ajax_agents?keyword='+keyword,
                    type: 'GET',
                    data: {keyword:keyword},
                    success: function(data) {
                        var response = JSON.parse(data);
                        var thehtml = "";
                        $(".list").html("");

                        $(response).each(function(key, val) {
                            thehtml += '<li class="item">'+ val + '</li>';
                        });
                        $( ".list" ).append(thehtml);
                        $(".list").show();

                        $(".item").click(function() {
                            $(self.element).val($(this).html());
                            $(".list").hide();
                        });
                    }
                });
            }
            else {
                $(".list").hide();
            }
        });
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