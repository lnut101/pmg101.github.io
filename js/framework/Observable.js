function Observable(value) {
  this.value = value;
  this._onChanges = [];
}

Observable.prototype.get = function() {
  return this.value;
};

Observable.prototype.set = function(value) {
  this.value = value;
  this._onChanges.forEach(function (each) { each(); });
};

Observable.prototype.onChange = function(onChange) {
  this._onChanges.push(onChange);
};

