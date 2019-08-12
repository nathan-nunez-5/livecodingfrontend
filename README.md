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
- [x] link 3 is broken
- [x] popup window when synthesis fails
- [x] edit survey description of live programming
- [x] fix cursor reset- [x] be specific in last question, question 4
- [x] be specific in last question, question 4
- [x] write a short description in the qualtrics
- [x] codemirror integration
- [x] format examples into a table. or just format them period
- [x] add equal sign input reeval
- [x] add flavor text to problem descritions
- [x] change the survey to make it have equals sign instead of arrow
- [x] make it clear that you have to go back to the survey when its done
- [x] add a link to the bottom of problems to close window
- [x] add button to approach did you find a solution
- [x] synthesis fires on enter key pressed
- [x] (fixed) chrome doesn't fire with = synthesis
- [x] make language for alert more clear
- [x] get rid of = null for empty line
- [x] when you in pbe mode you can't do reeeval
- [x] detail motivations for each question
- [x] reeval should happen when examples change
- [x] give alerts only when can't run and when pbe window is in focus (when function reeeval doesn't work don't send an alert)
- [x] Add 5th problem/add one question and see what you can do with synthesis
- [x] add extra exampls p2
- [x] exit button [not doable in firefox] see: https://developer.mozilla.org/en-US/docs/Web/API/Window/close#Closing_the_current_window



TODOS:
- [ ] change absolute value first question tutorial
- [ ] csv log file: timestamp, window, what changed, eval/synth/, failure?
- [ ] change the 3-length string -> lie the pundefined problem
- [ ] make sure we logging behavior of window usage***
- [ ] regular log file
- [ ] init funciton when in pbe window and not inited in live

- [ ] improve tutorial (make limitations for PBE clear)
- [ ] fix that when you have an undefined example it takes two loads for it to get back into being live

- [ ] look at research questions again

- [ ] box implementation
