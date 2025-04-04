$(document).ready(function(){
    function valid(campo) {
        campo.css('border-color', 'green');
        campo.next('.invalid-feedback').hide();
    }

    function invalid(campo) {
        campo.css('border-color', 'red');
        campo.next('.invalid-feedback').show();
    }

    function idadefn(data) {
        data = data.split("/")[0];

        var ano_aniversario = data.split("-")[0];
        var mes_aniversario = data.split("-")[1];
        var dia_aniversario = data.split("-")[2];

        var d = new Date,
            ano_atual = d.getFullYear(),
            mes_atual = d.getMonth() + 1,
            dia_atual = d.getDate(),
    
            ano_aniversario = +ano_aniversario,
            mes_aniversario = +mes_aniversario,
            dia_aniversario = +dia_aniversario,
    
            quantos_anos = ano_atual - ano_aniversario;
    
        if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
            quantos_anos--;
        }

        return quantos_anos < 0 ? 0 : quantos_anos;
    }    

    $("button[type='submit']").click(function(event){
        event.preventDefault();
        validarFormulario(); 
    });

    $("#data-nascimento").on('keyup', function() {
        let dataNascimento = $(this).val();

        let idade = idadefn(dataNascimento);

        console.log(idade);

        if (idade < 18) {
            console.log("Menor de idade");
            $("#menor-idade").show();
        } else {
            $("#menor-idade").hide();
        }
    });

    function validarFormulario() {
        let algumDeuErro = false;

        let nome = $("#nome");
        let dataNascimento = $("#data-nascimento");
        let cpf = $("#cpf");
        let telefoneFixo = $("#telefone-fixo");
        let celular = $("#celular");
        let nomePai = $("#nome-pai");
        let nomeMae = $("#nome-mae");
        let cep = $("#cep");
        let endereco = $("#endereco");
        let numero = $("#numero");
        let cidade = $("#cidade");
        let estado = $("#estado");
        let email = $("#email");
        let senha = $("#senha");
        let confirmarSenha = $("#confirmar-senha");

        if (!nome.val().match(/^[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)+$/)) {
            invalid(nome);
            algumDeuErro = true;
        } else {
            valid(nome);
        }

        if (!dataNascimento.val().match(/^\d{2}\/\d{2}\/\d{4}$/)) {
            invalid(dataNascimento);
            algumDeuErro = true;
        } else {
            valid(dataNascimento);
        }

        if (idadefn(dataNascimento.val()) < 18) {      
            if (!nomePai.val().match(/^[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)+$/)) {
                invalid(nomePai);
                algumDeuErro = true;
            } else {
                valid(nomePai);
            }

            if (!nomeMae.val().match(/^[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)+$/)) {
                invalid(nomeMae);
                algumDeuErro = true;
            } else {
                valid(nomeMae);
            }
        }

        if (!cpf.val().match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)) {
            invalid(cpf);
            algumDeuErro = true;
        } else {
            valid(cpf);
        }

        if (!telefoneFixo.val().match(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)) {
            invalid(telefoneFixo);
            algumDeuErro = true;
        } else {
            valid(telefoneFixo);
        }

        if (!celular.val().match(/^\(\d{2}\)\s\d{5}-\d{4}$/)) {
            invalid(celular);
            algumDeuErro = true;
        } else {
            valid(celular);
        }

        if (!cep.val().match(/^\d{5}-\d{3}$/)) {
            invalid(cep);
            algumDeuErro = true;
        } else {
            valid(cep);
        }

        if (!endereco.val().match(/^[A-Za-zÀ-ÿ0-9\s]+$/)) {
            invalid(endereco);
            algumDeuErro = true;
        } else {
            valid(endereco);
        }

        if (!numero.val().match(/^\d+$/)) {
            invalid(numero);
            algumDeuErro = true;
        } else {
            valid(numero);
        }

        if (!cidade.val().match(/^[A-Za-zÀ-ÿ\s]+$/)) {
            invalid(cidade);
            algumDeuErro = true;
        } else {
            valid(cidade);
        }

        if (!estado.val().match(/^[A-Z]{2}$/)) {
            invalid(estado);
            algumDeuErro = true;
        } else {
            valid(estado);
        }

        if (!email.val().match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            invalid(email);
            algumDeuErro = true;
        } else {
            valid(email);
        }

        if (senha.val().length < 8) {
            invalid(senha);
            algumDeuErro = true;
        } else {
            valid(senha);
            
            
            if (senha.val() !== confirmarSenha.val()) {
                invalid(confirmarSenha);
                invalid(senha);
                algumDeuErro = true;
            } else {
                valid(confirmarSenha);
                valid(senha);
            }
        }

        if (!algumDeuErro) {
            alert("Formulário enviado com sucesso!");
        }
    }
});
