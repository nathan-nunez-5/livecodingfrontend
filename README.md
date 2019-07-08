# livecodingfrontend
Web interface for live coding

a note:
make sure npm has version ^6.10.0

# installation

We need CVC4 (a sygus solver). instructions and steps taken from https://github.com/santolucito/liveprogramming/blob/master/README.md

```
wget http://cvc4.cs.stanford.edu/downloads/builds/x86_64-linux-opt/cvc4-1.6-x86_64-linux-opt
mv cvc4-1.6-x86_64-linux-opt cvc4
chmod u+x cvc4
mv cvc4 /usr/bin/
```

then be sure to have a high enough npm version (^6.10.0) (alternatives is to get the latest stable release instead of the latest release)

```
sudo npm install -g npm@latest
```

in the case of Unhandled rejection Error: EACCES: permission denied


"Restore ownership of the user's npm related folders, to the current user, like this:" -srAxi (see: https://stackoverflow.com/questions/50639690/on-npm-install-unhandled-rejection-error-eacces-permission-denied)


```
sudo chown -R $USER:$GROUP ~/.npm
sudo chown -R $USER:$GROUP ~/.config
```


now clone the repo and be sure to update npm packages
```
 npm update
```
