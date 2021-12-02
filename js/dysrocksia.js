//Globals
var ptProcess;

//Get's selected html from an element
function getSelectionHtml() {
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
    return html;
}

//A util function to get the cursor position from a text input
(function ($, undefined) {
    $.fn.getCursorPosition = function() {
        var el = $(this).get(0);
        var pos = 0;
        if('selectionStart' in el) {
            pos = el.selectionStart;
        } else if('selection' in document) {
            el.focus();
            var Sel = document.selection.createRange();
            var SelLength = document.selection.createRange().text.length;
            Sel.moveStart('character', -el.value.length);
            pos = Sel.text.length - SelLength;
        }
        return pos;
    }
})(jQuery);

function processText() {
        $("textarea.workarea").val( $('textarea.inputarea').val() );

        $("div.outputarea").html( $("textarea.workarea").val().replace(/(\n)+/g, '<br/>') );                
        
        $("div.outputarea").lettering('lines').children('span').lettering();
        $('<br/>').insertAfter('.line');
    
}

//Go!
$(document).ready(function() {
    
    //Clear the canvas
    $('.cus-button-clear').click(function() {
        $('textarea.inputarea').val('');
        processText();
        $('textarea.inputarea').focus();        
        return false;
    })
    
    //Toggle textual color
    $('.cus-button-togglecolor').click(function() {
        $(this).toggleClass('btn-info');
        $('div.outputarea').toggleClass('color');
        return false;
    })
    
    //Toggle textual color
    $('.cus-button-printable').click(function() {
        window.print();
        return false;
    })      
    
    //Whenever something is typed in the input, mirror the input area's content
    //into the output area
    $("textarea.inputarea").bind('keyup', function(e) {
    
        switch(e.keyCode)
        {
            case 16: break;                         case 17: break;                        case 18: break;            case 20: break;                    case 27: break;                   case 37: break;            case 38: break;                    case 39: break;            case 40: break;            case 91: break;            case 93: break;            case 36: break;                    case 35: break;            case 45: break;            case 33: break;            case 34: break;            case 144: break;            case 145: break;            case 19: break;            case 112: break;            case 113: break;            case 114: break;            case 115: break;            case 116: break;            case 117: break;            case 118: break;            case 119: break;            case 121: break;            case 122: break;            case 123: break;                        
                        
            default:
                clearTimeout(ptProcess);
                ptProcess = self.setTimeout(function() { processText() }, 200);
                return;
        }
        
    })

    //Process the default text
    processText();
    
    //Set focus
    $('textarea.inputarea').focus();
});