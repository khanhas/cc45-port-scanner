#Coding Challenge #45 - Port Scanner
https://codingchallenges.substack.com/p/coding-challenge-45-port-scanner

## Requirements
- Node.JS 18

## Features
- Scan hosts and ports
    - `npm start host=localhost`
    - `npm start port=8080`
    - `npm start host=localhost,scanme.nmap.org port=22,80`
- Scan concurrently
    -  `npm start pool=10`