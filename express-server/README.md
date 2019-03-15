# AUTOEXAM-CLI

## Usage

### Development

1. To run the server locally for development, you first need a config.json. Copy config-template.json to config.json and modify it to suit your needs.
2. Run the server with this command: `node . ./config.json`

### Deployment

1. To deploy the server permanently, you first need a config.json in a global place. Copy config.template.json to `/etc/autoexam/config.json`, and modify it to suit your needs. The recommended global save directory is `/var/autoexam`
2. Install the server to systemctl using the Makefile: `sudo make install-server`

#### Things to note ####

- The installation does not look at the repository at all. It can be deleted or modified without bothering the server.
- To update the server after an update, run `sudo make reinstall-server`.
- To uninstall the server, run `sudo make uninstall-server`.
- The server can be controlled with systemctl with the unit `autoexamd` (or `autoexamd.service`).
  - The server status can be viewed with `sudo systemctl status autoexamd`
  - The server can be stopped with `sudo systemctl stop autoexamd`
  - The server can be started with `sudo systemctl start autoexamd`
  - The server output can be viewed with `sudo journalctl -u autoexamd`
- The server can manually be run with the command `autoexamd`.
