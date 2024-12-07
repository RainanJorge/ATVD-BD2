import express from 'express';
import cors from 'cors';
import router from './routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.get('/', (req, res) => {
    res.send('Servidor on');
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Conectado à porta ${PORT}`);
});