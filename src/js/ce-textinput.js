(function() {
    // Get Elements
    function getElements(selector) {
        var $element= [];
        if(typeof(selector)=='string') {
            var nlist= document.querySelectorAll(selector);
            if(nlist && nlist.length) {
                var elems= Array.prototype.slice.call(nlist);
                $element= $element.concat(elems);
            }
        } else if(selector instanceof Array) {
            for(var i=0; i<selector.length; i++) {
                $element= $element.concat(getElements(selector[i]));
            }
        } else if(selector instanceof Element) {
            $element.push(selector);
        }
        return $element;
    }

    function call(context, callback) {
        var args= Array.prototype.slice.call(arguments, 2);
        if(typeof(callback)=='function') { return callback.apply(context||null, args); }
        return null;
    }

    function extend() {
        var args= Array.prototype.slice.call(arguments);
        if(args.length) {
            var main= args[0];
            if(typeof(main)=='object') {
                for(var i=1; i<args.length; i++) {
                    var obj= args[i];
                    if(typeof(obj)=='object') {
                        for(var key in obj) {
                            main[key]= obj[key];
                        }
                    }
                }
                return main;
            }
        }
        return null;
    }
    
    var CEMap= new Map();

    function elements(owner, callback) {
        var obj= CEMap.get(owner)||null;
        if(obj) {
            var elems= obj.$element;
            if(elems instanceof Array) {
                for(var i=0; i<elems.length; i++) {
                    call(owner, callback, elems[i]);
                }
            }
        }
    }

    function setOption(owner, elem, key, value) {
        var obj= CEMap.get(owner);
        var $options= obj.$options;
        var style= elem.style;
        switch(key) {
            case 'type': {
                value= (typeof(value)=='string') ? value.toLowerCase() : 'text';
                value= (['text', 'html'].indexOf(value) > 0) ? value : 'text';
                $options.type= value;
            } break;
            case 'width': {
                if(typeof(value)=='string') {
                    style.width= value;
                } else if(value===null || value===false) {
                    $options.width= style.width= null;
                }
            } break;
            case 'minWidth': {
                if(typeof(value)=='string') {
                    style.minWidth= value;
                } else if(value===null || value===false) {
                    $options.minWidth= style.minWidth= null;
                }
            } break;
            case 'maxWidth': {
                if(typeof(value)=='string') {
                    style.maxWidth= value;
                } else if(value===null || value===false) {
                    $options.maxWidth= style.maxWidth= null;
                }
            } break;
            case 'height': {
                if(typeof(value)=='string') {
                    style.height= value;
                } else if(value===null || value===false) {
                    $options.height= style.height= null;
                }
            } break;
            case 'minHeight': {
                if(typeof(value)=='string') {
                    style.minHeight= value;
                } else if(value===null || value===false) {
                    $options.minHeight= style.minHeight= null;
                }
            } break;
            case 'maxHeight': {
                if(typeof(value)=='string') {
                    style.maxHeight= value;
                } else if(value===null || value===false) {
                    $options.maxHeight= style.maxHeight= null;
                }
            } break;
        }
    }

    window.CETextInput= function CETextInput(selector, options) {
        var element= getElements(selector);
        var obj= { $element: element };
        // ------------------
        var opts= extend({
            type: 'text',
            width: null,
            minWidth: null,
            maxWidth: null,
            height: null,
            minHeight: null,
            maxHeight: null
        }, options);
        // ------------------
        obj.$options= opts;
        CEMap.set(this, obj);
        // ------------------
        elements(this, (function(elem) {
            var style= elem.style;
            elem.contentEditable= true;
            style.border= '1px solid #CCC';
            style.float= 'left';
            for(var key in opts) {
                if(opts.hasOwnProperty(key)) {
                    setOption(this, elem, key, opts[key]);
                }
            }
            // Events ------
            elem.oninput= function(e) {
                if(opts.type=='text') {
                    console.info(e);
                    elem.innerText= elem.innerText;
                }
            };
        }).bind(this));
    };

    CETextInput.prototype.set= function(key, value) {
        elements(this, (function(elem) {
            setOption(this, elem, key, value);
        }).bind(this));
    };

    CETextInput.prototype.get= function(key) {
        var obj= CEMap.get(this);
        return obj.$options[key];
    };

    var textInput= new CETextInput('ce-textinput');
    return textInput;
})();