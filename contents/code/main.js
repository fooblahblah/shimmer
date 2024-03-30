/**
 *Cheap little script to provide Quake-style quick window toggle supprt
 **/
function toggleMaximized(client) {
    var maxBounds = workspace.clientArea(KWin.MaximizeArea, workspace.activeScreen, workspace.currentDesktop);

    client.desktop = workspace.currentDesktop;
    client.geometry = maxBounds;

    if (client.minimized) {
        client.minimized = false;
        client.keepAbove = true;
        client.onAllDesktops = true;
        workspace.activeWindow = client;
    } else {
        client.keepAbove = false;
        client.minimized = true;
    }

    client.skipSwitcher = true;
    client.skipPager = true;
    client.skipTaskbar = true;
}

function shortcutHook() {
    var clients = workspace.windowList();

    for (var i = 0; i < clients.length; i++) {
        var client = clients[i];

        if (client.resourceClass === target) {
            toggleMaximized(client);
        }
    }
}

var target = "terminator";

registerShortcut("Shimmer", "Quake-style app expose", "F12", shortcutHook);
