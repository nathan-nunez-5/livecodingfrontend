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

# TODOs

progress:
- [x] live is running on server
- [x] cookies added
- [x] server function
- [x] nohup server up
- [x] open link in new window in survey
- [x] fix middle question in survey
- [x] loading code from files in server
- [x] bootstrap implementation



TODOS:
- [ ] fix that when you have an undefined example it takes two loads for it to get back into being live
- [ ] codemirror integration
- [ ] integrate griffins ideas into examples
- [ ] seperate interface helpers code out of app.js
- [ ] sort TODOS
- [ ] look into lines change in example window
- [ ] synthesis fires every time its well formatted
- [ ] something to think about - get function to be made from just up_examples
- [ ] get some message when synthesis engine couldn't do it
- [ ] record js evaluations
- [ ] easy pbe
- [ ] clean up code
- [ ] clean up how code is saved onto tmp folder

Pilot TODOS:
- [x] edit survey description of live programming
- [ ] change the survey to make it have equals sign instead o arrow
- [x] fix cursor reset
- [ ] make it clear that you have to go back to the survey when its done
- [ ] format examples into a table. or just format them period
- [x] link 3 is broken *
- [x] popup window when synthesis fails *
- [ ] be specific in last question, question 4 *
- [ ] stop revaluation when new example is introduced -> shortcut to synthesis instead
- [ ] write a short description in the qualtrics *
- [ ] add a link to the bottom of problems to close window
- [ ] add flavor text to problem descritions



we saw that he used a combination of both in the last question



Long term TODOS:
- [ ] lorem
