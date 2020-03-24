function removervalidacao()
{
    $('input').removeClass('is-valid')
    $('input').removeClass('is-invalid')
    $('textarea').removeClass('is-valid')
    $('textarea').removeClass('is-invalid')
}


$(document).ready(function () {
    

    $('input[name=enviar_contato]').click(function () {
        removervalidacao()

        let nome, email, msg, ok

        nome = $('#nome_contato').val()
        email = $('#email_contato').val()
        msg = $('#msg_contato').val()
        ok = true
    
        if(verificarnome(nome)) $('#nome_contato').addClass('is-valid')
        else $('#nome_contato').addClass('is-invalid')

        if(verificaremail(email)) $('#email_contato').addClass('is-valid')
        else $('#email_contato').addClass('is-invalid')

        if(msg != "") $('#msg_contato').addClass('is-valid')
        else $('#msg_contato').addClass('is-invalid')

        ok = $('input.is-invalid').length + $('textarea.is-invalid').length
        console.log(ok)

        if(ok == 0)
        {
            $.ajax({
                url:"http://localhost/osapp/server/webservice.php",
                method:"post",
                data:{
                    "tipo":"enviarEmail",
                    "nome_contato":nome,
                    "email_contato":email,
                    "msg_contato":msg
                }
            }).done((retorno)=> {
                if(retorno){
                    $('#sucesso').slideDown()
                    setTimeout(function(){
                        $('#sucesso').slideUp()
                    },2000)
                }
                else{
                    $('#erro_email').slideDown()
                    setTimeout(function(){
                        $('#erro_email').slideUp()
                    },3000)
                }
            }).fail(()=> {
                $('#erro').slideDown()
                setTimeout(function(){
                    $('#erro').slideUp()
                },3000)
            })
        }
        else{   
            $('#erro_form').slideDown()
            setTimeout(function(){
                $('#erro_form').slideUp()
            },3000)
        }
    })
})