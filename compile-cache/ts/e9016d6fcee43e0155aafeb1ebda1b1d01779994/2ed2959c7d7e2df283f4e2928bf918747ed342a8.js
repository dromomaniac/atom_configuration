var i = 1;
var run = setInterval(function () {
    console.log("line " + i);
    i++;
    if (i == 20) {
        stop();
    }
}, 1000);
function stop() {
    clearInterval(run);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL2V2YW5oZW5kcml4MS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvZXhhbXBsZXMvbG9uZ3J1bi50cyIsInNvdXJjZXMiOlsiL1VzZXJzL2V2YW5oZW5kcml4MS8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvZXhhbXBsZXMvbG9uZ3J1bi50cyJdLCJuYW1lcyI6WyJzdG9wIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLENBQUMsR0FBVyxDQUFDLENBQUM7QUFDbEIsSUFBSSxHQUFHLEdBQUcsV0FBVyxDQUFDO0lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3pCLENBQUMsRUFBRSxDQUFDO0lBQ0osRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDWixJQUFJLEVBQUUsQ0FBQztJQUNULENBQUM7QUFDSCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDVCxTQUFTLElBQUk7SUFDWEEsYUFBYUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7QUFDckJBLENBQUNBIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGk6IG51bWJlciA9IDE7XG52YXIgcnVuID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gIGNvbnNvbGUubG9nKFwibGluZSBcIiArIGkpO1xuICBpKys7XG4gIGlmIChpID09IDIwKSB7XG4gICAgc3RvcCgpO1xuICB9XG59LCAxMDAwKTtcbmZ1bmN0aW9uIHN0b3AoKTogdm9pZCB7XG4gIGNsZWFySW50ZXJ2YWwocnVuKTtcbn1cbiJdfQ==
//# sourceURL=/Users/evanhendrix1/.atom/packages/script/examples/longrun.ts
