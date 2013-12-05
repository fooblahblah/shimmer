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
w  } else {
    client.keepAbove = false;
    client.minimized = true;
  }

  client.skipSwitcher  = true;
  client.skipPager     = true;
  client.skipTaskbar   = true;
}

function shortcutHook() {
  var clients = workspace.clientList();

  for (var i=0; i<clients.length; i++) {
    var client = clients[i];

    if(client.resourceName == target) {
      toggleMaximized(client);
    }
  }
}

var target = readConfig("shimmerApp", "terminator");

registerShortcut("Quaker", "Quake-style app expose", "F12", shortcutHook);
