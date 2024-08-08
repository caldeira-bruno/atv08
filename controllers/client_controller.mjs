import Client from "../models/client.mjs";

const ClientController = {
    "new": async (req, res) => {
        //console.log(req.body);
        const created = await Client.create(
            {
                nome: req.body.nome,
                profissao: req.body.profissao,
                email: req.body.email,
                telefone: req.body.telefone,
                endereco: req.body.endereco
            });
        res.send(created);

    },
    "one": async (req, res) => {
        const p = await Client.findOne({
            where: {id: req.params.id}
        });
        res.json(p);       
    },
    "all": async (req, res) => {
        res.json(await Client.findAll());
    },
    "edit": async (req, res) => {
        const p = await Client.findOne({
            where: {id: req.body.id}
        });
        p.nome = req.body.nome;
        p.profissao = req.body.profissao;
        p.email = req.body.email;
        p.telefone = req.body.telefone;
        p.endereco = req.body.endereco;
        await p.save();
        res.json(p);
    },
    "remove": async (req, res) => {
        const p = await Client.findOne({
            where: {id: req.body.id}
        });
        await p.destroy();
        res.json(p);
    }
};

export default ClientController;