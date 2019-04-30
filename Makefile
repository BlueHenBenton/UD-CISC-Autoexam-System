.PHONY: install-server
install-server:
	npm install -g
	cp autoexamd.service /lib/systemd/system
	systemctl daemon-reload
	systemctl enable autoexamd.service
	systemctl start autoexamd.service

.PHONY: uninstall-server
uninstall-server:
	-systemctl stop autoexamd.service
	-systemctl disable autoexamd.service
	rm -f /lib/systemd/system/autoexamd.service
	-systemctl daemon-reload
	npm uninstall -g

.PHONY: reinstall-server
reinstall-server: uninstall-server install-server