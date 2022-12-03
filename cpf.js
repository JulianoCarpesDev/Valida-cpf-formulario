class ValidaCpf{
    constructor(cpf){
        this.cpf = cpf
        this.cpfLimpo = cpf.replace(/\D+/g,'')
    }
    isSequencia(){
        const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length)
        return sequencia === this.cpfLimpo
    }
    valida(){
        if(this.cpfLimpo.length <11){
            return alert('Falta digitos no Cpf')
        }
        if(typeof this.cpfLimpo === 'undefined'){
            return alert('Cpf indefinido')
        }
        if(this.isSequencia()){
            return alert('Cpf Sequencial inválido')
        }
        
        const cpfDiminuido = this.cpfLimpo.slice(0,-2)
        //console.log(cpfDiminuido)
        const digito1 = this.criaDigito(cpfDiminuido)
        //console.log(digito1)
        const digit2 = this.criaDigito(cpfDiminuido + digito1)
        //console.log(digit2)
        const novoCpf = `${cpfDiminuido + digito1+ digit2}`
        
         if(novoCpf === this.cpfLimpo){
            alert('Cpf Válido') 
         } else{
             alert('Cpf Inválido') 
         }
         return novoCpf === this.cpfLimpo
    }
    

    criaDigito(entradaCpf){
        const criaArray = Array.from(entradaCpf)
        //console.log(criaArray)
        let regressivo = criaArray.length +1

        let total = criaArray.reduce(function(ac,valor){

            ac+= (regressivo * Number(valor))
            regressivo--
            return ac

        },0)
        
        let soma = 11 - (total % 11)
        return soma > 9? '0': String(soma)

        
    }

}

//const cpf = new ValidaCpf('028.307.469.88')
//console.log(cpf.valida())