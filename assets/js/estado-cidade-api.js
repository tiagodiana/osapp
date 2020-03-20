let URL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
let estados = document.querySelector('#estados')
let cidades = document.querySelector('#cidades')
cidades.disabled = true



fetch(URL)
.then(function(response){
    response.json()
    .then((retorno) => {
        let  option = document.createElement('option')
        option.text = ""
        option.value = ""
        estados.appendChild(option)
        for(let c = 0; c < retorno.length ; c++)
        {
            let  option = document.createElement('option')
            option.text = retorno[c]['sigla']
            option.value = retorno[c]['id'] + ' ' + retorno[c]['sigla'] 
            estados.appendChild(option)
        }
    })
    })
.catch(function(err){
    console.error('Failed retrieving information', err);
});

estados.addEventListener('change', () => {
    cidades.disabled = false
    cidades.innerHTML = ""
    let tmp = estados.value.split(' ')
    fetch(URL + `/${tmp[0]}/distritos`)
    .then(function(response){
        response.json()
        .then((retorno) => {
            let  option = document.createElement('option')
            option.text = ""
            option.value = ""
            cidades.appendChild(option)
            for(let c = 0; c < retorno.length ; c++)
            {
                let  option = document.createElement('option')
                option.text = retorno[c]['nome']
                option.value = retorno[c]['nome']
                cidades.appendChild(option) 
            }
        })
    })
    .catch(function(err){
        console.error('Failed retrieving information', err);
    });
})
