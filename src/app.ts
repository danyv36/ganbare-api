import express from 'express';
import path from 'path';
import fs from 'fs';
import { ICounterReq, ICounter } from './model/flashcards';
// import bodyParser from 'body-parser';

const app = express();
const port = 3000;
app.use(express.json());
// app.use(bodyParser);

app.get('/', (req, res) => {
    const vocabFile = JSON.parse(fs.readFileSync(path.resolve(__dirname, './flashcards/vocab.json'), 'utf8'));
    res.json(vocabFile);
});

app.post('/vocab', (req, res) => {
    const vocabList: ICounter[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, './flashcards/vocab.json'), 'utf8'));
    console.log(vocabList);
    const wrongAnswers = (req.body as ICounterReq).wrong;
    wrongAnswers.forEach((a) => {
        const word = vocabList.find((v) => v.Id === a);
        if (word) {
            word.WrongCounter += 1;
        }
    });

    const rightAnswers = (req.body as ICounterReq).right;
    rightAnswers.forEach((a) => {
        const word = vocabList.find((v) => v.Id === a);
        if (word) {
            word.RightCounter += 1;
        }
    });

    fs.writeFileSync('src/flashcards/vocab.json', JSON.stringify(vocabList, undefined, 4));
    fs.writeFileSync(path.resolve(__dirname, './flashcards/vocab.json'), JSON.stringify(vocabList, undefined, 4));
    res.send(vocabList);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});