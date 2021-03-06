(function() {
  var BTN_ICON_MAP, BTN_TOOLTIP_MAP, h, hg;

  hg = require('mercury');

  h = hg.h;

  BTN_ICON_MAP = {
    'continue': 'icon-playback-play btn btn-primary',
    'next': 'icon-chevron-right btn btn-primary',
    'out': 'icon-chevron-up btn btn-primary',
    'in': 'icon-chevron-down btn btn-primary'
  };

  BTN_TOOLTIP_MAP = {
    'continue': 'resume',
    'next': 'step-next',
    'in': 'step-in',
    'out': 'step-out'
  };

  exports.StepButton = function(_debugger) {
    var StepButton, onNext;
    onNext = function(state) {
      var promise, type;
      type = state.type();
      state.waiting(true);
      promise = null;
      if (type === 'continue') {
        promise = _debugger.reqContinue();
      } else {
        promise = _debugger.step(type, 1);
      }
      return promise.then(function() {
        return state.waiting(false);
      })["catch"](function(e) {
        return state.waiting(false);
      });
    };
    StepButton = function(name, type) {
      return hg.state({
        title: hg.value(name),
        type: hg.value(type),
        waiting: hg.value(false),
        channels: {
          next: onNext
        }
      });
    };
    StepButton.render = function(state) {
      var channels;
      channels = state.channels();
      return h('div', {
        'ev-click': hg.send(channels.next),
        'className': BTN_ICON_MAP[state.type()],
        'disabled': !state.waiting,
        'title': BTN_TOOLTIP_MAP[state.type()]
      }, []);
    };
    return StepButton;
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL2V2YW5oZW5kcml4MS8uYXRvbS9wYWNrYWdlcy9ub2RlLWRlYnVnZ2VyL2xpYi9Db21wb25lbnRzL1N0ZXBCdXR0b24uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLFNBQVI7O0VBQ0osSUFBSzs7RUFFTixZQUFBLEdBQWU7SUFDYixVQUFBLEVBQVksb0NBREM7SUFFYixNQUFBLEVBQVEsb0NBRks7SUFHYixLQUFBLEVBQU8saUNBSE07SUFJYixJQUFBLEVBQU0sbUNBSk87OztFQU9mLGVBQUEsR0FBa0I7SUFDaEIsVUFBQSxFQUFZLFFBREk7SUFFaEIsTUFBQSxFQUFRLFdBRlE7SUFHaEIsSUFBQSxFQUFNLFNBSFU7SUFJaEIsS0FBQSxFQUFPLFVBSlM7OztFQU9sQixPQUFPLENBQUMsVUFBUixHQUFxQixTQUFDLFNBQUQ7QUFDbkIsUUFBQTtJQUFBLE1BQUEsR0FBUyxTQUFDLEtBQUQ7QUFDUCxVQUFBO01BQUEsSUFBQSxHQUFPLEtBQUssQ0FBQyxJQUFOLENBQUE7TUFDUCxLQUFLLENBQUMsT0FBTixDQUFjLElBQWQ7TUFDQSxPQUFBLEdBQVU7TUFFVixJQUFHLElBQUEsS0FBUSxVQUFYO1FBQ0UsT0FBQSxHQUFVLFNBQVMsQ0FBQyxXQUFWLENBQUEsRUFEWjtPQUFBLE1BQUE7UUFHRSxPQUFBLEdBQVUsU0FBUyxDQUFDLElBQVYsQ0FBZSxJQUFmLEVBQXFCLENBQXJCLEVBSFo7O2FBS0EsT0FBTyxDQUFDLElBQVIsQ0FBYSxTQUFBO2VBQ1gsS0FBSyxDQUFDLE9BQU4sQ0FBYyxLQUFkO01BRFcsQ0FBYixDQUVBLEVBQUMsS0FBRCxFQUZBLENBRU8sU0FBQyxDQUFEO2VBQ0wsS0FBSyxDQUFDLE9BQU4sQ0FBYyxLQUFkO01BREssQ0FGUDtJQVZPO0lBZVQsVUFBQSxHQUFhLFNBQUMsSUFBRCxFQUFPLElBQVA7YUFDWCxFQUFFLENBQUMsS0FBSCxDQUFTO1FBQ1AsS0FBQSxFQUFPLEVBQUUsQ0FBQyxLQUFILENBQVMsSUFBVCxDQURBO1FBRVAsSUFBQSxFQUFNLEVBQUUsQ0FBQyxLQUFILENBQVMsSUFBVCxDQUZDO1FBR1AsT0FBQSxFQUFTLEVBQUUsQ0FBQyxLQUFILENBQVMsS0FBVCxDQUhGO1FBSVAsUUFBQSxFQUFVO1VBQ1IsSUFBQSxFQUFNLE1BREU7U0FKSDtPQUFUO0lBRFc7SUFVYixVQUFVLENBQUMsTUFBWCxHQUFvQixTQUFDLEtBQUQ7QUFDbEIsVUFBQTtNQUFBLFFBQUEsR0FBVyxLQUFLLENBQUMsUUFBTixDQUFBO2FBRVgsQ0FBQSxDQUFFLEtBQUYsRUFBUztRQUNQLFVBQUEsRUFBWSxFQUFFLENBQUMsSUFBSCxDQUFRLFFBQVEsQ0FBQyxJQUFqQixDQURMO1FBRVAsV0FBQSxFQUFhLFlBQWEsQ0FBQSxLQUFLLENBQUMsSUFBTixDQUFBLENBQUEsQ0FGbkI7UUFHUCxVQUFBLEVBQVksQ0FBQyxLQUFLLENBQUMsT0FIWjtRQUlQLE9BQUEsRUFBUyxlQUFnQixDQUFBLEtBQUssQ0FBQyxJQUFOLENBQUEsQ0FBQSxDQUpsQjtPQUFULEVBS0csRUFMSDtJQUhrQjtBQVdwQixXQUFPO0VBckNZO0FBakJyQiIsInNvdXJjZXNDb250ZW50IjpbImhnID0gcmVxdWlyZSAnbWVyY3VyeSdcbntofSA9IGhnXG5cbkJUTl9JQ09OX01BUCA9IHtcbiAgJ2NvbnRpbnVlJzogJ2ljb24tcGxheWJhY2stcGxheSBidG4gYnRuLXByaW1hcnknXG4gICduZXh0JzogJ2ljb24tY2hldnJvbi1yaWdodCBidG4gYnRuLXByaW1hcnknXG4gICdvdXQnOiAnaWNvbi1jaGV2cm9uLXVwIGJ0biBidG4tcHJpbWFyeSdcbiAgJ2luJzogJ2ljb24tY2hldnJvbi1kb3duIGJ0biBidG4tcHJpbWFyeSdcbn1cblxuQlROX1RPT0xUSVBfTUFQID0ge1xuICAnY29udGludWUnOiAncmVzdW1lJ1xuICAnbmV4dCc6ICdzdGVwLW5leHQnXG4gICdpbic6ICdzdGVwLWluJ1xuICAnb3V0JzogJ3N0ZXAtb3V0J1xufVxuXG5leHBvcnRzLlN0ZXBCdXR0b24gPSAoX2RlYnVnZ2VyKSAtPlxuICBvbk5leHQgPSAoc3RhdGUpIC0+XG4gICAgdHlwZSA9IHN0YXRlLnR5cGUoKVxuICAgIHN0YXRlLndhaXRpbmcodHJ1ZSlcbiAgICBwcm9taXNlID0gbnVsbFxuXG4gICAgaWYgdHlwZSBpcyAnY29udGludWUnXG4gICAgICBwcm9taXNlID0gX2RlYnVnZ2VyLnJlcUNvbnRpbnVlKClcbiAgICBlbHNlXG4gICAgICBwcm9taXNlID0gX2RlYnVnZ2VyLnN0ZXAodHlwZSwgMSlcblxuICAgIHByb21pc2UudGhlbiAtPlxuICAgICAgc3RhdGUud2FpdGluZyhmYWxzZSlcbiAgICAuY2F0Y2ggKGUpIC0+XG4gICAgICBzdGF0ZS53YWl0aW5nKGZhbHNlKVxuXG4gIFN0ZXBCdXR0b24gPSAobmFtZSwgdHlwZSkgLT5cbiAgICBoZy5zdGF0ZSh7XG4gICAgICB0aXRsZTogaGcudmFsdWUobmFtZSlcbiAgICAgIHR5cGU6IGhnLnZhbHVlKHR5cGUpXG4gICAgICB3YWl0aW5nOiBoZy52YWx1ZShmYWxzZSlcbiAgICAgIGNoYW5uZWxzOiB7XG4gICAgICAgIG5leHQ6IG9uTmV4dFxuICAgICAgfVxuICAgIH0pXG5cbiAgU3RlcEJ1dHRvbi5yZW5kZXIgPSAoc3RhdGUpIC0+XG4gICAgY2hhbm5lbHMgPSBzdGF0ZS5jaGFubmVscygpXG5cbiAgICBoICdkaXYnLCB7XG4gICAgICAnZXYtY2xpY2snOiBoZy5zZW5kIGNoYW5uZWxzLm5leHRcbiAgICAgICdjbGFzc05hbWUnOiBCVE5fSUNPTl9NQVBbc3RhdGUudHlwZSgpXVxuICAgICAgJ2Rpc2FibGVkJzogIXN0YXRlLndhaXRpbmdcbiAgICAgICd0aXRsZSc6IEJUTl9UT09MVElQX01BUFtzdGF0ZS50eXBlKCldXG4gICAgfSwgW1xuICAgIF1cblxuICByZXR1cm4gU3RlcEJ1dHRvblxuIl19
