/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';
import Income from '../models/Income';

class IncomeController {
  async index(req, res) {
    const incomesList = await Income.findAll();

    return res.status(200).json(incomesList);
  }

  async show(req, res) {
    const incomeDetail = await Income.findByPk(req.params.id);
    if (incomeDetail === null) {
      return res.status(404).json({ error: "Income don't exists" });
    }

    return res.status(200).json(incomeDetail);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      value: Yup.number().required(),
      costCenter: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, name, value, costCenter } = await Income.create(req.body);

    return res.json({
      id,
      name,
      value,
      costCenter,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      category: Yup.string().min(3),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const income = await Income.findByPk(req.name);

    if (req.body.name !== income.name) {
      const incomeExists = await Income.findOne({
        where: { name: req.body.name },
      });

      if (incomeExists) {
        return res.status(400).json({ error: 'Income already exists' });
      }
    }

    await income.update(req.body);

    const { id, name, category } = await Income.findByPk(req.name);

    return res.json({
      id,
      name,
      category,
    });
  }

  async delete(req, res) {
    Income.findByPk(req.params.id).then(result => {
      return Income.destroy(req.params.id).then(() => {
        return res.status(200).json({ response: result });
      });
    });
    return res.status(400).json({ error: "Income don't exists" });
  }
}

export default new IncomeController();
