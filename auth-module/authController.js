const bcrypt = require("bcrypt");
const { PrismaClient } = require("../prisma/generated/prisma");
const prisma = new PrismaClient();

const { validateSignup, validateLogin } = require("./authValidation");
const { generateToken } = require("./tokenUtils");