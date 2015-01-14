function CompositeView(views) {
  this.views = views;
}

CompositeView.prototype.render = function() {
  this.views.forEach(function (each) { each.render(); });
}

