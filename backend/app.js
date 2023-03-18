const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Strings = require('./models/postSchema');
const Stats = require('./models/statsSchema');


const app = express();

app.use(bodyParser.json());

app.post('/sequence', async (req, res) => {
  console.log(req.body)

  const listaStrings = req.body.letters

  const tamanhoString = listaStrings.length;


  // Verifica se todas as strings possuem o mesmo tamanho e apenas caracteres válidos

  if (!listaStrings.every(str => /^[UBDH]+$/i.test(str))) {
    return res.status(400).send('A lista contém caracteres inválidos!');
  }
  if (listaStrings.some(str => str.length !== tamanhoString)) {
    return res.status(400).send('As strings não possuem o mesmo tamanho!');
  }

  const existeSequencia = await Strings.findOne({ letters: listaStrings });
  if (existeSequencia) {
    let message = {
      message: 'Sequencia Já Existe no Banco de Dados!',
      sequencia: existeSequencia
    }
    return res.status(400).send(message);
  }

  // Verifica se existem 2 sequências de 4 letras iguais nas três dimensões
  const n = listaStrings.length;
  const sequences = [];

  // Verifica sequências horizontais
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - 3; j++) {
      let sequence = listaStrings[i].slice(j, j + 4);
      if (/^(.)\1{3}$/.test(sequence)) {
        sequences.push(sequence);
      }
    }
  }

  // Verifica sequências verticais
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - 3; j++) {
      let sequence = listaStrings[j][i] + listaStrings[j + 1][i] + listaStrings[j + 2][i] + listaStrings[j + 3][i];
      if (/^(.)\1{3}$/.test(sequence)) {
        sequences.push(sequence);
      }
    }
  }

  // Verifica sequências diagonais
  for (let i = 0; i < n - 3; i++) {
    for (let j = 0; j < n - 3; j++) {
      let sequence1 = listaStrings[i][j] + listaStrings[i + 1][j + 1] + listaStrings[i + 2][j + 2] + listaStrings[i + 3][j + 3];
      let sequence2 = listaStrings[i + 3][j] + listaStrings[i + 2][j + 1] + listaStrings[i + 1][j + 2] + listaStrings[i][j + 3];
      if (/^(.)\1{3}$/.test(sequence1)) {
        sequences.push(sequence1);
      }
      if (/^(.)\1{3}$/.test(sequence2)) {
        sequences.push(sequence2);
      }
    }
  }

  const is_valid = n >= 4 && listaStrings.every(str => str.length === n) && sequences.length >= 2;

  try {
    const strings = new Strings({
      letters: listaStrings,
      is_valid
    });
    await strings.save();
    return res.json({ is_valid: strings.is_valid });
  } catch (err) {
    return res.status(500).send('Erro ao salvar sequência no banco de dados!');
  }

});

app.get('/stats', async (req, res) => {

  const count_valid = await Strings.find({ is_valid: true })
  const count_invalid = await Strings.find({ is_valid: false })
  const total = await Strings.find({})
  const ratio = (count_valid.length / total.length).toFixed(2)

  const stats = new Stats({
    count_valid: count_valid.length,
    count_invalid: count_invalid.length,
    ratio
  });

  res.send(stats)

})

//Get para mostrar todas as sequências
app.get('/', async function (req, res) {
  try {
    var strings = await Strings.find({})
    res.send(strings)
  } catch (error) {
    res.send(error)
  }
})

mongoose.connect(
  `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/course-goals?authSource=admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error('FAILED TO CONNECT TO MONGODB');
      console.error(err);
    } else {
      console.log('CONNECTED TO MONGODB!!');
      app.listen(process.env.PORT);
    }
  }
);
