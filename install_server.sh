#!/bin/bash

INSTALL_DIRECTORY=/etc/autoexam

# Make sure script is run as root
if [[ $EUID -ne 0 ]]
then
	echo "Please run the script as root"
	exit 1
fi

# Boolean variables
run_type=0

# Search Flags:
#	-r: reinstalls the server
# 	-u: uninstalls the server
#	If no flags are found, installs the server

while getopts :ru opt; do
	case $opt in
		r) run_type=1 ;;
		u) run_type=2 ;;
	esac
done

# Install the server
if [ $run_type -eq 0 ]
then
	mkdir -p $INSTALL_DIRECTORY
	cp ./config-template.json $INSTALL_DIRECTORY/config.json
	make install-server
fi

# Reinstall the server
if [ $run_type -eq 1 ]
then
	cp ./config-template.json $INSTALL_DIRECTORY/config.json
	make reinstall-server
fi

# Uninstall the server
if [ $run_type -eq 2 ]
then 
	rm -rf $INSTALL_DIRECTORY
	make uninstall-server
fi
