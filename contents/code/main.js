/**
 *Cheap little script to provide Quake-style quick window toggle supprt
 **/
function toggleMaximized(client) {
  var maxBounds = workspace.clientArea(KWin.MaximizeArea, workspace.activeScreen, workspace.currentDesktop);

  client.desktop = workspace.currentDesktop;
  client.geometry = maxBounds;
  client.noBorder = true;

  if(client.minimized) {
    client.minimized       = false;
    client.keepAbove       = true;
    client.onAllDesktops   = true;
    workspace.activeClient = client;
  } else {
    client.keepAbove = false;
    client.minimized = true;
  }

  client.skipSwitcher  = true;
  client.skipPager     = true;
  client.skipTaskbar   = true;
}

function shortcutHook() {
  if (self.shimmerer == null) {
    var clients = workspace.clientList();
    for (var i=0; i<clients.length; i++) {
      var client = clients[i];

      //Don't set a stale client as shimmerer
      if (client != self.oldshimmerer) {
          if(client.resourceName == target) {
            self.shimmerer = client;
          }
        }
    }
  }
  if (self.shimmerer != null) {
    toggleMaximized(shimmerer);
  }
}

var target = readConfig("shimmerApp", "terminator");
this.shimmerer = null;
this.oldshimmerer = null;
var self = this;
shortcutHook();

workspace.clientAdded.connect(function(client) {
  if (self.shimmerer == null) {
    if (client.resourceName == target) {
      self.shimmerer = client;
      toggleMaximized(self.shimmerer);
    }
  }
});
workspace.clientRemoved.connect(function(client) {
  if (client == self.shimmerer) {
    self.oldshimmerer = client;
    self.shimmerer = null;
    shortcutHook();
  }
});

registerShortcut("Quaker", "Quake-style app expose", "F12", shortcutHook);
