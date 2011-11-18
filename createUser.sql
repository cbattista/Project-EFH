CREATE FUNCTION funkyTrain.makeUser  ( @n varchar(22), @p varchar(22) )

RETURNS INT(11)
AS
BEGIN

		DECLARE @u INT(11)
		INSERT INTO users 
		([name], [password], [currentTraining])
		VALUES
		(@n, @p, 6)

		SELECT @u = [uid] FROM users WHERE [name] == @n
		
		RETURN @u
END

--CREATE FUNCTION funkyTrain.resetUser (@uid int(11)
--RETURNS NULL
--AS
