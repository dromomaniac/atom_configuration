(function() {
  var AtomShortcuts;

  module.exports = AtomShortcuts = {
    window: null,
    ctrl: {
      code: 17,
      down: false
    },
    backTick: {
      code: 192,
      down: false
    },
    activate: function(state) {
      this.window = document.createElement('div');
      this.window.className = 'atom-shortcuts';
      this.window.innerHTML = this.html;
      this.window.style.display = 'none';
      document.body.appendChild(this.window);
      this.keyDown = this.keyDown.bind(this);
      this.keyUp = this.keyUp.bind(this);
      document.body.addEventListener('keydown', this.keyDown);
      return document.body.addEventListener('keyup', this.keyUp);
    },
    keyDown: function(e) {
      if (e.which === this.backTick.code) {
        this.backTick.down = true;
      }
      if (e.which === this.ctrl.code) {
        this.ctrl.down = true;
      }
      if (this.backTick.down && this.ctrl.down) {
        return this.showWindow();
      }
    },
    keyUp: function(e) {
      if (e.which === this.backTick.code) {
        this.backTick.down = false;
      }
      if (e.which === this.ctrl.code) {
        this.ctrl.down = false;
      }
      if (!this.backTick.down || !this.ctrl.down) {
        return this.hideWindow();
      }
    },
    showWindow: function() {
      return this.window.style.display = 'block';
    },
    hideWindow: function() {
      return this.window.style.display = 'none';
    },
    deactivate: function() {
      document.body.removeEventListener('keydown', this.keyDown);
      document.body.removeEventListener('keyup', this.keyUp);
      return this.window.remove();
    },
    html: "<!-- First column --> <div class='one-third left'> <!-- General section --> <div class='section'> <h2>General</h2> <div class='item'> <p><b>shift + ⌘ + p</b></p> Toggle command palette </div> <div class='item'> <p><b>⌘ + /</b></p> Toggle line/selection comment </div> <div class='item item-last'> <p><b>ctrl + space</b></p> Show available auto-completions </div> </div> <!-- /General section --> <!-- Find section --> <div class='section'> <h2>Find</h2> <div class='item'> <p><b>⌘ + f</b></p> Find in file </div> <div class='item'> <p><b>⌘ + g</b></p> Find next </div> <div class='item'> <p><b>shift + ⌘ + f</b></p> Find in project </div> <div class='item item-last'> <p><b>⌘ + e</b></p> Use selection for find </div> </div> <!-- /Find section --> <!-- View/Window Manipulation --> <div class='section'> <h2>View/Window Manipulation</h2> <div class='item'> <p><b>⌘+ \</b></p> Toggle tree-view sidebar </div> <div class='item'> <p><b>ctrl + ⌘ + f</b></p> Toggle fullscreen </div> <div class='item'> <p><b>⌘ + k, left/right/up/down</b></p> Split pane left/right/up/down </div> <div class='item item-last'> <p><b>⌘ + k, ⌘ + left/right/up/down</b></p> Focus pane left/right/up/down </div> </div> <!-- /View/Window Manipulation --> </div> <!-- /First column --> <!-- Second column --> <div class='one-third left'> <!-- File Navigation section --> <div class='section'> <h2>File Navigation</h2> <div class='item'> <p><b>⌘ + p</b></p> Toggle file finder </div> <div class='item'> <p><b>ctrl + g></b></p> Goto line </div> <div class='item'> <p><b>⌘ + r</b></p> Goto symbol </div> <div class='item'> <p><b>shift + ⌘ + { / }</b></p> Previous/next file </div> <div class='item'> <p><b>⌘ + F2</b></p> Set bookmark </div> <div class='item item-last'> <p><b>F2</b></p> Goto next bookmark </div> </div> <!-- /File Navigation section --> <!-- Folding section --> <div class='section'> <h2>Folding</h2> <div class='item'> <p><b>ctrl + ⌘ + [ / ]</b></p> Fold/unfold current code block </div> <div class='item'> <p><b>option + shift + ⌘ + [ / ]</b></p> Fold/unfold all code blocks </div> <div class='item item-last'> <p><b>⌘ + 1-9</b></p> Fold code blocks at depth 1-9 </div> </div> <!-- /Folding section --> <!-- Word Manipulation --> <div class='section'> <h2>Word Manipulation</h2> <div class='item'> <p><b>ctrl + t</b></p> Transpose characters either side of cursor </div> <div class='item'> <p><b>option + backspace</b></p> Delete text to beginning of word </div> <div class='item item-last'> <p><b>option + delete</b></p> Delete text to end of word </div> </div> <!-- /Word Manipulation --> </div> <!-- /Second column --> <!-- Third column --> <div class='one-third left'> <!-- Line Manipulation --> <div class='section'> <h2>Line Manipulation</h2> <div class='item'> <p><b>⌘+ ] / [</b></p> Indent/outdent current line </div> <div class='item'> <p><b>⌘ + enter</b></p> Insert new line after current line </div> <div class='item'> <p><b>⌘ + shift + enter</b></p> Insert new line before current line </div> <div class='item'> <p><b>ctrl + shift + k</b></p> Delete current line </div> <div class='item'> <p><b>ctrl + ⌘ + up/down</b></p> Move current line up/down </div> <div class='item'> <p><b>shift + ⌘ + d</b></p> Duplicate current line </div> <div class='item item-last'> <p><b>⌘ + j</b></p> Join current and next lines </div> </div> <!-- /Line Manipulation --> <!-- Selection --> <div class='section'> <h2>Selection</h2> <div class='item'> <p><b>⌘ + d</b></p> Select current word/token </div> <div class='item'> <p><b>⌘ + l</b></p> Select current line </div> <div class='item'> <p><b>option + shift + left/right</b></p> Select to beginning/end of word </div> <div class='item'> <p><b>shift + ⌘ + left/right</b></p> Select to first/last character of line </div> <div class='item item-last'> <p><b>shift + ⌘ + up/down</b></p> Select to top/bottom of document </div> </div> <!-- /Line Manipulation --> </div> <!-- /Third column -->"
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL2V2YW5oZW5kcml4MS8uYXRvbS9wYWNrYWdlcy9hdG9tLXNob3J0Y3V0cy9saWIvYXRvbS1zaG9ydGN1dHMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQSxNQUFNLENBQUMsT0FBUCxHQUFpQixhQUFBLEdBRWY7SUFBQSxNQUFBLEVBQVEsSUFBUjtJQUVBLElBQUEsRUFDRTtNQUFBLElBQUEsRUFBTSxFQUFOO01BQ0EsSUFBQSxFQUFNLEtBRE47S0FIRjtJQU1BLFFBQUEsRUFDRTtNQUFBLElBQUEsRUFBTSxHQUFOO01BQ0EsSUFBQSxFQUFNLEtBRE47S0FQRjtJQVVBLFFBQUEsRUFBVSxTQUFDLEtBQUQ7TUFDUixJQUFDLENBQUEsTUFBRCxHQUFVLFFBQVEsQ0FBQyxhQUFULENBQXVCLEtBQXZCO01BQ1YsSUFBQyxDQUFBLE1BQU0sQ0FBQyxTQUFSLEdBQW9CO01BQ3BCLElBQUMsQ0FBQSxNQUFNLENBQUMsU0FBUixHQUFvQixJQUFDLENBQUE7TUFDckIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBZCxHQUF3QjtNQUN4QixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQWQsQ0FBMEIsSUFBQyxDQUFBLE1BQTNCO01BQ0EsSUFBQyxDQUFBLE9BQUQsR0FBVyxJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsQ0FBYyxJQUFkO01BQ1gsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFDLENBQUEsS0FBSyxDQUFDLElBQVAsQ0FBWSxJQUFaO01BQ1QsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZCxDQUErQixTQUEvQixFQUEwQyxJQUFDLENBQUEsT0FBM0M7YUFDQSxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFkLENBQStCLE9BQS9CLEVBQXdDLElBQUMsQ0FBQSxLQUF6QztJQVRRLENBVlY7SUFxQkEsT0FBQSxFQUFTLFNBQUMsQ0FBRDtNQUNQLElBQXdCLENBQUMsQ0FBQyxLQUFGLEtBQVcsSUFBQyxDQUFBLFFBQVEsQ0FBQyxJQUE3QztRQUFBLElBQUMsQ0FBQSxRQUFRLENBQUMsSUFBVixHQUFpQixLQUFqQjs7TUFDQSxJQUFvQixDQUFDLENBQUMsS0FBRixLQUFXLElBQUMsQ0FBQSxJQUFJLENBQUMsSUFBckM7UUFBQSxJQUFDLENBQUEsSUFBSSxDQUFDLElBQU4sR0FBYSxLQUFiOztNQUNBLElBQWlCLElBQUMsQ0FBQSxRQUFRLENBQUMsSUFBVixJQUFtQixJQUFDLENBQUEsSUFBSSxDQUFDLElBQTFDO2VBQUEsSUFBQyxDQUFBLFVBQUQsQ0FBQSxFQUFBOztJQUhPLENBckJUO0lBMEJBLEtBQUEsRUFBTyxTQUFDLENBQUQ7TUFDTCxJQUF1QixDQUFDLENBQUMsS0FBRixLQUFXLElBQUMsQ0FBQSxRQUFRLENBQUMsSUFBNUM7UUFBQSxJQUFDLENBQUEsUUFBUSxDQUFDLElBQVYsR0FBaUIsTUFBakI7O01BQ0EsSUFBbUIsQ0FBQyxDQUFDLEtBQUYsS0FBVyxJQUFDLENBQUEsSUFBSSxDQUFDLElBQXBDO1FBQUEsSUFBQyxDQUFBLElBQUksQ0FBQyxJQUFOLEdBQWEsTUFBYjs7TUFDQSxJQUFpQixDQUFDLElBQUMsQ0FBQSxRQUFRLENBQUMsSUFBWCxJQUFtQixDQUFDLElBQUMsQ0FBQSxJQUFJLENBQUMsSUFBM0M7ZUFBQSxJQUFDLENBQUEsVUFBRCxDQUFBLEVBQUE7O0lBSEssQ0ExQlA7SUErQkEsVUFBQSxFQUFZLFNBQUE7YUFDVixJQUFDLENBQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFkLEdBQXdCO0lBRGQsQ0EvQlo7SUFrQ0EsVUFBQSxFQUFZLFNBQUE7YUFDVixJQUFDLENBQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFkLEdBQXdCO0lBRGQsQ0FsQ1o7SUFxQ0EsVUFBQSxFQUFZLFNBQUE7TUFDVixRQUFRLENBQUMsSUFBSSxDQUFDLG1CQUFkLENBQWtDLFNBQWxDLEVBQTZDLElBQUMsQ0FBQSxPQUE5QztNQUNBLFFBQVEsQ0FBQyxJQUFJLENBQUMsbUJBQWQsQ0FBa0MsT0FBbEMsRUFBMkMsSUFBQyxDQUFBLEtBQTVDO2FBQ0EsSUFBQyxDQUFBLE1BQU0sQ0FBQyxNQUFSLENBQUE7SUFIVSxDQXJDWjtJQTBDQSxJQUFBLEVBQU0sKzBIQTFDTjs7QUFGRiIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gQXRvbVNob3J0Y3V0cyA9XG5cbiAgd2luZG93OiBudWxsXG5cbiAgY3RybDpcbiAgICBjb2RlOiAxN1xuICAgIGRvd246IG5vXG5cbiAgYmFja1RpY2s6XG4gICAgY29kZTogMTkyXG4gICAgZG93bjogbm9cblxuICBhY3RpdmF0ZTogKHN0YXRlKSAtPlxuICAgIEB3aW5kb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdkaXYnXG4gICAgQHdpbmRvdy5jbGFzc05hbWUgPSAnYXRvbS1zaG9ydGN1dHMnXG4gICAgQHdpbmRvdy5pbm5lckhUTUwgPSBAaHRtbFxuICAgIEB3aW5kb3cuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoQHdpbmRvdylcbiAgICBAa2V5RG93biA9IEBrZXlEb3duLmJpbmQoQClcbiAgICBAa2V5VXAgPSBAa2V5VXAuYmluZChAKVxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lciAna2V5ZG93bicsIEBrZXlEb3duXG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyICdrZXl1cCcsIEBrZXlVcFxuXG4gIGtleURvd246IChlKSAtPlxuICAgIEBiYWNrVGljay5kb3duID0geWVzIGlmIGUud2hpY2ggaXMgQGJhY2tUaWNrLmNvZGVcbiAgICBAY3RybC5kb3duID0geWVzIGlmIGUud2hpY2ggaXMgQGN0cmwuY29kZVxuICAgIEBzaG93V2luZG93KCkgaWYgQGJhY2tUaWNrLmRvd24gYW5kIEBjdHJsLmRvd25cblxuICBrZXlVcDogKGUpIC0+XG4gICAgQGJhY2tUaWNrLmRvd24gPSBubyBpZiBlLndoaWNoIGlzIEBiYWNrVGljay5jb2RlXG4gICAgQGN0cmwuZG93biA9IG5vIGlmIGUud2hpY2ggaXMgQGN0cmwuY29kZVxuICAgIEBoaWRlV2luZG93KCkgaWYgIUBiYWNrVGljay5kb3duIG9yICFAY3RybC5kb3duXG5cbiAgc2hvd1dpbmRvdzogLT5cbiAgICBAd2luZG93LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG5cbiAgaGlkZVdpbmRvdzogLT5cbiAgICBAd2luZG93LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcblxuICBkZWFjdGl2YXRlOiAtPlxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lciAna2V5ZG93bicsIEBrZXlEb3duXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyICdrZXl1cCcsIEBrZXlVcFxuICAgIEB3aW5kb3cucmVtb3ZlKClcblxuICBodG1sOiBcIlxuICAgIDwhLS0gRmlyc3QgY29sdW1uIC0tPlxuICAgIDxkaXYgY2xhc3M9J29uZS10aGlyZCBsZWZ0Jz5cbiAgICAgIDwhLS0gR2VuZXJhbCBzZWN0aW9uIC0tPlxuICAgICAgPGRpdiBjbGFzcz0nc2VjdGlvbic+XG4gICAgICAgIDxoMj5HZW5lcmFsPC9oMj5cbiAgICAgICAgPGRpdiBjbGFzcz0naXRlbSc+XG4gICAgICAgICAgPHA+PGI+c2hpZnQgKyDijJggKyBwPC9iPjwvcD5cbiAgICAgICAgICBUb2dnbGUgY29tbWFuZCBwYWxldHRlXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPSdpdGVtJz5cbiAgICAgICAgICA8cD48Yj7ijJggKyAvPC9iPjwvcD5cbiAgICAgICAgICBUb2dnbGUgbGluZS9zZWxlY3Rpb24gY29tbWVudFxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz0naXRlbSBpdGVtLWxhc3QnPlxuICAgICAgICAgIDxwPjxiPmN0cmwgKyBzcGFjZTwvYj48L3A+XG4gICAgICAgICAgU2hvdyBhdmFpbGFibGUgYXV0by1jb21wbGV0aW9uc1xuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPCEtLSAvR2VuZXJhbCBzZWN0aW9uIC0tPlxuICAgICAgPCEtLSBGaW5kIHNlY3Rpb24gLS0+XG4gICAgICA8ZGl2IGNsYXNzPSdzZWN0aW9uJz5cbiAgICAgICAgPGgyPkZpbmQ8L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzPSdpdGVtJz5cbiAgICAgICAgICA8cD48Yj7ijJggKyBmPC9iPjwvcD5cbiAgICAgICAgICBGaW5kIGluIGZpbGVcbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9J2l0ZW0nPlxuICAgICAgICAgIDxwPjxiPuKMmCArIGc8L2I+PC9wPlxuICAgICAgICAgIEZpbmQgbmV4dFxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz0naXRlbSc+XG4gICAgICAgICAgPHA+PGI+c2hpZnQgKyDijJggKyBmPC9iPjwvcD5cbiAgICAgICAgICBGaW5kIGluIHByb2plY3RcbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9J2l0ZW0gaXRlbS1sYXN0Jz5cbiAgICAgICAgICA8cD48Yj7ijJggKyBlPC9iPjwvcD5cbiAgICAgICAgICBVc2Ugc2VsZWN0aW9uIGZvciBmaW5kXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8IS0tIC9GaW5kIHNlY3Rpb24gLS0+XG4gICAgICA8IS0tIFZpZXcvV2luZG93IE1hbmlwdWxhdGlvbiAtLT5cbiAgICAgIDxkaXYgY2xhc3M9J3NlY3Rpb24nPlxuICAgICAgICA8aDI+Vmlldy9XaW5kb3cgTWFuaXB1bGF0aW9uPC9oMj5cbiAgICAgICAgPGRpdiBjbGFzcz0naXRlbSc+XG4gICAgICAgICAgPHA+PGI+4oyYKyBcXDwvYj48L3A+XG4gICAgICAgICAgVG9nZ2xlIHRyZWUtdmlldyBzaWRlYmFyXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPSdpdGVtJz5cbiAgICAgICAgICA8cD48Yj5jdHJsICsg4oyYICsgZjwvYj48L3A+XG4gICAgICAgICAgVG9nZ2xlIGZ1bGxzY3JlZW5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9J2l0ZW0nPlxuICAgICAgICAgIDxwPjxiPuKMmCArIGssIGxlZnQvcmlnaHQvdXAvZG93bjwvYj48L3A+XG4gICAgICAgICAgU3BsaXQgcGFuZSBsZWZ0L3JpZ2h0L3VwL2Rvd25cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9J2l0ZW0gaXRlbS1sYXN0Jz5cbiAgICAgICAgICA8cD48Yj7ijJggKyBrLCDijJggKyBsZWZ0L3JpZ2h0L3VwL2Rvd248L2I+PC9wPlxuICAgICAgICAgIEZvY3VzIHBhbmUgbGVmdC9yaWdodC91cC9kb3duXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8IS0tIC9WaWV3L1dpbmRvdyBNYW5pcHVsYXRpb24gLS0+XG4gICAgPC9kaXY+XG4gICAgPCEtLSAvRmlyc3QgY29sdW1uIC0tPlxuICAgIDwhLS0gU2Vjb25kIGNvbHVtbiAtLT5cbiAgICA8ZGl2IGNsYXNzPSdvbmUtdGhpcmQgbGVmdCc+XG4gICAgICA8IS0tIEZpbGUgTmF2aWdhdGlvbiBzZWN0aW9uIC0tPlxuICAgICAgPGRpdiBjbGFzcz0nc2VjdGlvbic+XG4gICAgICAgIDxoMj5GaWxlIE5hdmlnYXRpb248L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzPSdpdGVtJz5cbiAgICAgICAgICA8cD48Yj7ijJggKyBwPC9iPjwvcD5cbiAgICAgICAgICBUb2dnbGUgZmlsZSBmaW5kZXJcbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9J2l0ZW0nPlxuICAgICAgICAgIDxwPjxiPmN0cmwgKyBnPjwvYj48L3A+XG4gICAgICAgICAgR290byBsaW5lXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPSdpdGVtJz5cbiAgICAgICAgICA8cD48Yj7ijJggKyByPC9iPjwvcD5cbiAgICAgICAgICBHb3RvIHN5bWJvbFxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz0naXRlbSc+XG4gICAgICAgICAgPHA+PGI+c2hpZnQgKyDijJggKyB7IC8gfTwvYj48L3A+XG4gICAgICAgICAgUHJldmlvdXMvbmV4dCBmaWxlXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPSdpdGVtJz5cbiAgICAgICAgICA8cD48Yj7ijJggKyBGMjwvYj48L3A+XG4gICAgICAgICAgU2V0IGJvb2ttYXJrXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPSdpdGVtIGl0ZW0tbGFzdCc+XG4gICAgICAgICAgPHA+PGI+RjI8L2I+PC9wPlxuICAgICAgICAgIEdvdG8gbmV4dCBib29rbWFya1xuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPCEtLSAvRmlsZSBOYXZpZ2F0aW9uIHNlY3Rpb24gLS0+XG4gICAgICA8IS0tIEZvbGRpbmcgc2VjdGlvbiAtLT5cbiAgICAgIDxkaXYgY2xhc3M9J3NlY3Rpb24nPlxuICAgICAgICA8aDI+Rm9sZGluZzwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3M9J2l0ZW0nPlxuICAgICAgICAgIDxwPjxiPmN0cmwgKyDijJggKyBbIC8gXTwvYj48L3A+XG4gICAgICAgICAgRm9sZC91bmZvbGQgY3VycmVudCBjb2RlIGJsb2NrXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPSdpdGVtJz5cbiAgICAgICAgICA8cD48Yj5vcHRpb24gKyBzaGlmdCArIOKMmCArIFsgLyBdPC9iPjwvcD5cbiAgICAgICAgICBGb2xkL3VuZm9sZCBhbGwgY29kZSBibG9ja3NcbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9J2l0ZW0gaXRlbS1sYXN0Jz5cbiAgICAgICAgICA8cD48Yj7ijJggKyAxLTk8L2I+PC9wPlxuICAgICAgICAgIEZvbGQgY29kZSBibG9ja3MgYXQgZGVwdGggMS05XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8IS0tIC9Gb2xkaW5nIHNlY3Rpb24gLS0+XG4gICAgICA8IS0tIFdvcmQgTWFuaXB1bGF0aW9uIC0tPlxuICAgICAgPGRpdiBjbGFzcz0nc2VjdGlvbic+XG4gICAgICAgIDxoMj5Xb3JkIE1hbmlwdWxhdGlvbjwvaDI+XG4gICAgICAgIDxkaXYgY2xhc3M9J2l0ZW0nPlxuICAgICAgICAgIDxwPjxiPmN0cmwgKyB0PC9iPjwvcD5cbiAgICAgICAgICBUcmFuc3Bvc2UgY2hhcmFjdGVycyBlaXRoZXIgc2lkZSBvZiBjdXJzb3JcbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9J2l0ZW0nPlxuICAgICAgICAgIDxwPjxiPm9wdGlvbiArIGJhY2tzcGFjZTwvYj48L3A+XG4gICAgICAgICAgRGVsZXRlIHRleHQgdG8gYmVnaW5uaW5nIG9mIHdvcmRcbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9J2l0ZW0gaXRlbS1sYXN0Jz5cbiAgICAgICAgICA8cD48Yj5vcHRpb24gKyBkZWxldGU8L2I+PC9wPlxuICAgICAgICAgIERlbGV0ZSB0ZXh0IHRvIGVuZCBvZiB3b3JkXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8IS0tIC9Xb3JkIE1hbmlwdWxhdGlvbiAtLT5cbiAgICA8L2Rpdj5cbiAgICA8IS0tIC9TZWNvbmQgY29sdW1uIC0tPlxuXG4gICAgPCEtLSBUaGlyZCBjb2x1bW4gLS0+XG4gICAgPGRpdiBjbGFzcz0nb25lLXRoaXJkIGxlZnQnPlxuICAgICAgPCEtLSBMaW5lIE1hbmlwdWxhdGlvbiAtLT5cbiAgICAgIDxkaXYgY2xhc3M9J3NlY3Rpb24nPlxuICAgICAgICA8aDI+TGluZSBNYW5pcHVsYXRpb248L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzPSdpdGVtJz5cbiAgICAgICAgICA8cD48Yj7ijJgrIF0gLyBbPC9iPjwvcD5cbiAgICAgICAgICBJbmRlbnQvb3V0ZGVudCBjdXJyZW50IGxpbmVcbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9J2l0ZW0nPlxuICAgICAgICAgIDxwPjxiPuKMmCArIGVudGVyPC9iPjwvcD5cbiAgICAgICAgICBJbnNlcnQgbmV3IGxpbmUgYWZ0ZXIgY3VycmVudCBsaW5lXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPSdpdGVtJz5cbiAgICAgICAgICA8cD48Yj7ijJggKyBzaGlmdCArIGVudGVyPC9iPjwvcD5cbiAgICAgICAgICBJbnNlcnQgbmV3IGxpbmUgYmVmb3JlIGN1cnJlbnQgbGluZVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz0naXRlbSc+XG4gICAgICAgICAgPHA+PGI+Y3RybCArIHNoaWZ0ICsgazwvYj48L3A+XG4gICAgICAgICAgRGVsZXRlIGN1cnJlbnQgbGluZVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz0naXRlbSc+XG4gICAgICAgICAgPHA+PGI+Y3RybCArIOKMmCArIHVwL2Rvd248L2I+PC9wPlxuICAgICAgICAgIE1vdmUgY3VycmVudCBsaW5lIHVwL2Rvd25cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9J2l0ZW0nPlxuICAgICAgICAgIDxwPjxiPnNoaWZ0ICsg4oyYICsgZDwvYj48L3A+XG4gICAgICAgICAgRHVwbGljYXRlIGN1cnJlbnQgbGluZVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz0naXRlbSBpdGVtLWxhc3QnPlxuICAgICAgICAgIDxwPjxiPuKMmCArIGo8L2I+PC9wPlxuICAgICAgICAgIEpvaW4gY3VycmVudCBhbmQgbmV4dCBsaW5lc1xuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPCEtLSAvTGluZSBNYW5pcHVsYXRpb24gLS0+XG4gICAgICA8IS0tIFNlbGVjdGlvbiAtLT5cbiAgICAgIDxkaXYgY2xhc3M9J3NlY3Rpb24nPlxuICAgICAgICA8aDI+U2VsZWN0aW9uPC9oMj5cbiAgICAgICAgPGRpdiBjbGFzcz0naXRlbSc+XG4gICAgICAgICAgPHA+PGI+4oyYICsgZDwvYj48L3A+XG4gICAgICAgICAgU2VsZWN0IGN1cnJlbnQgd29yZC90b2tlblxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz0naXRlbSc+XG4gICAgICAgICAgPHA+PGI+4oyYICsgbDwvYj48L3A+XG4gICAgICAgICAgU2VsZWN0IGN1cnJlbnQgbGluZVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz0naXRlbSc+XG4gICAgICAgICAgPHA+PGI+b3B0aW9uICsgc2hpZnQgKyBsZWZ0L3JpZ2h0PC9iPjwvcD5cbiAgICAgICAgICBTZWxlY3QgdG8gYmVnaW5uaW5nL2VuZCBvZiB3b3JkXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPSdpdGVtJz5cbiAgICAgICAgICA8cD48Yj5zaGlmdCArIOKMmCArIGxlZnQvcmlnaHQ8L2I+PC9wPlxuICAgICAgICAgIFNlbGVjdCB0byBmaXJzdC9sYXN0IGNoYXJhY3RlciBvZiBsaW5lXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPSdpdGVtIGl0ZW0tbGFzdCc+XG4gICAgICAgICAgPHA+PGI+c2hpZnQgKyDijJggKyB1cC9kb3duPC9iPjwvcD5cbiAgICAgICAgICBTZWxlY3QgdG8gdG9wL2JvdHRvbSBvZiBkb2N1bWVudFxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPCEtLSAvTGluZSBNYW5pcHVsYXRpb24gLS0+XG4gICAgPC9kaXY+XG4gICAgPCEtLSAvVGhpcmQgY29sdW1uIC0tPlxuICBcIlxuIl19
