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

        let nome, cpf, telefone, celular, rua, bairro, cidade, estado, cep, ok

        nome = $('#nome').val()
        cpf = $('#cpf').val()
        telefone = $('#telefone').val()
        celular = $('#celular').val()
        rua = $('#rua').val()
        bairro = $('#bairro').val()
        cidade = $('#cidades').val()
        estado = $('#estados').val()
        cep = $('#cep').val()
        ok = true

        if(verificarnome(nome)) {$('#nome').addClass('is-valid'); ok=true }
        else {$('#nome').addClass('is-invalid'); ok=false }

        if(verificarcpf(cpf)) {$('#cpf').addClass('is-valid'); ok=true }
        else {$('#cpf').addClass('is-invalid'); ok=false }

        if(verificartxt(telefone, 10)) {$('#telefone').addClass('is-valid'); ok=true }
        else {$('#telefone').addClass('is-invalid'); ok=false}

        if(verificartxt(celular, 11)) {$('#celular').addClass('is-valid'); ok=true }
        else {$('#celular').addClass('is-invalid'); ok=false}

        if(rua) {$('#rua').addClass('is-valid'); ok=true }
        else {$('#rua').addClass('is-invalid'); ok=false }

        if(bairro) {$('#bairro').addClass('is-valid'); ok=true }
        else {$('#bairro').addClass('is-invalid'); ok=false }

        if(estado) {$('#estados').addClass('is-valid'); ok= true }
        else {$('#estados').addClass('is-invalid'); ok= false }

        if(cidade) {$('#cidades').addClass('is-valid'); ok=true }
        else {$('#cidades').addClass('is-invalid'); ok=false }

        if(verificartxt(cep, 8)) {$('#cep').addClass('is-valid'); ok=true }
        else {$('#cep').addClass('is-invalid'); ok=false }


        if(ok)
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