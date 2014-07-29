// jQuery customCheckRadio 1.0
// Copyright 2012, Josh Farneman
// http://farneman.net

(function ($) {
  var CustomCheckRadio = {
    init: function () {
      return this.each(function () {
        var $input = $(this),
          inputType = this.type,
          $span;

        if (inputType === "checkbox" || inputType === "radio") {
          // Wrap input with span
          $input.wrap('<span class="' + inputType + '"></span>');
          $span = $input.closest('span');

          if (this.checked === true) {
            $span.addClass('checked');
          }

          // Add events
          if (!$input.attr("disabled")) {
            $span.parent().mousedown(CustomCheckRadio.pushed);
            $span.parent().mouseup(CustomCheckRadio.check);
          } else {
            $span.addClass("disabled");
          }
        }
      });
    },

    pushed: function () {
      $(this).children("span").addClass('pushed');
    },

    check: function () {
      var $span = $(this).children('span'),
        $input = $span.children('input'),
        inputType = $input[0].type,
        $group;

      $span.removeClass('pushed');

      if ($input.prop('checked') && inputType === "checkbox") {
        $span.removeClass('checked');
        $input.prop('checked', false);
      } else {
        // If it's a radio input deselect the other options spans
        if (inputType === "radio") {
          $group = $span.parent().siblings().find('input');
          $group.each(function () {
            $(this).closest('span').removeClass('checked');
          });
        }

        $span.addClass('checked');
        $input.prop('checked', true);
      }
    }
  };

  $.fn.customCheckRadio = function (method) {
    // Call method here to hide plugin functionality in closure.
    if (CustomCheckRadio[method]) {
      return CustomCheckRadio[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return CustomCheckRadio.init.apply(this, arguments);
    } else {
      $.error('Method ' +  method + ' does not exist on jQuery.customInput');
    }
  };

})(jQuery);
