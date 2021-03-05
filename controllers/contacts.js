const Contact = require('../model/index');

const getAllContact = async (req, res, next) => {
  try {
    const contact = await Contact.listContacts();
    if (contact) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: 'Contact list is empty',
      });
    }
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.getContactById(req.params.contactId);
    if (contact) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'User with this ID was not found!',
      });
    }
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (name && email) {
    const contact = await Contact.addContact(req.body);
    if (contact) {
      return res.status(201).json({
        status: 'success',
        code: 201,
        data: { contact },
      });
    } else {
      return res.status(400).json({
        status: 'error',
        code: 400,
        data: 'A user with this name or email already exists!',
      });
    }
  } else {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Missing required name field',
    });
  }
};

const removeContact = async (req, res, next) => {
  try {
    const contact = await Contact.removeContact(req.params.contactId);

    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        message: 'contact deleted',
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not Found',
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    if (req.body) {
      const contact = await Contact.updateContact(
        req.params.contactId,
        req.body,
      );

      if (contact) {
        return res.status(200).json({
          status: 'success',
          code: 200,
          message: 'Contact updated successfully',
          data: {
            contact,
          },
        });
      } else {
        return res.status(404).json({
          status: 'error',
          code: 404,
          message: 'Not found',
          // data: 'User with this ID was not found!',
        });
      }
    } else {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Missing fields',
      });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllContact,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};