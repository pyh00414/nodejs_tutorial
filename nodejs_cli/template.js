#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const type = process.argv[2];
const name = process.argv[3];
const directory = process.argv[4] || ".";

const htmlTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta chart="utf-8" />
  <title>Template</title>
</head>
<body>
  <h1>Hello</h1>
  <p>CLI</p>
</body>
</html>`;

const routerTemplate = `const express = require('express');
const router = express.Router();
 
router.get('/', (req, res, next) => {
   try {
     res.send('ok');
   } catch (error) {
     console.error(error);
     next(error);
   }
});
 
module.exports = router;`;

const exist = dir => {
  try {
    fs.accessSync(
      dir,
      fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK
    );
    return true;
  } catch (e) {
    return false;
  }
};

const mkdirp = dir => {
  const dirname = path
    .relative(".", path.normalize(dir))
    .split(path.sep)
    .filter(p => !!p);
  dirname.forEach((d, idx) => {
    const pathBuilder = dirname.slice(0, idx + 1).join(path.sep);
    if (!exist(pathBuilder)) {
      fs.mkdirSync(pathBuilder);
    }
  });
};

const makeTemplate = () => {
  mkdirp(directory);
  if (type === "html") {
    const pathToFile = path.join(directory, `${name}.html`);
    if (exist(pathToFile)) {
      console.error("이미 존재하는 파일입니다");
    } else {
      fs.writeFileSync(pathToFile, htmlTemplate);
      console.log(pathToFile, "생성완료");
    }
  } else if (type === "express-router") {
    const pathToFile = path.join(directory, `${name}.js`);
    if (exist(pathToFile)) {
      console.error("이미 존재하는 파일입니다");
    } else {
      fs.writeFileSync(pathToFile, routerTemplate);
      console.log(pathToFile, "생성완료");
    }
  } else {
    console.log("html,router 둘 중 하나만 입력하세요");
  }
};
const programe = () => {
  if (!type || !name) {
    console.log("타입이나 이름을 입력해 주세요");
  } else {
    makeTemplate();
  }
};
programe();
