import fs from 'node:fs';
import path from 'node:path';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yaml';

import { Todo } from './models/Todo';
import { ErrorResponse } from './models/ErrorResponse';
import { initDb } from './store';

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static('src/public'));

initDb();

app.get('/todos', async (req: Request, res: Response) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    const err = error as Error;
    res.status(500).json(new ErrorResponse(err.message));
  }
});

app.get('/todos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json(new ErrorResponse('Missing ID'));
      return;
    }
    const todo = await Todo.findByPk(id);
    if (!todo) {
      res.status(404).json(new ErrorResponse('ID not found'));
      return;
    }
    res.json(todo);
  } catch (error) {
    const err = error as Error;
    res.status(500).json(new ErrorResponse(err.message));
  }
});

app.post('/todos', async (req: Request, res: Response) => {
  try {
    const { title, description = '' } = req.body;
    if (!title) {
      res.status(400).json(new ErrorResponse('Missing title'));
      return;
    }
    const { id } = await Todo.create({ title, description });
    res.json({ id });
  } catch (error) {
    const err = error as Error;
    res.status(500).json(new ErrorResponse(err.message));
  }
});

app.put('/todos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description = '', completed = false } = req.body;
    if (!title) {
      res.status(400).json(new ErrorResponse('Missing title'));
      return;
    }
    const todo = await Todo.findByPk(id);
    if (!todo) {
      res.status(404).json(new ErrorResponse('ID not found'));
      return;
    }
    if (!title) {
      res.status(400).json(new ErrorResponse('Missing title'));
      return;
    }
    todo.title = title;
    todo.description = description;
    todo.completed = completed;
    await todo.save();
    res.json({ id, status: 'updated' });
  } catch (error) {
    const err = error as Error;
    res.status(500).json(new ErrorResponse(err.message));
  }
});

app.patch('/todos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const todo = await Todo.findByPk(id);
    if (!todo) {
      res.status(404).json(new ErrorResponse('ID not found'));
      return;
    }
    if (title != null) todo.title = title;
    if (description != null) todo.description = description;
    if (completed != null) todo.completed = !!completed;
    await todo.save();
    res.json({ id, status: 'updated' });
  } catch (error) {
    const err = error as Error;
    res.status(500).json(new ErrorResponse(err.message));
  }
});

app.delete('/todos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json(new ErrorResponse('Missing ID'));
      return;
    }
    const todo = await Todo.findByPk(id);
    if (!todo) {
      res.status(404).json(new ErrorResponse('ID not found'));
      return;
    }
    await todo.destroy();
    res.json({ id, status: 'deleted' });
  } catch (error) {
    const err = error as Error;
    res.status(500).json(new ErrorResponse(err.message));
  }
});

const swaggerYaml = fs.readFileSync(
  path.resolve(process.cwd(), 'src', 'openapi.yaml'),
  'utf8',
);
const swaggerDoc = yaml.parse(swaggerYaml);
app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
  console.log(`API docs on http://localhost:${port}/apidocs`);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    error: {
      message: err.message,
    },
  } as ErrorResponse);
});
