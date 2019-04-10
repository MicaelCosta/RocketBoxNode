const Box = require('../models/Box');
const File = require('../models/File');

class FileController {

    //Cria um novo File
    async store(req, res){
        const box = await Box.findById(req.params.id);

        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key,
        });

        box.files.push(file);

        await box.save();

        //Comunicação real time
        req.io.sockets.in(box._id).emit('file', file);

        return res.json(file);
    }
}

//Necessario o new para returnar instancia da classe
module.exports = new FileController();