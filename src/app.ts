import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { ICounterReq, ICounter } from './model/flashcards';

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.get('/', cors(), (_req, res) => {
    const vocabFile = JSON.parse(fs.readFileSync(path.resolve(__dirname, './flashcards/vocab.json'), 'utf8'));
    res.json(vocabFile);
});

app.post('/vocab', cors(), (req, res) => {
    const vocabList: ICounter[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, './flashcards/vocab.json'), 'utf8'));
    console.log(vocabList);
    console.log(req.body);
    const results = (req.body as ICounterReq).results;
    const response: ICounter[] = [];
    results.forEach((a) => {
        const word = vocabList.find((v) => v.Id === a.Id);
        response.push(word);
        if (word) {
            if (a.Correct) {
                word.RightCounter += 1;
            } else {
                word.WrongCounter += 1;
            }
        }
    });

    fs.writeFileSync('src/flashcards/vocab.json', JSON.stringify(vocabList, undefined, 4));
    fs.writeFileSync(path.resolve(__dirname, './flashcards/vocab.json'), JSON.stringify(vocabList, undefined, 4));
    res.send({response});
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});