(function() {
  module.exports = function(colorPicker) {
    return {
      element: null,
      activate: function() {
        var _halfArrowWidth;
        _halfArrowWidth = null;
        this.element = {
          el: (function() {
            var _classPrefix, _el;
            _classPrefix = colorPicker.element.el.className;
            _el = document.createElement('div');
            _el.classList.add(_classPrefix + "-arrow");
            return _el;
          })(),
          addClass: function(className) {
            this.el.classList.add(className);
            return this;
          },
          removeClass: function(className) {
            this.el.classList.remove(className);
            return this;
          },
          hasClass: function(className) {
            return this.el.classList.contains(className);
          },
          width: function() {
            return this.el.offsetWidth;
          },
          height: function() {
            return this.el.offsetHeight;
          },
          setPosition: function(x) {
            this.el.style.left = x + "px";
            return this;
          },
          previousColor: null,
          setColor: function(smartColor) {
            var _color;
            _color = (typeof smartColor.toRGBA === "function" ? smartColor.toRGBA() : void 0) || 'none';
            if (this.previousColor && this.previousColor === _color) {
              return;
            }
            this.el.style.borderTopColor = _color;
            this.el.style.borderBottomColor = _color;
            return this.previousColor = _color;
          }
        };
        colorPicker.element.add(this.element.el);
        setTimeout((function(_this) {
          return function() {
            return _halfArrowWidth = (_this.element.width() / 2) << 0;
          };
        })(this));
        setTimeout((function(_this) {
          return function() {
            var _newHeight;
            _newHeight = colorPicker.element.height() + _this.element.height();
            return colorPicker.element.setHeight(_newHeight);
          };
        })(this));
        setTimeout((function(_this) {
          return function() {
            var Alpha;
            Alpha = colorPicker.getExtension('Alpha');
            Alpha.onColorChanged(function(smartColor) {
              if (smartColor) {
                return _this.element.setColor(smartColor);
              } else {
                return colorPicker.SmartColor.HEX('#f00');
              }
            });
          };
        })(this));
        colorPicker.onInputVariable((function(_this) {
          return function() {
            return _this.element.setColor(colorPicker.SmartColor.RGBAArray([0, 0, 0, 0]));
          };
        })(this));
        colorPicker.onInputVariableColor((function(_this) {
          return function(smartColor) {
            if (!smartColor) {
              return;
            }
            return _this.element.setColor(smartColor);
          };
        })(this));
        colorPicker.onPositionChange((function(_this) {
          return function(position, colorPickerPosition) {
            return _this.element.setPosition(position.x - colorPickerPosition.x);
          };
        })(this));
        return this;
      }
    };
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL2V2YW5oZW5kcml4MS8uYXRvbS9wYWNrYWdlcy9jb2xvci1waWNrZXIvbGliL2V4dGVuc2lvbnMvQXJyb3cuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtJO0VBQUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0FBQyxXQUFEO1dBQ2I7TUFBQSxPQUFBLEVBQVMsSUFBVDtNQUtBLFFBQUEsRUFBVSxTQUFBO0FBQ04sWUFBQTtRQUFBLGVBQUEsR0FBa0I7UUFJbEIsSUFBQyxDQUFBLE9BQUQsR0FDSTtVQUFBLEVBQUEsRUFBTyxDQUFBLFNBQUE7QUFDSCxnQkFBQTtZQUFBLFlBQUEsR0FBZSxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUN0QyxHQUFBLEdBQU0sUUFBUSxDQUFDLGFBQVQsQ0FBdUIsS0FBdkI7WUFDTixHQUFHLENBQUMsU0FBUyxDQUFDLEdBQWQsQ0FBc0IsWUFBRixHQUFnQixRQUFwQztBQUVBLG1CQUFPO1VBTEosQ0FBQSxDQUFILENBQUEsQ0FBSjtVQU9BLFFBQUEsRUFBVSxTQUFDLFNBQUQ7WUFBZSxJQUFDLENBQUEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFkLENBQWtCLFNBQWxCO0FBQTZCLG1CQUFPO1VBQW5ELENBUFY7VUFRQSxXQUFBLEVBQWEsU0FBQyxTQUFEO1lBQWUsSUFBQyxDQUFBLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBZCxDQUFxQixTQUFyQjtBQUFnQyxtQkFBTztVQUF0RCxDQVJiO1VBU0EsUUFBQSxFQUFVLFNBQUMsU0FBRDttQkFBZSxJQUFDLENBQUEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFkLENBQXVCLFNBQXZCO1VBQWYsQ0FUVjtVQVdBLEtBQUEsRUFBTyxTQUFBO21CQUFHLElBQUMsQ0FBQSxFQUFFLENBQUM7VUFBUCxDQVhQO1VBWUEsTUFBQSxFQUFRLFNBQUE7bUJBQUcsSUFBQyxDQUFBLEVBQUUsQ0FBQztVQUFQLENB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LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4jICBDb2xvciBQaWNrZXIvZXh0ZW5zaW9uczogQXJyb3dcbiMgIEFuIGFycm93IHBvaW50aW5nIGF0IHRoZSBjdXJyZW50IHNlbGVjdGlvblxuIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IChjb2xvclBpY2tlcikgLT5cbiAgICAgICAgZWxlbWVudDogbnVsbFxuXG4gICAgIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgIyAgQ3JlYXRlIGFuZCBhY3RpdmF0ZSBBcnJvd1xuICAgICMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBhY3RpdmF0ZTogLT5cbiAgICAgICAgICAgIF9oYWxmQXJyb3dXaWR0aCA9IG51bGxcblxuICAgICAgICAjICBDcmVhdGUgZWxlbWVudFxuICAgICAgICAjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgQGVsZW1lbnQgPVxuICAgICAgICAgICAgICAgIGVsOiBkbyAtPlxuICAgICAgICAgICAgICAgICAgICBfY2xhc3NQcmVmaXggPSBjb2xvclBpY2tlci5lbGVtZW50LmVsLmNsYXNzTmFtZVxuICAgICAgICAgICAgICAgICAgICBfZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdkaXYnXG4gICAgICAgICAgICAgICAgICAgIF9lbC5jbGFzc0xpc3QuYWRkIFwiI3sgX2NsYXNzUHJlZml4IH0tYXJyb3dcIlxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfZWxcbiAgICAgICAgICAgICAgICAjIFV0aWxpdHkgZnVuY3Rpb25zXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3M6IChjbGFzc05hbWUpIC0+IEBlbC5jbGFzc0xpc3QuYWRkIGNsYXNzTmFtZTsgcmV0dXJuIHRoaXNcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzczogKGNsYXNzTmFtZSkgLT4gQGVsLmNsYXNzTGlzdC5yZW1vdmUgY2xhc3NOYW1lOyByZXR1cm4gdGhpc1xuICAgICAgICAgICAgICAgIGhhc0NsYXNzOiAoY2xhc3NOYW1lKSAtPiBAZWwuY2xhc3NMaXN0LmNvbnRhaW5zIGNsYXNzTmFtZVxuXG4gICAgICAgICAgICAgICAgd2lkdGg6IC0+IEBlbC5vZmZzZXRXaWR0aFxuICAgICAgICAgICAgICAgIGhlaWdodDogLT4gQGVsLm9mZnNldEhlaWdodFxuXG4gICAgICAgICAgICAgICAgIyBTZXQgQXJyb3cgcG9zaXRpb25cbiAgICAgICAgICAgICAgICAjIC0geCB7TnVtYmVyfVxuICAgICAgICAgICAgICAgIHNldFBvc2l0aW9uOiAoeCkgLT5cbiAgICAgICAgICAgICAgICAgICAgQGVsLnN0eWxlLmxlZnQgPSBcIiN7IHggfXB4XCJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNcblxuICAgICAgICAgICAgICAgICMgU2V0IHRoZSBDb2xvciBlbGVtZW50IGJhY2tncm91bmQgY29sb3JcbiAgICAgICAgICAgICAgICBwcmV2aW91c0NvbG9yOiBudWxsXG4gICAgICAgICAgICAgICAgc2V0Q29sb3I6IChzbWFydENvbG9yKSAtPlxuICAgICAgICAgICAgICAgICAgICBfY29sb3IgPSBzbWFydENvbG9yLnRvUkdCQT8oKSBvciAnbm9uZSdcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlmIEBwcmV2aW91c0NvbG9yIGFuZCBAcHJldmlvdXNDb2xvciBpcyBfY29sb3JcblxuICAgICAgICAgICAgICAgICAgICBAZWwuc3R5bGUuYm9yZGVyVG9wQ29sb3IgPSBfY29sb3JcbiAgICAgICAgICAgICAgICAgICAgQGVsLnN0eWxlLmJvcmRlckJvdHRvbUNvbG9yID0gX2NvbG9yXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBAcHJldmlvdXNDb2xvciA9IF9jb2xvclxuICAgICAgICAgICAgY29sb3JQaWNrZXIuZWxlbWVudC5hZGQgQGVsZW1lbnQuZWxcblxuICAgICAgICAjICBHZXQgYW5kIHNhdmUgYXJyb3cgd2lkdGhcbiAgICAgICAgIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICAgIHNldFRpbWVvdXQgPT4gX2hhbGZBcnJvd1dpZHRoID0gKEBlbGVtZW50LndpZHRoKCkgLyAyKSA8PCAwXG5cbiAgICAgICAgIyAgSW5jcmVhc2UgQ29sb3IgUGlja2VyIGhlaWdodFxuICAgICAgICAjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgc2V0VGltZW91dCA9PlxuICAgICAgICAgICAgICAgIF9uZXdIZWlnaHQgPSBjb2xvclBpY2tlci5lbGVtZW50LmhlaWdodCgpICsgQGVsZW1lbnQuaGVpZ2h0KClcbiAgICAgICAgICAgICAgICBjb2xvclBpY2tlci5lbGVtZW50LnNldEhlaWdodCBfbmV3SGVpZ2h0XG5cbiAgICAgICAgIyAgU2V0IEFycm93IGNvbG9yIG9uIEFscGhhIGNoYW5nZVxuICAgICAgICAjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgc2V0VGltZW91dCA9PiAjIHdhaXQgZm9yIHRoZSBET01cbiAgICAgICAgICAgICAgICBBbHBoYSA9IGNvbG9yUGlja2VyLmdldEV4dGVuc2lvbiAnQWxwaGEnXG5cbiAgICAgICAgICAgICAgICBBbHBoYS5vbkNvbG9yQ2hhbmdlZCAoc21hcnRDb2xvcikgPT5cbiAgICAgICAgICAgICAgICAgICAgaWYgc21hcnRDb2xvciB0aGVuIEBlbGVtZW50LnNldENvbG9yIHNtYXJ0Q29sb3JcbiAgICAgICAgICAgICAgICAgICAgIyBEZWZhdWx0IHRvICNmMDAgcmVkXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgY29sb3JQaWNrZXIuU21hcnRDb2xvci5IRVggJyNmMDAnXG4gICAgICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgIyAgU2V0IEFycm93IGNvbG9yIHRvIHRyYW5zcGFyZW50IHdoZW4gYSB2YXJpYWJsZSBpcyBpbnB1dFxuICAgICAgICAjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgY29sb3JQaWNrZXIub25JbnB1dFZhcmlhYmxlID0+XG4gICAgICAgICAgICAgICAgQGVsZW1lbnQuc2V0Q29sb3IgY29sb3JQaWNrZXIuU21hcnRDb2xvci5SR0JBQXJyYXkgWzAsIDAsIDAsIDBdXG5cbiAgICAgICAgIyAgLi4uIGJ1dCBzZXQgaXQgdG8gdGhlIHZhcmlhYmxlIGNvbG9yIHdoZW4gdGhhdCBpcyBmb3VuZFxuICAgICAgICAjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgY29sb3JQaWNrZXIub25JbnB1dFZhcmlhYmxlQ29sb3IgKHNtYXJ0Q29sb3IpID0+XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVubGVzcyBzbWFydENvbG9yXG4gICAgICAgICAgICAgICAgQGVsZW1lbnQuc2V0Q29sb3Igc21hcnRDb2xvclxuXG4gICAgICAgICMgIFBsYWNlIHRoZSBBcnJvd1xuICAgICAgICAjIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAgICAgY29sb3JQaWNrZXIub25Qb3NpdGlvbkNoYW5nZSAocG9zaXRpb24sIGNvbG9yUGlja2VyUG9zaXRpb24pID0+XG4gICAgICAgICAgICAgICAgQGVsZW1lbnQuc2V0UG9zaXRpb24gcG9zaXRpb24ueCAtIGNvbG9yUGlja2VyUG9zaXRpb24ueFxuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiJdfQ==
