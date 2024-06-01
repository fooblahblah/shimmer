/**
 *Cheap little script to provide Quake-style quick window toggle support
 **/

const targetScreen = 0; // use workspace.activeScreen to always show on the active screen
const minimizeOnBlur = true;

function toggleMaximized(client) {
    var maxBounds = workspace.clientArea(KWin.MaximizeArea, targetScreen, workspace.currentDesktop);

    client.desktop = workspace.currentDesktop;
    client.geometry = maxBounds;

    if (client.minimized) {
        client.minimized = false;
        client.keepAbove = true;
        client.onAllDesktops = true;
        workspace.activeWindow = client;
    } else {
        closeWindow(client);
    }

    client.skipSwitcher = true;
    client.skipPager = true;
    client.skipTaskbar = true;
}

function closeWindow(client) {
    client.keepAbove = false;
    client.minimized = true;
}

function shortcutHook() {
    let client = getWindow();

    if (client) {
        toggleMaximized(client);
    }
}

function getWindow() {
    let clients = workspace.windowList();

    for (let i=0; i < clients.length; i++) {
        let client = clients[i];

        if (client.resourceClass === target) {
            return client;
        }
    }
    return null;
}

function onBlur(client) {
    if (workspace.activeWindow && workspace.activeWindow.resourceClass !== target && minimizeOnBlur) {
        let targetClient = getWindow();
        if (targetClient) {
            closeWindow(targetClient);
        }
    }
}
workspace.windowActivated.connect(onBlur);

var target = "terminator";

registerShortcut("Shimmer", "Quake-style app expose", "F12", shortcutHook);
