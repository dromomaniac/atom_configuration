(function() {
  var CompositeDisposable, GitPull, GitPush, Path, cleanup, commit, destroyCommitEditor, disposables, fs, getStagedFiles, getTemplate, git, notifier, prepFile, scissorsLine, showFile, trimFile, verboseCommitsEnabled;

  Path = require('path');

  CompositeDisposable = require('atom').CompositeDisposable;

  fs = require('fs-plus');

  git = require('../git');

  notifier = require('../notifier');

  GitPush = require('./git-push');

  GitPull = require('./git-pull');

  disposables = new CompositeDisposable;

  verboseCommitsEnabled = function() {
    return atom.config.get('git-plus.commits.verboseCommits');
  };

  scissorsLine = '------------------------ >8 ------------------------';

  getStagedFiles = function(repo) {
    return git.stagedFiles(repo).then(function(files) {
      if (files.length >= 1) {
        return git.cmd(['-c', 'color.ui=false', 'status'], {
          cwd: repo.getWorkingDirectory()
        });
      } else {
        return Promise.reject("Nothing to commit.");
      }
    });
  };

  getTemplate = function(filePath) {
    var e;
    if (filePath) {
      try {
        return fs.readFileSync(fs.absolute(filePath.trim())).toString().trim();
      } catch (error) {
        e = error;
        throw new Error("Your configured commit template file can't be found.");
      }
    } else {
      return '';
    }
  };

  prepFile = function(arg) {
    var commentChar, commitEditor, content, cwd, diff, filePath, indexOfComments, ref, status, template, text;
    status = arg.status, filePath = arg.filePath, diff = arg.diff, commentChar = arg.commentChar, template = arg.template;
    if (commitEditor = (ref = atom.workspace.paneForURI(filePath)) != null ? ref.itemForURI(filePath) : void 0) {
      text = commitEditor.getText();
      indexOfComments = text.indexOf(commentChar);
      if (indexOfComments > 0) {
        template = text.substring(0, indexOfComments - 1);
      }
    }
    cwd = Path.dirname(filePath);
    status = status.replace(/\s*\(.*\)\n/g, "\n");
    status = status.trim().replace(/\n/g, "\n" + commentChar + " ");
    content = template + "\n" + commentChar + " " + scissorsLine + "\n" + commentChar + " Do not touch the line above.\n" + commentChar + " Everything below will be removed.\n" + commentChar + " Please enter the commit message for your changes. Lines starting\n" + commentChar + " with '" + commentChar + "' will be ignored, and an empty message aborts the commit.\n" + commentChar + "\n" + commentChar + " " + status;
    if (diff) {
      content += "\n" + commentChar + "\n" + diff;
    }
    return fs.writeFileSync(filePath, content);
  };

  destroyCommitEditor = function(filePath) {
    var ref, ref1;
    if (atom.config.get('git-plus.general.openInPane')) {
      return (ref = atom.workspace.paneForURI(filePath)) != null ? ref.destroy() : void 0;
    } else {
      return (ref1 = atom.workspace.paneForURI(filePath).itemForURI(filePath)) != null ? ref1.destroy() : void 0;
    }
  };

  trimFile = function(filePath, commentChar) {
    var content, cwd, findScissorsLine, startOfComments;
    findScissorsLine = function(line) {
      return line.includes(commentChar + " " + scissorsLine);
    };
    cwd = Path.dirname(filePath);
    content = fs.readFileSync(fs.absolute(filePath)).toString();
    startOfComments = content.indexOf(content.split('\n').find(findScissorsLine));
    content = startOfComments > 0 ? content.substring(0, startOfComments) : content;
    return fs.writeFileSync(filePath, content);
  };

  commit = function(directory, filePath) {
    return git.cmd(['commit', "--cleanup=whitespace", "--file=" + filePath], {
      cwd: directory
    }).then(function(data) {
      notifier.addSuccess(data);
      destroyCommitEditor(filePath);
      return git.refresh();
    })["catch"](function(data) {
      notifier.addError(data);
      return destroyCommitEditor(filePath);
    });
  };

  cleanup = function(currentPane) {
    if (currentPane.isAlive()) {
      currentPane.activate();
    }
    return disposables.dispose();
  };

  showFile = function(filePath) {
    var commitEditor, ref, splitDirection;
    commitEditor = (ref = atom.workspace.paneForURI(filePath)) != null ? ref.itemForURI(filePath) : void 0;
    if (!commitEditor) {
      if (atom.config.get('git-plus.general.openInPane')) {
        splitDirection = atom.config.get('git-plus.general.splitPane');
        atom.workspace.getCenter().getActivePane()["split" + splitDirection]();
      }
      return atom.workspace.open(filePath);
    } else {
      if (atom.config.get('git-plus.general.openInPane')) {
        atom.workspace.paneForURI(filePath).activate();
      } else {
        atom.workspace.paneForURI(filePath).activateItemForURI(filePath);
      }
      return Promise.resolve(commitEditor);
    }
  };

  module.exports = function(repo, arg) {
    var andPush, commentChar, currentPane, e, filePath, init, ref, ref1, stageChanges, startCommit, template;
    ref = arg != null ? arg : {}, stageChanges = ref.stageChanges, andPush = ref.andPush;
    filePath = Path.join(repo.getPath(), 'COMMIT_EDITMSG');
    currentPane = atom.workspace.getActivePane();
    commentChar = (ref1 = git.getConfig(repo, 'core.commentchar')) != null ? ref1 : '#';
    try {
      template = getTemplate(git.getConfig(repo, 'commit.template'));
    } catch (error) {
      e = error;
      notifier.addError(e.message);
      return Promise.reject(e.message);
    }
    init = function() {
      return getStagedFiles(repo).then(function(status) {
        var args;
        if (verboseCommitsEnabled()) {
          args = ['diff', '--color=never', '--staged'];
          if (atom.config.get('git-plus.diffs.wordDiff')) {
            args.push('--word-diff');
          }
          return git.cmd(args, {
            cwd: repo.getWorkingDirectory()
          }).then(function(diff) {
            return prepFile({
              status: status,
              filePath: filePath,
              diff: diff,
              commentChar: commentChar,
              template: template
            });
          });
        } else {
          return prepFile({
            status: status,
            filePath: filePath,
            commentChar: commentChar,
            template: template
          });
        }
      });
    };
    startCommit = function() {
      return showFile(filePath).then(function(textEditor) {
        disposables.dispose();
        disposables = new CompositeDisposable;
        disposables.add(textEditor.onDidSave(function() {
          trimFile(filePath, commentChar);
          return commit(repo.getWorkingDirectory(), filePath).then(function() {
            if (andPush) {
              return GitPush(repo);
            }
          });
        }));
        return disposables.add(textEditor.onDidDestroy(function() {
          return cleanup(currentPane);
        }));
      })["catch"](notifier.addError);
    };
    if (stageChanges) {
      return git.add(repo, {
        update: true
      }).then(init).then(startCommit);
    } else {
      return init().then(function() {
        return startCommit();
      })["catch"](function(message) {
        if (typeof message.includes === "function" ? message.includes('CRLF') : void 0) {
          return startCommit();
        } else {
          return notifier.addInfo(message);
        }
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL2V2YW5oZW5kcml4MS8uYXRvbS9wYWNrYWdlcy9naXQtcGx1cy9saWIvbW9kZWxzL2dpdC1jb21taXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVI7O0VBQ04sc0JBQXVCLE9BQUEsQ0FBUSxNQUFSOztFQUN4QixFQUFBLEdBQUssT0FBQSxDQUFRLFNBQVI7O0VBQ0wsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSOztFQUNOLFFBQUEsR0FBVyxPQUFBLENBQVEsYUFBUjs7RUFDWCxPQUFBLEdBQVUsT0FBQSxDQUFRLFlBQVI7O0VBQ1YsT0FBQSxHQUFVLE9BQUEsQ0FBUSxZQUFSOztFQUVWLFdBQUEsR0FBYyxJQUFJOztFQUVsQixxQkFBQSxHQUF3QixTQUFBO1dBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLGlDQUFoQjtFQUFIOztFQUV4QixZQUFBLEdBQWU7O0VBRWYsY0FBQSxHQUFpQixTQUFDLElBQUQ7V0FDZixHQUFHLENBQUMsV0FBSixDQUFnQixJQUFoQixDQUFxQixDQUFDLElBQXRCLENBQTJCLFNBQUMsS0FBRDtNQUN6QixJQUFHLEtBQUssQ0FBQyxNQUFOLElBQWdCLENBQW5CO2VBQ0UsR0FBRyxDQUFDLEdBQUosQ0FBUSxDQUFDLElBQUQsRUFBTyxnQkFBUCxFQUF5QixRQUF6QixDQUFSLEVBQTRDO1VBQUEsR0FBQSxFQUFLLElBQUksQ0FBQyxtQkFBTCxDQUFBLENBQUw7U0FBNUMsRUFERjtPQUFBLE1BQUE7ZUFHRSxPQUFPLENBQUMsTUFBUixDQUFlLG9CQUFmLEVBSEY7O0lBRHlCLENBQTNCO0VBRGU7O0VBT2pCLFdBQUEsR0FBYyxTQUFDLFFBQUQ7QUFDWixRQUFBO0lBQUEsSUFBRyxRQUFIO0FBQ0U7ZUFDRSxFQUFFLENBQUMsWUFBSCxDQUFnQixFQUFFLENBQUMsUUFB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QUNPLFNBQUMsT0FBRDtRQUNMLDZDQUFHLE9BQU8sQ0FBQyxTQUFVLGdCQUFyQjtpQkFDRSxXQUFBLENBQUEsRUFERjtTQUFBLE1BQUE7aUJBR0UsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsT0FBakIsRUFIRjs7TUFESyxDQURQLEVBSEY7O0VBOUJlO0FBbkdqQiIsInNvdXJjZXNDb250ZW50IjpbIlBhdGggPSByZXF1aXJlICdwYXRoJ1xue0NvbXBvc2l0ZURpc3Bvc2FibGV9ID0gcmVxdWlyZSAnYXRvbSdcbmZzID0gcmVxdWlyZSAnZnMtcGx1cydcbmdpdCA9IHJlcXVpcmUgJy4uL2dpdCdcbm5vdGlmaWVyID0gcmVxdWlyZSAnLi4vbm90aWZpZXInXG5HaXRQdXNoID0gcmVxdWlyZSAnLi9naXQtcHVzaCdcbkdpdFB1bGwgPSByZXF1aXJlICcuL2dpdC1wdWxsJ1xuXG5kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlXG5cbnZlcmJvc2VDb21taXRzRW5hYmxlZCA9IC0+IGF0b20uY29uZmlnLmdldCgnZ2l0LXBsdXMuY29tbWl0cy52ZXJib3NlQ29tbWl0cycpXG5cbnNjaXNzb3JzTGluZSA9ICctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gPjggLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJ1xuXG5nZXRTdGFnZWRGaWxlcyA9IChyZXBvKSAtPlxuICBnaXQuc3RhZ2VkRmlsZXMocmVwbykudGhlbiAoZmlsZXMpIC0+XG4gICAgaWYgZmlsZXMubGVuZ3RoID49IDFcbiAgICAgIGdpdC5jbWQoWyctYycsICdjb2xvci51aT1mYWxzZScsICdzdGF0dXMnXSwgY3dkOiByZXBvLmdldFdvcmtpbmdEaXJlY3RvcnkoKSlcbiAgICBlbHNlXG4gICAgICBQcm9taXNlLnJlamVjdCBcIk5vdGhpbmcgdG8gY29tbWl0LlwiXG5cbmdldFRlbXBsYXRlID0gKGZpbGVQYXRoKSAtPlxuICBpZiBmaWxlUGF0aFxuICAgIHRyeVxuICAgICAgZnMucmVhZEZpbGVTeW5jKGZzLmFic29sdXRlKGZpbGVQYXRoLnRyaW0oKSkpLnRvU3RyaW5nKCkudHJpbSgpXG4gICAgY2F0Y2ggZVxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWW91ciBjb25maWd1cmVkIGNvbW1pdCB0ZW1wbGF0ZSBmaWxlIGNhbid0IGJlIGZvdW5kLlwiKVxuICBlbHNlXG4gICAgJydcblxucHJlcEZpbGUgPSAoe3N0YXR1cywgZmlsZVBhdGgsIGRpZmYsIGNvbW1lbnRDaGFyLCB0ZW1wbGF0ZX0pIC0+XG4gIGlmIGNvbW1pdEVkaXRvciA9IGF0b20ud29ya3NwYWNlLnBhbmVGb3JVUkkoZmlsZVBhdGgpPy5pdGVtRm9yVVJJKGZpbGVQYXRoKVxuICAgIHRleHQgPSBjb21taXRFZGl0b3IuZ2V0VGV4dCgpXG4gICAgaW5kZXhPZkNvbW1lbnRzID0gdGV4dC5pbmRleE9mKGNvbW1lbnRDaGFyKVxuICAgIGlmIGluZGV4T2ZDb21tZW50cyA+IDBcbiAgICAgIHRlbXBsYXRlID0gdGV4dC5zdWJzdHJpbmcoMCwgaW5kZXhPZkNvbW1lbnRzIC0gMSlcblxuICBjd2QgPSBQYXRoLmRpcm5hbWUoZmlsZVBhdGgpXG4gIHN0YXR1cyA9IHN0YXR1cy5yZXBsYWNlKC9cXHMqXFwoLipcXClcXG4vZywgXCJcXG5cIilcbiAgc3RhdHVzID0gc3RhdHVzLnRyaW0oKS5yZXBsYWNlKC9cXG4vZywgXCJcXG4je2NvbW1lbnRDaGFyfSBcIilcbiAgY29udGVudCA9XG4gICAgXCJcIlwiI3t0ZW1wbGF0ZX1cbiAgICAje2NvbW1lbnRDaGFyfSAje3NjaXNzb3JzTGluZX1cbiAgICAje2NvbW1lbnRDaGFyfSBEbyBub3QgdG91Y2ggdGhlIGxpbmUgYWJvdmUuXG4gICAgI3tjb21tZW50Q2hhcn0gRXZlcnl0aGluZyBiZWxvdyB3aWxsIGJlIHJlbW92ZWQuXG4gICAgI3tjb21tZW50Q2hhcn0gUGxlYXNlIGVudGVyIHRoZSBjb21taXQgbWVzc2FnZSBmb3IgeW91ciBjaGFuZ2VzLiBMaW5lcyBzdGFydGluZ1xuICAgICN7Y29tbWVudENoYXJ9IHdpdGggJyN7Y29tbWVudENoYXJ9JyB3aWxsIGJlIGlnbm9yZWQsIGFuZCBhbiBlbXB0eSBtZXNzYWdlIGFib3J0cyB0aGUgY29tbWl0LlxuICAgICN7Y29tbWVudENoYXJ9XG4gICAgI3tjb21tZW50Q2hhcn0gI3tzdGF0dXN9XCJcIlwiXG4gIGlmIGRpZmZcbiAgICBjb250ZW50ICs9XG4gICAgICBcIlwiXCJcXG4je2NvbW1lbnRDaGFyfVxuICAgICAgI3tkaWZmfVwiXCJcIlxuICBmcy53cml0ZUZpbGVTeW5jIGZpbGVQYXRoLCBjb250ZW50XG5cbmRlc3Ryb3lDb21taXRFZGl0b3IgPSAoZmlsZVBhdGgpIC0+XG4gIGlmIGF0b20uY29uZmlnLmdldCgnZ2l0LXBsdXMuZ2VuZXJhbC5vcGVuSW5QYW5lJylcbiAgICBhdG9tLndvcmtzcGFjZS5wYW5lRm9yVVJJKGZpbGVQYXRoKT8uZGVzdHJveSgpXG4gIGVsc2VcbiAgICBhdG9tLndvcmtzcGFjZS5wYW5lRm9yVVJJKGZpbGVQYXRoKS5pdGVtRm9yVVJJKGZpbGVQYXRoKT8uZGVzdHJveSgpXG5cbnRyaW1GaWxlID0gKGZpbGVQYXRoLCBjb21tZW50Q2hhcikgLT5cbiAgZmluZFNjaXNzb3JzTGluZSA9IChsaW5lKSAtPlxuICAgIGxpbmUuaW5jbHVkZXMoXCIje2NvbW1lbnRDaGFyfSAje3NjaXNzb3JzTGluZX1cIilcblxuICBjd2QgPSBQYXRoLmRpcm5hbWUoZmlsZVBhdGgpXG4gIGNvbnRlbnQgPSBmcy5yZWFkRmlsZVN5bmMoZnMuYWJzb2x1dGUoZmlsZVBhdGgpKS50b1N0cmluZygpXG4gIHN0YXJ0T2ZDb21tZW50cyA9IGNvbnRlbnQuaW5kZXhPZihjb250ZW50LnNwbGl0KCdcXG4nKS5maW5kKGZpbmRTY2lzc29yc0xpbmUpKVxuICBjb250ZW50ID0gaWYgc3RhcnRPZkNvbW1lbnRzID4gMCB0aGVuIGNvbnRlbnQuc3Vic3RyaW5nKDAsIHN0YXJ0T2ZDb21tZW50cykgZWxzZSBjb250ZW50XG4gIGZzLndyaXRlRmlsZVN5bmMgZmlsZVBhdGgsIGNvbnRlbnRcblxuY29tbWl0ID0gKGRpcmVjdG9yeSwgZmlsZVBhdGgpIC0+XG4gIGdpdC5jbWQoWydjb21taXQnLCBcIi0tY2xlYW51cD13aGl0ZXNwYWNlXCIsIFwiLS1maWxlPSN7ZmlsZVBhdGh9XCJdLCBjd2Q6IGRpcmVjdG9yeSlcbiAgLnRoZW4gKGRhdGEpIC0+XG4gICAgbm90aWZpZXIuYWRkU3VjY2VzcyBkYXRhXG4gICAgZGVzdHJveUNvbW1pdEVkaXRvcihmaWxlUGF0aClcbiAgICBnaXQucmVmcmVzaCgpXG4gIC5jYXRjaCAoZGF0YSkgLT5cbiAgICBub3RpZmllci5hZGRFcnJvciBkYXRhXG4gICAgZGVzdHJveUNvbW1pdEVkaXRvcihmaWxlUGF0aClcblxuY2xlYW51cCA9IChjdXJyZW50UGFuZSkgLT5cbiAgY3VycmVudFBhbmUuYWN0aXZhdGUoKSBpZiBjdXJyZW50UGFuZS5pc0FsaXZlKClcbiAgZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG5cbnNob3dGaWxlID0gKGZpbGVQYXRoKSAtPlxuICBjb21taXRFZGl0b3IgPSBhdG9tLndvcmtzcGFjZS5wYW5lRm9yVVJJKGZpbGVQYXRoKT8uaXRlbUZvclVSSShmaWxlUGF0aClcbiAgaWYgbm90IGNvbW1pdEVkaXRvclxuICAgIGlmIGF0b20uY29uZmlnLmdldCgnZ2l0LXBsdXMuZ2VuZXJhbC5vcGVuSW5QYW5lJylcbiAgICAgIHNwbGl0RGlyZWN0aW9uID0gYXRvbS5jb25maWcuZ2V0KCdnaXQtcGx1cy5nZW5lcmFsLnNwbGl0UGFuZScpXG4gICAgICBhdG9tLndvcmtzcGFjZS5nZXRDZW50ZXIoKS5nZXRBY3RpdmVQYW5lKClbXCJzcGxpdCN7c3BsaXREaXJlY3Rpb259XCJdKClcbiAgICBhdG9tLndvcmtzcGFjZS5vcGVuIGZpbGVQYXRoXG4gIGVsc2VcbiAgICBpZiBhdG9tLmNvbmZpZy5nZXQoJ2dpdC1wbHVzLmdlbmVyYWwub3BlbkluUGFuZScpXG4gICAgICBhdG9tLndvcmtzcGFjZS5wYW5lRm9yVVJJKGZpbGVQYXRoKS5hY3RpdmF0ZSgpXG4gICAgZWxzZVxuICAgICAgYXRvbS53b3Jrc3BhY2UucGFuZUZvclVSSShmaWxlUGF0aCkuYWN0aXZhdGVJdGVtRm9yVVJJKGZpbGVQYXRoKVxuICAgIFByb21pc2UucmVzb2x2ZShjb21taXRFZGl0b3IpXG5cbm1vZHVsZS5leHBvcnRzID0gKHJlcG8sIHtzdGFnZUNoYW5nZXMsIGFuZFB1c2h9PXt9KSAtPlxuICBmaWxlUGF0aCA9IFBhdGguam9pbihyZXBvLmdldFBhdGgoKSwgJ0NPTU1JVF9FRElUTVNHJylcbiAgY3VycmVudFBhbmUgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVQYW5lKClcbiAgY29tbWVudENoYXIgPSBnaXQuZ2V0Q29uZmlnKHJlcG8sICdjb3JlLmNvbW1lbnRjaGFyJykgPyAnIydcbiAgdHJ5XG4gICAgdGVtcGxhdGUgPSBnZXRUZW1wbGF0ZShnaXQuZ2V0Q29uZmlnKHJlcG8sICdjb21taXQudGVtcGxhdGUnKSlcbiAgY2F0Y2ggZVxuICAgIG5vdGlmaWVyLmFkZEVycm9yKGUubWVzc2FnZSlcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZS5tZXNzYWdlKVxuXG4gIGluaXQgPSAtPiBnZXRTdGFnZWRGaWxlcyhyZXBvKS50aGVuIChzdGF0dXMpIC0+XG4gICAgaWYgdmVyYm9zZUNvbW1pdHNFbmFibGVkKClcbiAgICAgIGFyZ3MgPSBbJ2RpZmYnLCAnLS1jb2xvcj1uZXZlcicsICctLXN0YWdlZCddXG4gICAgICBhcmdzLnB1c2ggJy0td29yZC1kaWZmJyBpZiBhdG9tLmNvbmZpZy5nZXQoJ2dpdC1wbHVzLmRpZmZzLndvcmREaWZmJylcbiAgICAgIGdpdC5jbWQoYXJncywgY3dkOiByZXBvLmdldFdvcmtpbmdEaXJlY3RvcnkoKSlcbiAgICAgIC50aGVuIChkaWZmKSAtPiBwcmVwRmlsZSB7c3RhdHVzLCBmaWxlUGF0aCwgZGlmZiwgY29tbWVudENoYXIsIHRlbXBsYXRlfVxuICAgIGVsc2VcbiAgICAgIHByZXBGaWxlIHtzdGF0dXMsIGZpbGVQYXRoLCBjb21tZW50Q2hhciwgdGVtcGxhdGV9XG4gIHN0YXJ0Q29tbWl0ID0gLT5cbiAgICBzaG93RmlsZSBmaWxlUGF0aFxuICAgIC50aGVuICh0ZXh0RWRpdG9yKSAtPlxuICAgICAgZGlzcG9zYWJsZXMuZGlzcG9zZSgpXG4gICAgICBkaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlXG4gICAgICBkaXNwb3NhYmxlcy5hZGQgdGV4dEVkaXRvci5vbkRpZFNhdmUgLT5cbiAgICAgICAgdHJpbUZpbGUoZmlsZVBhdGgsIGNvbW1lbnRDaGFyKVxuICAgICAgICBjb21taXQocmVwby5nZXRXb3JraW5nRGlyZWN0b3J5KCksIGZpbGVQYXRoKVxuICAgICAgICAudGhlbiAtPiBHaXRQdXNoKHJlcG8pIGlmIGFuZFB1c2hcbiAgICAgIGRpc3Bvc2FibGVzLmFkZCB0ZXh0RWRpdG9yLm9uRGlkRGVzdHJveSAtPiBjbGVhbnVwKGN1cnJlbnRQYW5lKVxuICAgIC5jYXRjaChub3RpZmllci5hZGRFcnJvcilcblxuICBpZiBzdGFnZUNoYW5nZXNcbiAgICBnaXQuYWRkKHJlcG8sIHVwZGF0ZTogdHJ1ZSkudGhlbihpbml0KS50aGVuKHN0YXJ0Q29tbWl0KVxuICBlbHNlXG4gICAgaW5pdCgpLnRoZW4gLT4gc3RhcnRDb21taXQoKVxuICAgIC5jYXRjaCAobWVzc2FnZSkgLT5cbiAgICAgIGlmIG1lc3NhZ2UuaW5jbHVkZXM/KCdDUkxGJylcbiAgICAgICAgc3RhcnRDb21taXQoKVxuICAgICAgZWxzZVxuICAgICAgICBub3RpZmllci5hZGRJbmZvIG1lc3NhZ2VcbiJdfQ==
