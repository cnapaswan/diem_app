# DIEM

We all know life is short, days were spent and some more to go on. 

  **launch it [here](https://cnapaswan.github.io/diem_app/)**

I build this app because the idea means a lot to me personally and I hope it could mean something to you too.The app allow user to see average days they might have left in their life, the calculation based on country of origin, gender and current age. 

The name ‘DIEM’ was inspired by the famous latin aphorism “Carpe diem” - seize the day. It perfectly represents my idea and the functionality of this app

# Tech

- ReactJS
- CSS
- HTML

## Based on

1. Bundler: [Webpack](http://webpack.github.io/docs/), [Babel](https://babeljs.io)
2. Language: [ES2015](https://babeljs.io/docs/learn-es2015/)
3. Library: [React](https://reactjs.org/), [Sass](http://sass-lang.com/), [Mocha](https://mochajs.org)
... ##backend app  **DIEM API [here](https://github.com/cnapaswan/diem_api)**

## getting started locally
1. clone this repo to your local
2. CLI ```cd <folder_name>```
2. CLI ```npm install```
4. CLI ```npm start``` 

## Usage

1. select country of origin / gender / date of Birth
// developer trick ! after you click get days, right click "inspect" to see number of days left in console.
// this is special for you because I intended not to show user with exact number.
// "Hi, you have 18,128 days left" might not sounds so friendly for everyone.

2. after clicked "get days" it will switch to bubble board that show days you have left in bubble format

3. The register board is layered on top of it for you to fill in email and password

4. then it will lead you to login board

5. Then back to bubble board, you can color the glowing bubble which represent today according to your mood, you will get new glowing bubble ever day

6. there are 4 options to display bubble
    - lifetime // see all future ahead
    - year time // see how your last 365 days felt like 
    - month time // see how you last 30 days felt like
    - week time // see how you last 7 days felt like
    

## License

MIT © [cnapaswan](https://github.com/cnapaswan)