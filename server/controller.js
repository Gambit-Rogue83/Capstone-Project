require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')
const sequelize = new Sequelize(CONNECTION_STRING)

module.exports = {
    getPatients: (req, res) =>{
        sequelize.query(`
            SELECT * FROM patient;
        `).then(dbRes =>{
            res.status(200).send(dbRes[0])
        })
        .catch(err => console.err(err))
    },
    getFiles: (req, res) => {
        sequelize.query(`
            SELECT v.id, date, file, listing FROM visit AS v
            JOIN patient AS p
            ON v.patient_id = p.id
            WHERE p.id = ${req.params.id};
            `).then(dbRes =>{
                res.status(200).send(dbRes[0])
            })
            .catch(err => console.err(err))
    },
    getVisit: (req, res) =>{
        sequelize.query(`
            SELECT file, listing FROM visit
            WHERE id = ${req.query.id};
            `).then(dbRes =>{
                res.status(200).send(dbRes[0])
            })
            .catch(err => console.err(err))
    },
    chartNotes: (req, res) => {
        const {date, patient_id, file, listing} = req.body
        sequelize.query(`
            INSERT INTO visit (date, patient_id, file, listing)
            VALUES (
                NOW(),
                ${patient_id},
                '${file}',
                '${listing}'

            );
        `).then(dbRes =>{
            res.status(200).send(dbRes[0])
        })
        .catch(err => console.error(err))
    },
}
