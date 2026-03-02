# 🚀 Guia Oficial de Deploy - MYA Parts na Hostinger

O projeto **MYA Parts** é um sistema B2B robusto escrito em **Next.js 15 (Node.js)** com banco de dados **MySQL (Prisma)**. 

Devido à arquitetura da aplicação (Banco de Dados, Autenticação de Criptografia, e Server Actions), a Hostinger oferece duas abordagens. A mais recomendada é usar um **VPS** (Servidor Virtual Privado) para garantir máxima velocidade.

---

## 🏗️ Opção 1: Deploy em Servidor VPS Hostinger (Altamente Recomendado)
Esta é a maneira ideal para plataformas industriais (garante máxima performance e segurança).

### 1. Preparação no Painel da Hostinger
1. Adquira/Acesse um plano **VPS** na Hostinger.
2. Escolha o Sistema Operacional: **Ubuntu 22.04 LTS**.
3. Acesse o seu servidor via terminal (SSH):
   `ssh root@IP_DO_SEU_SERVIDOR`

### 2. Instalando Dependências no Servidor
Rode os seguintes comandos no terminal do VPS:
```bash
# Atualizar sistema
apt update && apt upgrade -y

# Instalar Node.js (Versão 20 recomendada)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar Gerenciador de Processos (PM2)
npm install -g pm2
```

### 3. Transferindo os Arquivos
Você pode enviar os arquivos da sua máquina para a Hostinger usando FTP (FileZilla) ou clonando o seu GitHub.
*⚠️ NOTA:* Não envie a pasta `node_modules` nem a `.next`. Envie apenas o código fonte.

### 4. Configurando Variáveis de Produção
No servidor, crie o arquivo `.env` idêntico ao que temos na sua máquina, mas trocando a URL do Banco para a Oficial:
```env
DATABASE_URL="mysql://USUARIO:SENHA@localhost:3306/nome_do_banco_mya"
NEXTAUTH_SECRET="uma_senha_muito_forte_criada_agora"
```

### 5. Compilando e Ligando a Plataforma
Dentro da pasta do projeto no servidor `/var/www/myaparts` (ou onde você salvou):
```bash
# Baixar pacotes
npm install

# Construir Banco e Tipar Prisma
npx prisma generate
npx prisma db push

# Construir para Produção (Gerar HTML Estático e Rotas Rápidas)
npm run build

# Ligar o motor do Servidor travado em segundo plano
pm2 start npm --name "myaparts-producao" -- start

# Salvar para o servidor voltar se a luz cair
pm2 save
pm2 startup
```

---

## 🌐 Opção 2: Hospedagem Compartilhada Avançada (Hospedagem Node.js)
Se você não possui um VPS, mas um plano "Hospedagem Cloud/Business" padrão da Hostinger:

1. Acesse o hPanel, desça até **Avançado > Node.js**.
2. Crie uma aplicação (Defina a versão como 18.x ou 20.x).
3. Defina a pasta de publicação (ex: `/public_html/myaparts`).
4. Envie o código (`.zip` ou `FileZilla`) sem o `node_modules`.
5. No painel da Hostinger, clique em **Instalar Dependências** (npm install).
6. Crie o Banco MySQL no painel da Hostinger e insira no `.env`.
7. Abra o terminal SSH da própria Hostinger pela web e digite:
   `npx prisma db push` (para criar as tabelas)
   `npm run build` (para montar o site)
8. Em "Comando de Inicialização" no Painel, configure: `npm start`.

---

## 🛡️ Últimos Detalhes (Para Ambos)
- Vá no painel do domínio e certifique-se de apontar os DNS.
- Libere e Ative o SSL Grátis (Let's Encrypt) pelo próprio painel.
- Seu Painel Admin continuará em `seu-dominio.com.br/painel`.

✅ Pronto! O site B2B e Algoritmos de Tolerância de Busca estarão ativos em tempo real na nuvem!
