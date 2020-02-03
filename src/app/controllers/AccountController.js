/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';
import Account from '../models/Account';

class AccountController {
  async index(req, res) {
    const accountList = await Account.findAll();

    return res.status(200).json(accountList);
  }

  async show(req, res) {
    const accountDetail = await Account.findByPk(req.params.id);

    if (accountDetail === null) {
      return res.status(404).json({ error: "Account don't exists" });
    }

    return res.status(200).json(accountDetail);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      balance: Yup.number().required(),
      account_type: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, name, balance, account_type } = await Account.create(req.body);

    return res.json({
      id,
      name,
      balance,
      account_type,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      amount: Yup.string(),
      balance: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const account = await Account.findByPk(req.params.id);

    if (req.body.name !== account.name) {
      const accountExists = await Account.findOne({
        where: { name: req.body.name },
      });

      if (accountExists) {
        return res.status(400).json({ error: 'Account already exists' });
      }
    }

    await account.update(req.body);

    const { id, name, category } = await Account.findByPk(req.name);

    return res.json({
      id,
      name,
      category,
    });
  }

  async delete(req, res) {
    Account.findByPk(req.params.id).then(result => {
      return Account.destroy(req.params.id).then(() => {
        return res.status(200).json({ response: result });
      });
    });
    return res.status(400).json({ error: "Account don't exists" });
  }
}

export default new AccountController();
