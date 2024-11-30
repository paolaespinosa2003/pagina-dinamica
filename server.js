const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/habits', { useNewUrlParser: true, useUnifiedTopology: true });

// Esquema y modelo
const habitSchema = new mongoose.Schema({
    name: String,
    frequency: String,
    startDate: Date
});
const Habit = mongoose.model('Habit', habitSchema);

// Rutas
app.post('/add-habit', async (req, res) => {
    const { name, frequency, startDate } = req.body;
    if (!name || !frequency || !startDate) {
        return res.status(400).send('Faltan campos obligatorios.');
    }
    const habit = new Habit({ name, frequency, startDate });
    await habit.save();
    res.status(201).send('Hábito agregado exitosamente.');
});

app.get('/habits', async (req, res) => {
    const habits = await Habit.find();
    res.json(habits);
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
