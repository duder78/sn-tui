## sn-tui
===============================================

A custom component based on the open-source TUI Image Editor using ServiceNow's SNC CLI and ui-component extension.  Modifications allow the user to browse, search and sort images from the db_images table on any instance the component is installed.

[NOW Experience Framework](https://developer.servicenow.com/dev.do#!/reference/now-experience/sandiego/ui-framework/getting-started/introduction)
[NOW Experience Components](https://developer.servicenow.com/dev.do#!/reference/now-experience/components)
[TUI Image Editor](https://ui.toast.com/tui-image-editor)

## Installation Instructions
If you just want to install the component without modifying:  check out compiled components' Update set on SN Share

1) Clone or Unzip
 
2) Run 'npm install' in root directory
 
3) Assuming SNC CLI is installed along with ui-component extension: Run 'snc ui-component develop' to run locally

##  GOTCHAS
- there are known issues with node-canvas on M1-based macs.  If you get errors that prevent installation of dependencies follow this link for details on how to get around it: https://github.com/Automattic/node-canvas/wiki#installation-guides.  It's a pain but can be worked around.
