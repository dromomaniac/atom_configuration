Object.defineProperty(exports, '__esModule', {
	value: true
});
/** @babel */

var init = function init() {
	var editor = atom.workspace.getActiveTextEditor();
	if (!editor) {
		return;
	}
	var buffer = editor.getBuffer();
	if (typeof buffer.editorconfig === 'undefined') {
		return;
	}

	var settings = buffer.editorconfig.settings;
	var softTabs = settings.indent_style === 'space';
	var checkpoint = buffer.createCheckpoint();
	var fixedProperties = {
		endOfLine: 0,
		indentStyle: 0
	};

	// fix end_of_line, if necessary
	if (settings.end_of_line !== 'auto') {
		var lastRow = buffer.getLastRow();
		for (var i = 0; i < lastRow; i++) {
			if (buffer.lineEndingForRow(i) !== settings.end_of_line && buffer.lineEndingForRow(i) !== '') {
				buffer.setTextInRange([[i, buffer.lineLengthForRow(i)], [i + 1, 0]], settings.end_of_line, { normalizeLineEndings: false });
				fixedProperties.endOfLine++;
			}
		}
	}

	// fix indent_style, if necessary
	if (settings.indent_style !== 'auto') {
		(function () {
			var spaceChar = { 'true': ' ', 'false': '\\t' };
			var tabLength = editor.getTabLength();
			// Match only malformed (containing at least one wrong tab-char) lines
			var searchPattern = '^([' + spaceChar[softTabs] + ']*[' + spaceChar[!softTabs] + ']\\s*)';

			if (tabLength > 0) {
				buffer.backwardsScan(new RegExp(searchPattern, 'gm'), function (scan) {
					var columns = scan.matchText.split('').reduce(function (prev, curr) {
						fixedProperties.indentStyle += 1;

						if (curr === ' ') {
							return prev + 1;
						}
						return prev + tabLength - prev % tabLength;
					}, 0);

					Math.max(columns, Math.floor(columns / tabLength));
					if (softTabs === true) {
						scan.replace(' '.repeat(columns));
					} else {
						var tabString = '\t'.repeat(Math.floor(columns / tabLength));
						var remainingSpaces = ' '.repeat(columns % tabLength);
						scan.replace(tabString.concat(remainingSpaces));
					}
				});
			}
		})();
	}

	if (softTabs) {
		fixedProperties.indentStyle = Math.floor(fixedProperties.indentStyle / editor.getTabLength());
	}
	var changesInTotal = 0;
	Object.keys(fixedProperties).forEach(function (k) {
		changesInTotal += fixedProperties[k];
	});

	// Prepare notification & save changes
	var notificationOptions = { dismissable: true };
	if (changesInTotal > 0) {
		var styleName = softTabs === true ? 'Tab(s)' : 'Space(s)';

		buffer.groupChangesSinceCheckpoint(checkpoint);
		notificationOptions.description = '\n|Fixed EditorConfig-Properties||\n|--------|------:|\n|`end_of_line`|' + fixedProperties.endOfLine + '|\n|`indent_style`|' + fixedProperties.indentStyle + ' ' + styleName + '|\n|Changes in total|**' + changesInTotal + '**|\n';
	} else {
		notificationOptions.description = '\nThe file ' + editor.getTitle() + ' conformed to the `end_of_line` and `indent_style` properties.\nNo changes were applied.\n';
	}
	atom.notifications.addSuccess(editor.getTitle(), notificationOptions);
};

var subscriber = function subscriber() {
	atom.commands.add('atom-workspace', 'EditorConfig:fix-file', init);
};

