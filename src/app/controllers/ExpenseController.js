/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';
import Expense from '../models/Expense';

class ExpenseController {
  async index(req, res) {
    const expenseList = await Expense.findAll();

    return res.status(200).json(expenseList);
  }

  async show(req, res) {
    const expenseDetail = await Expense.findByPk(req.params.id);

    if (expenseDetail === null) {
      return res.status(404).json({ error: "Expense don't exists" });
    }

    return res.status(200).json(expenseDetail);
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

    const { id, name, value, costCenter } = await Expense.create(req.body);

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

    const expense = await Expense.findByPk(req.params.id);

    if (req.body.name !== expense.name) {
      const expenseExists = await Expense.findOne({
        where: { name: req.body.name },
      });

      if (expenseExists) {
        return res.status(400).json({ error: 'Expense already exists' });
      }
    }

    await expense.update(req.body);

    const { id, name, category } = await Expense.findByPk(req.name);

    return res.json({
      id,
      name,
      category,
    });
  }

  async delete(req, res) {
    Expense.findByPk(req.params.id).then(result => {
      return Expense.destroy(req.params.id).then(() => {
        return res.status(200).json({ response: result });
      });
    });
    return res.status(400).json({ error: "Expense don't exists" });
  }
}

export default new ExpenseController();
