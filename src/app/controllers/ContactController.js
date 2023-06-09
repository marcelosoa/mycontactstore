const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    // lista todos os registros
    const contacts = await ContactRepository.findAll(orderBy);
    response.json(contacts);
  }

  async show(request, response) {
    // obter um registro
    const { id } = request.params;
    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'User not found' });
    }

    response.json(contact);
  }

  async store(request, response) {
    // criar um registro
    const {
      name, email, phone, category_id
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactExists = await ContactRepository.findByEmail(email);

    if (contactExists) {
      return response.status(400).json({ error: 'This email already been taken' });
    }

    const contact = await ContactRepository.create({
      name, email, phone, category_id
    });

    response.json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id
    } = request.body;
    // editar um registro

    const contactExist = await ContactRepository.findById(id);
    if (!contactExist) {
      return response.status(404).json({ error: 'User not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactByEmail = await ContactRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(400).json({ error: 'This email already in use' });
    }

    const contact = await ContactRepository.update(id, {
      name, email, phone, category_id
    });

    response.json(contact);
  }

  async delete(request, response) {
    // deletar um registro
    const { id } = request.params;

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'User not found' });
    }

    await ContactRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new ContactController();
