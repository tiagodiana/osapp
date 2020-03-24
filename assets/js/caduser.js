function addMask()
{
    $('#cpf').mask("999.999.999-99")
    $('#telefone').mask("(99) 9999-9999")
    $('#celular').mask("(99) 99999-9999")
    $('#cep').mask('99999-999')
}

function delMask()
{
    $('#cpf').unmask()
    $('#telefone').unmask()
    $('#celular').unmask()
    $('#cep').unmask()
}

function removervalidacao()
{
    $('input').removeClass('is-valid')
    $('input').removeClass('is-invalid')
    $('select').removeClass('is-valid')
    $('select').removeClass('is-invalid')
}



//Codigo AJAX para cadastro de usuario
$(document).ready(function()
{
    addMask()


    $('button[name=salvar]').click(function()
    {
        delMask()
        removervalidacao()

        let nome, cpf, telefone, celular, rua, bairro, cidade, estado, cep

        nome = $('#nome').val()
        cpf = $('#cpf').val()
        telefone = $('#telefone').val()
        celular = $('#celular').val()
        rua = $('#rua').val()
        bairro = $('#bairro').val()
        cidade = $('#cidades').val()
        estado = $('#estados').val()
        cep = $('#cep').val()


        if(verificarnome(nome)) $('#nome').addClass('is-valid')
        else $('#nome').addClass('is-invalid')

        if(verificarcpf(cpf)) $('#cpf').addClass('is-valid')
        else $('#cpf').addClass('is-invalid')

        if(verificartxt(telefone, 10)) $('#telefone').addClass('is-valid');
        else $('#telefone').addClass('is-invalid')

        if(verificartxt(celular, 11)) $('#celular').addClass('is-valid')
        else $('#celular').addClass('is-invalid')

        if(rua) $('#rua').addClass('is-valid')
        else $('#rua').addClass('is-invalid')

        if(bairro) $('#bairro').addClass('is-valid')
        else $('#bairro').addClass('is-invalid')

        if(estado) $('#estados').addClass('is-valid')
        else $('#estados').addClass('is-invalid')

        if(cidade) $('#cidades').addClass('is-valid')
        else $('#cidades').addClass('is-invalid')

        if(verificartxt(cep, 8)) $('#cep').addClass('is-valid')
        else $('#cep').addClass('is-invalid')

        let ok = $('input.is-invalid').length
        console.log(ok)

        if(ok == 0)
        {
            estado = estado.split(' ')[1]
            $.ajax({
                url:"http://localhost/osapp/server/webservice.php",
                method:"post",
                data:{
                    'tipo':'inserir',
                    'nome':nome,
                    'cpf':cpf,
                    'telefone':telefone,
                    'celular':celular,
                    'rua':rua,
                    'bairro':bairro,
                    'cidade':cidade,
                    'estado':estado,
                    'cep':cep
                },
                success: function(retorno){
                    limparCampos()
                    removervalidacao()
                    $('#sucesso').slideDown()
                        setTimeout(function(){
                            $('#sucesso').slideUp()
                        },2000)
                },
                timeout:3000,
                error: function(){
                    $('#erro').slideDown()
                        setTimeout(function(){
                            $('#erro').slideUp()
                        },2000)
                }
            })
        }
        else
        {
            $('#erroForm').slideDown()
            setTimeout(function(){
                $('#erroForm').slideUp()
            },2000)
        }
        addMask()
    })
})


function limparCampos(){
    $('#nome').val("")
    $('#cpf').val("")
    $('#telefone').val("")
    $('#celular').val("")
    $('#rua').val("")
    $('#bairro').val("")
    $('#cidade').val("")
    $('#cep').val("")
}