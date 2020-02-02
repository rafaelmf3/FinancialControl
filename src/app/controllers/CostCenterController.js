/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';
import CostCenter from '../models/CostCenter';

class CostCenterController {
  async index(req, res) {
    const costCenterList = await CostCenter.findAll();

    return res.status(200).json(costCenterList);
  }

  async show(req, res) {
    const costCenterDetail = await CostCenter.findOne({
      where: { name: req.params.name },
    });

    if (costCenterDetail === null) {
      return res.status(404).json({ error: "Cost Center don't exists" });
    }

    return res.status(200).json(costCenterDetail);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      category: Yup.string()
        .required()
        .min(3),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const costCenterExists = await CostCenter.findOne({
      where: { name: req.body.name },
    });

    if (costCenterExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, category } = await CostCenter.create(req.body);

    return res.json({
      id,
      name,
      category,
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

    const costCenter = await CostCenter.findByPk(req.name);

    if (req.body.name !== costCenter.name) {
      const costCenterExists = await CostCenter.findOne({
        where: { name: req.body.name },
      });

      if (costCenterExists) {
        return res.status(400).json({ error: 'CostCenter already exists' });
      }
    }

    await costCenter.update(req.body);

    const { id, name, category } = await CostCenter.findByPk(req.name);

    return res.json({
      id,
      name,
      category,
    });
  }

  async delete(req, res) {
    CostCenter.find({
      where: { name: req.params.name },
    }).then(result => {
      return CostCenter.destroy({ where: { name: req.params.name } }).then(
        () => {
          return res.status(200).json({ response: result });
        }
      );
    });
    return res.status(400).json({ error: "CostCenter don't exists" });
  }
}

export default new CostCenterController();
