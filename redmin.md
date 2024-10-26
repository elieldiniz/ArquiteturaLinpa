iniciar banco banco de dados : docker run --name meu-postgres -e POSTGRES_PASSWORD=minhasenha -e POSTGRES_DB=meu_banco -p 5432:5432 -d postgres
 
executar banco de dados: docker exec -it meu-postgres psql -U postgres -d meu_banco