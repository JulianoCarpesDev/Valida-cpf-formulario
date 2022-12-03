class ValidaFormulario{
    constructor(){
        this.formulario = document.querySelector('.formulario')
        this.eventos()
        alert('Preencha todos os campos')
    }

    eventos(){
        this.formulario.addEventListener('submit',e =>{
            this.handleSubmit(e) // capturando eventos do fomulário
            //console.log(e)
        })

    }
    handleSubmit(e){
        e.preventDefault()
        //console.log('não enviado')
        const inputValido = this.camposValidos()
        const senhasValidas = this.senhasSaoValidas()
        if(inputValido && senhasValidas){
            alert('Formulário Enviado')
        }
    }
    camposValidos(){
        let valid = true // flag
        for(let erroText of this.formulario.querySelectorAll('.error-text')){
            erroText.remove() // proibindo  que divs iguais sejam duplicadas
        }

        for( let input of this.formulario.querySelectorAll('.validar')){
            //console.log(input) // captura todos os inputs da classe validar

            if(!input.value){
                let label = input.previousElementSibling.innerText
                this.criaErro(input,`Campo ${label} Não pode estar em branco <br/>`)
                // inserindo erro no label especifico com msg
                valid = false
            }   // verificando se todos os campos estão limpos 
            if(input.classList.contains('cpf')){
                if(!this.validaCpf(input)) valid = false
            }
            if(input.classList.contains('usuario')){
                if(!this.validaUsuario(input)) valid = false
            }
            
        }
        return valid
    }
    senhasSaoValidas(){
        let valid = true
        const senha1 = this.formulario.querySelector('.senha1')
        const senha2 = this.formulario.querySelector('.senha2')
        if(senha1.value !== senha2.value){ // validando senhas
            this.criaErro(senha1, 'Senhas não são iguais')
            this.criaErro(senha2, 'Senhas não são iguais')
            return valid = false
        }
        return valid
    }
    validaUsuario(input){
        const usuario = input.value
        if(!usuario.match(/^[a-zA-Z0-9]+$/g)){ // validando usuário
            this.criaErro(input,'Usuário precisa conter letras e/ ou numeros')
            return false
        }
        return true
    }
    validaCpf(input){
        const  cpf = new ValidaCpf(input.value) // chamando o arquivo cpf.js
        if(!cpf.valida()){
            this.criaErro(input,'CPF inválido ') // validando cpf
            return false
        }
        
       
        return true
        
    }
    criaErro(campo,msg){
        const div = document.createElement('div')
        div.innerHTML += msg // criando erro e novas divs
        div.classList.add('error-text') // criando classe
        campo.insertAdjacentElement('afterend',div) // inserindo apos campo
    }

    
}
const valida =new ValidaFormulario()