module.exports.iniciaChat = function(app, req, res){
    const dadosForm = req.body;

    req.assert('apelido', 'Não pode ser vazio').notEmpty();
    req.assert('apelido', 'Nome ou apelido deve ter entre 3 e 10 caracteres').len(3, 10);

    const error = req.validationErrors();

    if(error){
        // res.send consegue finalizar o processo
       return res.render('index', {validacao: error})
    }

    app.get('io').emit(
        'msgParaCliente',
        {apelido: dadosForm.apelido, mensagem: 'Acabou de entrar no chat'}
    )
    
    res.render('chat', {dadosForm: dadosForm})
}