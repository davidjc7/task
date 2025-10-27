import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class TaskController {

  /**
   * CREATE: Cria uma nova tarefa
   */
  static async createTask(req, res) {
    try {
      const { title, description } = req.body;

      if (!title) {
        return res.status(400).json({ error: 'O título (title) é obrigatório.' });
      }

      const task = await prisma.task.create({
        data: {
          title,
          description,
        },
      });
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: `Erro ao criar tarefa: ${error.message}` });
    }
  }

  /**
   * READ (All): Retorna todas as tarefas
   */
  static async getAllTasks(req, res) {
    try {
      const tasks = await prisma.task.findMany();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: `Erro ao buscar tarefas: ${error.message}` });
    }
  }

  /**
   * READ (One): Retorna uma tarefa específica pelo ID
   */
  static async getTaskById(req, res) {
    try {
      const { id } = req.params;
      const task = await prisma.task.findUnique({
        where: { id: parseInt(id) },
      });

      if (!task) {
        return res.status(404).json({ error: 'Tarefa não encontrada.' });
      }

      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: `Erro ao buscar tarefa: ${error.message}` });
    }
  }

  /**
   * UPDATE: Atualiza uma tarefa existente
   */
  static async updateTask(req, res) {
    try {
      const { id } = req.params;
      const { title, description, completed } = req.body;

      const task = await prisma.task.update({
        where: { id: parseInt(id) },
        data: {
          title,
          description,
          completed,
        },
      });

      res.status(200).json(task);
    } catch (error) {
      if (error.code === 'P2025') { 
        return res.status(404).json({ error: 'Tarefa não encontrada para atualização.' });
      }
      res.status(500).json({ error: `Erro ao atualizar tarefa: ${error.message}` });
    }
  }

  /**
   * DELETE: Exclui uma tarefa
   */
  static async deleteTask(req, res) {
    try {
      const { id } = req.params;
      await prisma.task.delete({
        where: { id: parseInt(id) },
      });

      res.status(204).send();
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Tarefa não encontrada para exclusão.' });
      }
      res.status(500).json({ error: `Erro ao excluir tarefa: ${error.message}` });
    }
  }
}

export default TaskController;