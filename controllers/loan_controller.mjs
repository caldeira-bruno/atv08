import Loan from "../models/loan.mjs";

const LoanController = Object.create(Object.prototype);

LoanController.new = async (req, res) => {
    const created = await Loan.create({
        ClientId: req.body.ClientId,
        valor: req.body.valor,
        inicio: req.body.inicio,
        fim: req.body.fim
    });
    res.send(created);
};

LoanController.one = async (req, res) => {
    const l = await Loan.findOne({
        where: { id: req.params.id },
    });
    res.json(l);
};

LoanController.all = async (req, res) => {
    const all = await Loan.findAll();
    const ret = [];
    for (let i = 0; i < all.length; i++) {
        ret.push({
            ...all[i].dataValues,
            client: await all[i].getClient()
        });     
    }
    res.json(ret);
};

LoanController.edit = async (req, res) => {
    const l = await Loan.findOne({
        where: { id: req.body.id }
    });
    l.ClientId = req.body.ClientId;
    l.valor = req.body.valor;
    l.inicio = req.body.inicio;
    l.fim = req.body.fim;
    await l.save();
    res.json(l);
};

LoanController.remove = async (req, res) => {
    const l = await Loan.findOne({
        where: { id: req.body.id }
    });
    await l.destroy();
    res.json(l);
};

export default LoanController;