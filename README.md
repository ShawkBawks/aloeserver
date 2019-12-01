# aloeserver
## Raspberry Pi Installs

## Node, npm, pm2, git, vim, express, express generator, axios, dotenv, ipstack, jade, Morgan, onoff, request


## Headless Set Up
When initially setting up the Raspberry Pi Zero W you will need to install Rasbian Lite on to your SD Card.  You will need to do this process on your laptop/desktop and eventually transfer the SD card to your Raspberry Pi. 
If you are unsure of how to do set everything up simply follow these steps:
- Visit https://www.raspberrypi.org/downloads/raspbian
- Download the lite version and unzip the file and make note of the location.
- Plug your SD card into your computer and you will need to unmount it. Do so by opening your terminal/console and enter ‘diskutil unmountDisk *SD Name*
- Next you will need to burn raspbian to the card. This can be done by entering ‘sudo dd bs=1m if=~/Downloads/2017-07-05-raspbian-jessie-lite.img of=/dev/disk2’. It will change based off of where your file is located and what your drive is called.  For myself it was in my Downloads folder, followed by the file name, and then my drive was /dev/disk2
- You will need to enable SSH on the raspbian so you will need to create an empty file.  This is done by entering ‘touch /Volumes/boot/ssh’ into the terminal
- You will need to set up your network information so the Raspberry Pi can access your Wi-Fi network. Create another empty file that will hold your network information by entering ‘touch /Volumes/boot/wpa_supplicant.conf’.
- Next you will need to set up the information inside of the file.  You can paste the following code and adjust for your country, network name, and network password.  
			country=US
			ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
			update_config=1

			network={
   			 ssid="NETWORK-NAME"
   			 psk="NETWORK-PASSWORD"
			}
- Now you are ready to eject the SD card from your computer by typing ‘diskutil eject *SD Name*’

You will now want to boot the Raspberry Pi by following these steps:
- Plug the SD Card into the Raspberry Pi
- Plug a Micro-USB cable in to the Power port, which is the USB port closest to the end of the board
- Give it some time to boot, this can take several minutes on the first run
- After everything is finished booting you will need to open a terminal on your computer and SSH into your Raspberry Pi
- Open a terminal and run the following commands
    - ssh-keygen -R raspberry.local
    - ssh pi@raspberrypi.local
- If the Pi doesn’t respond you can run the second command again

*The default password will be ‘raspberry’*
You should change the network name and password once you can access the Raspberry over the Wi-Fi
- Type ‘sudo raspi-config’ and select the options for changing the hostname and password
- Also, it would be a good idea to expand the file system in the Advanced options
- Upon exiting the settings you should Reboot
Update your Pi once connected to the Wi-Fi network:
- sudo apt-get update -y
- sudo apt-get upgrade -y

Done! Your Pi is now ready to install the necessary package for automating your watering system!


In order to set up the code, ssh into the Raspberry Pi and enter the following
- git clone git://github.com/ShawkBawks/aloeserver
- After the cloning process is complete you will need to perform install the necessary dependancies by entering ‘sudo npm install’ in the console


Once that has been set up you can enable ‘pm2’ to ensure that if your Raspberry Pi every resets/restarts it will automatically run your server. This way your plants will not have to go without watering just because the Raspberry Pi restarted abruptly.
- Enter ‘pm2 startup’ and copy and paste the lines it gives you back in to the terminal
- Next enter ‘pm2 start sensorControl.js’
- And finally ‘pm2 save’

You should now have a server that will stay up and running provided you have power to your Raspberry Pi!

In order to access your pi to change any documents you will need to run ‘ssh pi@raspberry.local’ and open files using Vim or Nano(These can be overwhelming if you don’t know what to do, and it is best if you read on some documentation so you can properly traverse and edit files as necessary)
Shutdown the Pi safely via the command ‘ssh shutdown -h now’





