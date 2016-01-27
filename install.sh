#!/bin/bash

# This file is part of the Zimbra Bulk Reply Zimlet project.
# Copyright (C) 2016  Barry de Graaff
#
# Bugs and feedback: https://github.com/Zimbra-Community/bulkreply-zimlet/issues
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 2 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see http://www.gnu.org/licenses/.


# This script prompt you where you want to install this zimlet

zimlet_name="tk_barrydegraaff_bulkreply_zimlet"
zimlet_directory="/opt/zimbra/zimlets-deployed/_dev"
temp_folder="/tmp"

echo "We are about to install the Zimlet, do you want to deploy it as a developer ? (y/N)"
read answer
if [[ $answer =~ ^(yes|y) ]]
        then
        if [ -d "$zimlet_directory/$zimlet_name" ]; then
                echo "Zimlet already installed. Deleting old version..."
                rm -Rf $zimlet_directory/$zimlet_name/
                echo "Copying the zimlet"
                cp -rv $zimlet_name/ $zimlet_directory/ > /dev/null 2>&1
                su zimbra -c "/opt/zimbra/bin/zmprov fc all"
                echo "Installation in the developer folder sucessfull"
        elif [ -d "$zimlet_directory" ]; then
                echo "Copying the zimlet"
                cp -rv $zimlet_name/ $zimlet_directory/ > /dev/null 2>&1
                su zimbra -c "/opt/zimbra/bin/zmprov fc all"
                echo "Installation in the developer folder sucessfull"
        elif [ ! -d "$zimlet_directory" ]; then
                echo "The _dev directory seems to be absent. Creating..."
                mkdir $zimlet_directory
                echo "Copying the zimlet"
                cp -rv $zimlet_name/ $zimlet_directory/ > /dev/null 2>&1
                su zimbra -c "/opt/zimbra/bin/zmprov fc all"
                echo "Installation in the developer folder sucessfull"
        fi
else
        if ! [ -x "$(command -v zip)" ]; then
                echo 'zip command needs to be installed.' >&2
        else
        zip -q --junk-paths -r $temp_folder/$zimlet_name.zip $zimlet_name/
        su - zimbra -c "zmzimletctl deploy $temp_folder/$zimlet_name.zip > /dev/null 2>&1"
        su zimbra -c "/opt/zimbra/bin/zmprov fc all > /dev/null 2>&1"
        rm $temp_folder/$zimlet_name.zip
        echo "Installation sucessfull"
        fi
fi
