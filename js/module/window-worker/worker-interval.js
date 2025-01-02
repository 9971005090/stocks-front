self.onmessage = function( e ) {
    setInterval(function() {postMessage(null)}, e.data);
};