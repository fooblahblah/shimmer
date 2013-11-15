#Shimmer#

KDE KWin scipt to provide generic Quake-style terminal support for any app.

Currently, the script is hard-coded for the Terminator app, but any app can be specified
in content/code/main.js. Once Shimmer is installed the key binding can be changed in the
Global Shortcuts, KWin section.  Look for "Quake-style app expose".


#Installing#

1. git clone https://github.com/fooblahblah/shimmer.git
1. cd shimmer
1. plasmapkg --type kwinscript -i .
1. Settings, Window Behavior, KWin Scripts. Ensure "Shimmer" is enabled.
1. Logout and login to KDE
1. Profit

#Issues#

* Minimize app on startup (optional I guess)
* Add configuration someplace
* ???
