function CSInterface() {}
CSInterface.prototype.evalScript = function(e, n) {
    window.__adobe_cep__.evalScript(e, n || function() {})
};
