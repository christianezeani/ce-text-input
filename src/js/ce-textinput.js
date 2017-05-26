(function() {

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

    function getElement(owner, callback) {
        var obj= CEMap.get(owner)||null;
        if(obj && obj.$element instanceof Element) {
            return obj.$element;
        }
        return null;
    }

    function getEditor(owner) {
        var obj= CEMap.get(owner)||null;
        if(obj && obj.$editor instanceof Element) {
            return obj.$editor;
        }
        return null;
    }

    function getOptions(owner) {
        var obj= CEMap.get(owner)||null;
        if(obj) { return obj.$options||{}; }
        return null;
    }

    var allowedTypes= ['text', 'number', 'email', 'html'];

    function setOption(owner, key, value) {
        var $element= getElement(owner);
        var $editor= getEditor(owner);
        var $options= getOptions(owner);
        if($options) {
            switch(key) {
                case 'type': {
                    value= (typeof(value)=='string') ? value.toLowerCase() : allowedTypes[0];
                    value= (allowedTypes.indexOf(value) > 0) ? value : allowedTypes[0];
                    $options.type= value;
                } break;
            }
            // Element Options
            if($element) {
                var elementStyle= $element.style;
                /*
                switch(key) {
                    case 'width': {
                        if(typeof(value)=='string') {
                            elementStyle.width= value;
                        } else if(value===null || value===false) {
                            $options.width= elementStyle.width= null;
                        }
                    } break;
                }
                */
            }
            // Editor Options
            if($editor) {
                var editorStyle= $editor.style;
                switch(key) {
                    case 'style': {
                        if(typeof(value)=='object') {
                            extend($options, value);
                            extend(editorStyle, $options);
                        }
                    } break;
                }
            }
        }
    }

    function initialize(owner) {
        var $editor= getEditor(owner);
        var $options= getOptions(owner);
        // Set All Options -------
        for(var key in $options) {
            if($options.hasOwnProperty(key)) {
                setOption(this, key, $options[key]);
            }
        }
        /* ---- EDITOR EVENTS ---- */
        // On Input
        $editor.oninput= function(e) {
            // console.info([$editor]);
            switch($options.type) {
                case 'text': {
                    // 
                } break;
                case 'number': {
                    // 
                } break;
            }
            // Emit Data Input Event
            call(owner, $options.onChange, e, owner);
        };
        // On Keypress
        $editor.onkeypress= function(e) {
            switch($options.type) {
                case 'number': {
                    if(!/^\d+$/.test(e.key)) {
                        e.preventDefault();
                    }
                } break;
            }
        };
        // On Keypress
        $editor.onkeyup= function(e) {
            switch($options.type) {
                case 'text': {
                    // 
                } break;
                case 'number': {
                    // 
                } break;
            }
        };
        // On Before Paste
        $editor.onpaste= function(e) {
            var clipboardData= e.clipboardData;
            var data= clipboardData.getData('text');
            switch($options.type) {
                case 'text': {
                    // 
                } break;
                case 'number': {
                    if(!/^\d+$/.test(data)) {
                        e.preventDefault();
                    }
                } break;
            }
        };
    }

    window.CETextInput= function CETextInput(selector, options) {
        var $element;
        if(typeof(selector)=='string') {
            $element= document.querySelector(selector);
        } else if(selector instanceof Element) {
            $element= selector;
        } else {
            throw 'Invalid Selector Supplied!';
        }

        if(!$element) {
            throw 'Element not found!';
        } else {
            var $editor= document.createElement('div');
            $editor.contentEditable= true;
            $element.appendChild($editor);
            $element.style.border= '1px solid #CCC';
            // ------------------
            var obj= {
                $element: $element,
                $editor: $editor
            };
            // ------------------
            var opts= extend({
                type: 'text',
                style: {}
            }, options);
            // ------------------
            obj.$options= opts;
            CEMap.set(this, obj);
            // Initialize -------
            initialize(this);
        }
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
    /*
    CETextInput.prototype.text= function() {
        var $element= getElement(this);
        return $element.innerText;
    };

    CETextInput.prototype.html= function() {
        var $element= getElement(this);
        return $element.innerHTML;
    };
    */
    CETextInput.prototype.value= function() {
        var $element= getElement(this);
        var $options= getOptions(this);
        var value= null;
        switch($options.type) {
            case 'html': {
                value= $element.innerHTML;
            } break;
            default: {
                value= $element.innerText;
            } break;
        }
        return value;
    };

})();