import {
  update,
  findOne,
  findAll,
  deleteUser,
  deleteAll,
  create,
} from '../controllers/user.controller.js';
import express from 'express';
export const router = express.Router();

// Create a new employee
router.post('/', create);

// Retrieve all employees
router.get('/', findAll);

// Retrieve a single employee with employeeId
router.get('/:userId', findOne);

// Update a employee with employeeId
router.put('/:userId', update);

// Delete a employee with employeeId
router.delete('/:userId', deleteUser);

// Delete all employees
router.delete('/', deleteAll);
