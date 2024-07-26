INFOS:
Git: https://github.com/balta-io/7180
node v 18.20.4

Verifique se você tem uma chave SSH configurada corretamente para o GitHub. Você pode fazer isso seguindo estas etapas:

a. Verifique se você já tem uma chave SSH
No terminal, execute:
ls -al ~/.ssh
Você deve ver arquivos como id_rsa e id_rsa.pub. Se você não tem esses arquivos, você precisa criar uma chave SSH.

b. Crie uma nova chave SSH (se necessário)
Se você não tiver uma chave SSH, crie uma com o comando:

ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
Substitua "your_email@example.com" pelo seu email do GitHub. Quando solicitado a especificar um local para salvar a chave, pressione Enter para aceitar o local padrão. Em seguida, adicione a chave SSH ao seu agente SSH:

eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa

c. Adicione a chave SSH ao GitHub
Copie o conteúdo da sua chave SSH pública:

cat ~/.ssh/id_rsa.pub
Vá para as configurações de chaves SSH no GitHub e adicione a nova chave.

2. Teste a Conexão SSH
Verifique se você pode se conectar ao GitHub via SSH:

ssh -T git@github.com

npm install -g @nestjs/cli

nest --version

nest new petshop

--nest suporta microserviços

nest generate module 

npm run start:dev

npm install --save @nestjs/mongoose mongoose

doc docker: https://balta.io/blog/mongodb-docker?utm_campaign=recado_comeco_de_curso_-_docker_e_mongodb&utm_medium=email&utm_source=RD+Station
docker --version
docker pull mongo
-subir o mongo no docker:
--docker run -v ~/docker --name mongodbadriel -d -p 1500:27017 -e MONGO_INITDB_ROOT_USERNAME=mongoadriel -e MONGO_INITDB_ROOT_PASSWORD=euhru334 mongo

docker container start/stop mongodbadriel

-connectionString:
--mongodb://mongoadriel:euhru334@localhost:1500/admin

pesquisar sobre USER SECRET

Para gerenciar o banco de forma visual: MongoDb Compass

npm install --save @nestjs/config
npm install @nestjs/cache-manager cache-manager
npm i --save compression

npm i --save @nestjs/axios axios

npm install @nestjs/swagger swagger-ui-express


wsl --install
wsl


git remote add origin git@github.com:adrieellucas/code-challenge-shipix-tech.git
git branch -M main
git push -u origin main