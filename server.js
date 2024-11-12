import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

// const do Prisma e Express
const prisma = new PrismaClient()
const app = express()

app.use(express.json())
app.use(cors())

/*
  Rotas CRUD para usuários
*/

// Rota POST - Criar usuário
app.post('/usuarios', async (req, res) => {
  try {
    const novoUsuario = await prisma.user.create({
      data: {
        senha: req.body.senha,
        email: req.body.email,
        name: req.body.name,
        cpf: req.body.cpf,
      },
    })
    res.status(201).json(novoUsuario)
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar usuário', detalhes: error.message })
  }
})

// Rota GET - Listar usuários
app.get('/usuarios', async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários', detalhes: error.message })
  }
})

// Rota PUT - Editar usuário
app.put('/usuarios/:id', async (req, res) => {
  try {
    const usuarioAtualizado = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        senha: req.body.senha,
        email: req.body.email,
        name: req.body.name,
        cpf: req.body.cpf,
      },
    })
    res.status(200).json(usuarioAtualizado)
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar usuário', detalhes: error.message })
  }
})

// Rota DELETE - Deletar usuário
app.delete('/usuarios/:id', async (req, res) => {
  try {
    const usuarioDeletado = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    })
    res.status(200).json({ message: 'Usuário deletado!', usuarioDeletado })
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar usuário', detalhes: error.message })
  }
})

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