exports['default'] = subscriber;
exports.init = init;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ldmFuaGVuZHJpeDEvLmF0b20vcGFja2FnZXMvZWRpdG9yY29uZmlnL2NvbW1hbmRzL2ZpeC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLElBQU0sSUFBSSxHQUFHLFNBQVAsSUFBSSxHQUFTO0FBQ2xCLEtBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztBQUNwRCxLQUFJLENBQUMsTUFBTSxFQUFFO0FBQ1osU0FBTztFQUNQO0FBQ0QsS0FBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQ2xDLEtBQUksT0FBTyxNQUFNLENBQUMsWUFBWSxLQUFLLFdBQVcsRUFBRTtBQUMvQyxTQUFPO0VBQ1A7O0FBRUQsS0FBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7QUFDOUMsS0FBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLFlBQVksS0FBSyxPQUFPLENBQUM7QUFDbkQsS0FBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUM7QUFDN0MsS0FBTSxlQUFlLEdBQUc7QUFDdkIsV0FBUyxFQUFFLENBQUM7QUFDWixhQUFXLEVBQUUsQ0FBQztFQUNkLENBQUM7OztBQUdGLEtBQUksUUFBUSxDQUFDLFdBQVcsS0FBSyxNQUFNLEVBQUU7QUFDcEMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ3BDLE9BQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDakMsT0FBSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLFdBQVcsSUFDdEQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtBQUNuQyxVQUFNLENBQUMsY0FBYyxDQUNwQixDQUNDLENBQUMsQ0FBQyxF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QWUsQ0FBQyxXQUFXLFNBQUksU0FBUywrQkFDdEMsY0FBYyxVQUNuQyxDQUFDO0VBQ0EsTUFBTTtBQUNOLHFCQUFtQixDQUFDLFdBQVcsbUJBQ3RCLE1BQU0sQ0FBQyxRQUFRLEVBQUUsK0ZBRTNCLENBQUM7RUFDQTtBQUNELEtBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0NBQ3RFLENBQUM7O0FBRUYsSUFBTSxVQUFVLEdBQUcsU0FBYixVQUFVLEdBQVM7QUFDeEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDbkUsQ0FBQzs7cUJBRU0sVUFBVTtRQUFhLElBQUksR0FBSixJQUFJIiwiZmlsZSI6Ii9Vc2Vycy9ldmFuaGVuZHJpeDEvLmF0b20vcGFja2FnZXMvZWRpdG9yY29uZmlnL2NvbW1hbmRzL2ZpeC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBAYmFiZWwgKi9cblxuY29uc3QgaW5pdCA9ICgpID0+IHtcblx0Y29uc3QgZWRpdG9yID0gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlVGV4dEVkaXRvcigpO1xuXHRpZiAoIWVkaXRvcikge1xuXHRcdHJldHVybjtcblx0fVxuXHRjb25zdCBidWZmZXIgPSBlZGl0b3IuZ2V0QnVmZmVyKCk7XG5cdGlmICh0eXBlb2YgYnVmZmVyLmVkaXRvcmNvbmZpZyA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCBzZXR0aW5ncyA9IGJ1ZmZlci5lZGl0b3Jjb25maWcuc2V0dGluZ3M7XG5cdGNvbnN0IHNvZnRUYWJzID0gc2V0dGluZ3MuaW5kZW50X3N0eWxlID09PSAnc3BhY2UnO1xuXHRjb25zdCBjaGVja3BvaW50ID0gYnVmZmVyLmNyZWF0ZUNoZWNrcG9pbnQoKTtcblx0Y29uc3QgZml4ZWRQcm9wZXJ0aWVzID0ge1xuXHRcdGVuZE9mTGluZTogMCxcblx0XHRpbmRlbnRTdHlsZTogMFxuXHR9O1xuXG5cdC8vIGZpeCBlbmRfb2ZfbGluZSwgaWYgbmVjZXNzYXJ5XG5cdGlmIChzZXR0aW5ncy5lbmRfb2ZfbGluZSAhPT0gJ2F1dG8nKSB7XG5cdFx0Y29uc3QgbGFzdFJvdyA9IGJ1ZmZlci5nZXRMYXN0Um93KCk7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsYXN0Um93OyBpKyspIHtcblx0XHRcdGlmIChidWZmZXIubGluZUVuZGluZ0ZvclJvdyhpKSAhPT0gc2V0dGluZ3MuZW5kX29mX2xpbmUgJiZcblx0XHRcdFx0YnVmZmVyLmxpbmVFbmRpbmdGb3JSb3coaSkgIT09ICcnKSB7XG5cdFx0XHRcdGJ1ZmZlci5zZXRUZXh0SW5SYW5nZShcblx0XHRcdFx0XHRbXG5cdFx0XHRcdFx0XHRbaSwgYnVmZmVyLmxpbmVMZW5ndGhGb3JSb3coaSldLFxuXHRcdFx0XHRcdFx0W2kgKyAxLCAwXVxuXHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0c2V0dGluZ3MuZW5kX29mX2xpbmUsXG5cdFx0XHRcdFx0e25vcm1hbGl6ZUxpbmVFbmRpbmdzOiBmYWxzZX1cblx0XHRcdFx0KTtcblx0XHRcdFx0Zml4ZWRQcm9wZXJ0aWVzLmVuZE9mTGluZSsrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIGZpeCBpbmRlbnRfc3R5bGUsIGlmIG5lY2Vzc2FyeVxuXHRpZiAoc2V0dGluZ3MuaW5kZW50X3N0eWxlICE9PSAnYXV0bycpIHtcblx0XHRjb25zdCBzcGFjZUNoYXIgPSB7dHJ1ZTogJyAnLCBmYWxzZTogJ1xcXFx0J307XG5cdFx0Y29uc3QgdGFiTGVuZ3RoID0gZWRpdG9yLmdldFRhYkxlbmd0aCgpO1xuXHRcdC8vIE1hdGNoIG9ubHkgbWFsZm9ybWVkIChjb250YWluaW5nIGF0IGxlYXN0IG9uZSB3cm9uZyB0YWItY2hhcikgbGluZXNcblx0XHRjb25zdCBzZWFyY2hQYXR0ZXJuID0gYF4oWyR7c3BhY2VDaGFyW3NvZnRUYWJzXX1dKlske3NwYWNlQ2hhclshc29mdFRhYnNdfV1cXFxccyopYDtcblxuXHRcdGlmICh0YWJMZW5ndGggPiAwKSB7XG5cdFx0XHRidWZmZXIuYmFja3dhcmRzU2NhbihuZXcgUmVnRXhwKHNlYXJjaFBhdHRlcm4sICdnbScpLCBzY2FuID0+IHtcblx0XHRcdFx0Y29uc3QgY29sdW1ucyA9IHNjYW4ubWF0Y2hUZXh0LnNwbGl0KCcnKS5yZWR1Y2UoKHByZXYsIGN1cnIpID0+IHtcblx0XHRcdFx0XHRmaXhlZFByb3BlcnRpZXMuaW5kZW50U3R5bGUgKz0gMTtcblxuXHRcdFx0XHRcdGlmIChjdXJyID09PSAnICcpIHtcblx0XHRcdFx0XHRcdHJldHVybiBwcmV2ICsgMTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHByZXYgKyB0YWJMZW5ndGggLSAocHJldiAlIHRhYkxlbmd0aCk7XG5cdFx0XHRcdH0sIDApO1xuXG5cdFx0XHRcdE1hdGgubWF4KFxuXHRcdFx0XHRcdGNvbHVtbnMsIE1hdGguZmxvb3IoY29sdW1ucyAvIHRhYkxlbmd0aClcblx0XHRcdFx0KTtcblx0XHRcdFx0aWYgKHNvZnRUYWJzID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0c2Nhbi5yZXBsYWNlKCcgJy5yZXBlYXQoY29sdW1ucykpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvbnN0IHRhYlN0cmluZyA9ICdcXHQnLnJlcGVhdChNYXRoLmZsb29yKGNvbHVtbnMgLyB0YWJMZW5ndGgpKTtcblx0XHRcdFx0XHRjb25zdCByZW1haW5pbmdTcGFjZXMgPSAnICcucmVwZWF0KGNvbHVtbnMgJSB0YWJMZW5ndGgpO1xuXHRcdFx0XHRcdHNjYW4ucmVwbGFjZSh0YWJTdHJpbmcuY29uY2F0KHJlbWFpbmluZ1NwYWNlcykpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRpZiAoc29mdFRhYnMpIHtcblx0XHRmaXhlZFByb3BlcnRpZXMuaW5kZW50U3R5bGUgPSBNYXRoLmZsb29yKFxuXHRcdFx0Zml4ZWRQcm9wZXJ0aWVzLmluZGVudFN0eWxlIC8gZWRpdG9yLmdldFRhYkxlbmd0aCgpXG5cdFx0KTtcblx0fVxuXHRsZXQgY2hhbmdlc0luVG90YWwgPSAwO1xuXHRPYmplY3Qua2V5cyhmaXhlZFByb3BlcnRpZXMpLmZvckVhY2goayA9PiB7XG5cdFx0Y2hhbmdlc0luVG90YWwgKz0gZml4ZWRQcm9wZXJ0aWVzW2tdO1xuXHR9KTtcblxuXHQvLyBQcmVwYXJlIG5vdGlmaWNhdGlvbiAmIHNhdmUgY2hhbmdlc1xuXHRjb25zdCBub3RpZmljYXRpb25PcHRpb25zID0ge2Rpc21pc3NhYmxlOiB0cnVlfTtcblx0aWYgKGNoYW5nZXNJblRvdGFsID4gMCkge1xuXHRcdGNvbnN0IHN0eWxlTmFtZSA9IHNvZnRUYWJzID09PSB0cnVlID8gJ1RhYihzKScgOiAnU3BhY2UocyknO1xuXG5cdFx0YnVmZmVyLmdyb3VwQ2hhbmdlc1NpbmNlQ2hlY2twb2ludChjaGVja3BvaW50KTtcblx0XHRub3RpZmljYXRpb25PcHRpb25zLmRlc2NyaXB0aW9uID0gYFxufEZpeGVkIEVkaXRvckNvbmZpZy1Qcm9wZXJ0aWVzfHxcbnwtLS0tLS0tLXwtLS0tLS06fFxufFxcYGVuZF9vZl9saW5lXFxgfCR7Zml4ZWRQcm9wZXJ0aWVzLmVuZE9mTGluZX18XG58XFxgaW5kZW50X3N0eWxlXFxgfCR7Zml4ZWRQcm9wZXJ0aWVzLmluZGVudFN0eWxlfSAke3N0eWxlTmFtZX18XG58Q2hhbmdlcyBpbiB0b3RhbHwqKiR7Y2hhbmdlc0luVG90YWx9Kip8XG5gO1xuXHR9IGVsc2Uge1xuXHRcdG5vdGlmaWNhdGlvbk9wdGlvbnMuZGVzY3JpcHRpb24gPSBgXG5UaGUgZmlsZSAke2VkaXRvci5nZXRUaXRsZSgpfSBjb25mb3JtZWQgdG8gdGhlIFxcYGVuZF9vZl9saW5lXFxgIGFuZCBcXGBpbmRlbnRfc3R5bGVcXGAgcHJvcGVydGllcy5cbk5vIGNoYW5nZXMgd2VyZSBhcHBsaWVkLlxuYDtcblx0fVxuXHRhdG9tLm5vdGlmaWNhdGlvbnMuYWRkU3VjY2VzcyhlZGl0b3IuZ2V0VGl0bGUoKSwgbm90aWZpY2F0aW9uT3B0aW9ucyk7XG59O1xuXG5jb25zdCBzdWJzY3JpYmVyID0gKCkgPT4ge1xuXHRhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS13b3Jrc3BhY2UnLCAnRWRpdG9yQ29uZmlnOmZpeC1maWxlJywgaW5pdCk7XG59O1xuXG5leHBvcnQge3N1YnNjcmliZXIgYXMgZGVmYXVsdCwgaW5pdH07XG4iXX0=