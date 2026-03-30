const form = document.getElementById('validationForm');
const name = document.getElementById('name');
const email = document.getElementById('email');
const cpf = document.getElementById('cpf');
const phone = document.getElementById('phone');
const message = document.getElementById('message');


function mascara_cpf() {
    var cpf_formatado = document.getElementById('cpf').value;
    
    if (cpf_formatado[3] != ".") {
        if (cpf_formatado[3] != undefined) {
            document.getElementById('cpf').value = cpf_formatado.slice(0, 3) + "." + cpf_formatado[3];
        }
    }
    
    if (cpf_formatado[7] != ".") {
        if (cpf_formatado[7] != undefined) {
            document.getElementById('cpf').value = cpf_formatado.slice(0, 7) + "." + cpf_formatado[7];
        }
    }
    
    if (cpf_formatado[11] != "-") {
        if (cpf_formatado[11] != undefined) {
            document.getElementById('cpf').value = cpf_formatado.slice(0, 11) + "-" + cpf_formatado[11];
        }
    }
}

function mascara_telefone() {
    var tel_formatado = document.getElementById('phone').value;
    
    if (tel_formatado[0] != "(") {
        if (tel_formatado[0] != undefined) {
            document.getElementById('phone').value = "(" + tel_formatado[0];
        }
    }
    
    if (tel_formatado[3] != ")") {
        if (tel_formatado[3] != undefined) {
            document.getElementById('phone').value = tel_formatado.slice(0, 3) + ")" + tel_formatado[3];
        }
    }
    
    if (tel_formatado[4] != " ") {
        if (tel_formatado[4] != undefined) {
            document.getElementById('phone').value = tel_formatado.slice(0, 4) + " " + tel_formatado[4];
        }
    }
    
    if (tel_formatado[10] != "-") {
        if (tel_formatado[10] != undefined) {
            document.getElementById('phone').value = tel_formatado.slice(0, 10) + "-" + tel_formatado[10];
        }
    }
}


// VALIDAR ENQUANTO DIGITA

name.addEventListener('input', function() {
    var nomeDigitado = name.value.trim();
    var temEspaco = nomeDigitado.indexOf(' ') > -1;
    
    if (nomeDigitado != '' && temEspaco) {
        name.classList.add('success');
        name.classList.remove('error');
        document.getElementById('nameError').classList.remove('show');
    } else if (nomeDigitado != '') {
        name.classList.add('error');
        name.classList.remove('success');
        document.getElementById('nameError').classList.add('show');
    }
});

email.addEventListener('input', function() {
    var emailDigitado = email.value.trim().toLowerCase();
    var terminaComGmail = emailDigitado.indexOf('@gmail.com') > -1;
    var naoEstaVazio = emailDigitado != '@gmail.com';
    
    if (terminaComGmail && naoEstaVazio) {
        email.classList.add('success');
        email.classList.remove('error');
        document.getElementById('emailError').classList.remove('show');
    } else if (emailDigitado != '') {
        email.classList.add('error');
        email.classList.remove('success');
        document.getElementById('emailError').classList.add('show');
    }
});

cpf.addEventListener('input', function() {
    mascara_cpf();
    
    var cpfDigitado = cpf.value;
    var cpfSemMascara = cpfDigitado.replace(/\./g, '').replace(/-/g, '');
    var cpfCompleto = cpfSemMascara.length == 11;
    var cpfValido = validarCPF(cpfSemMascara);
    
    if (cpfCompleto && cpfValido) {
        cpf.classList.add('success');
        cpf.classList.remove('error');
        document.getElementById('cpfError').classList.remove('show');
    } else if (cpfSemMascara.length > 0) {
        cpf.classList.add('error');
        cpf.classList.remove('success');
        document.getElementById('cpfError').classList.add('show');
    }
});

phone.addEventListener('input', function() {
    mascara_telefone();     
    
    var telefoneDigitado = phone.value;
    var telefoneSemMascara = telefoneDigitado.replace(/\(/g, '').replace(/\)/g, '').replace(/-/g, '').replace(/ /g, ''); // Tira parênteses, traço e espaço
    var telefoneValido = telefoneSemMascara.length >= 10 && telefoneSemMascara.length <= 11;
    
    if (telefoneValido) {
        phone.classList.add('success');
        phone.classList.remove('error');
        document.getElementById('phoneError').classList.remove('show');
    } else if (telefoneSemMascara.length > 0) {
        phone.classList.add('error');
        phone.classList.remove('success');
        document.getElementById('phoneError').classList.add('show');
    }
});

message.addEventListener('input', function() {
    var mensagemDigitada = message.value.trim();
    var mensagemGrande = mensagemDigitada.length >= 10;
    
    if (mensagemGrande) {
        message.classList.add('success');
        message.classList.remove('error');
        document.getElementById('messageError').classList.remove('show');
    } else if (mensagemDigitada.length > 0) {
        message.classList.add('error');
        message.classList.remove('success');
        document.getElementById('messageError').classList.add('show');
    }
});


// QUANDO ENVIAR O FORMULÁRIO

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    var formularioOK = true; //
    
    var nomeDigitado = name.value.trim();
    var temEspaco = nomeDigitado.indexOf(' ') > -1;
    
    if (nomeDigitado == '' || !temEspaco) {
        name.classList.add('error');
        name.classList.remove('success');
        document.getElementById('nameError').classList.add('show');
        formularioOK = false; // Marca que tem erro
    } else {
        name.classList.add('success');
        name.classList.remove('error');
        document.getElementById('nameError').classList.remove('show');
    }
    
    var emailDigitado = email.value.trim().toLowerCase();
    var terminaComGmail = emailDigitado.indexOf('@gmail.com') > -1;
    var naoEstaVazio = emailDigitado != '@gmail.com';
    
    if (!terminaComGmail || !naoEstaVazio) {
        email.classList.add('error');
        email.classList.remove('success');
        document.getElementById('emailError').classList.add('show');
        formularioOK = false;
    } else {
        email.classList.add('success');
        email.classList.remove('error');
        document.getElementById('emailError').classList.remove('show');
    }
    
    var cpfDigitado = cpf.value;
    var cpfSemMascara = cpfDigitado.replace(/\./g, '').replace(/-/g, '');
    var cpfValido = validarCPF(cpfSemMascara);
    
    if (!cpfValido) {
        cpf.classList.add('error');
        cpf.classList.remove('success');
        document.getElementById('cpfError').classList.add('show');
        formularioOK = false;
    } else {
        cpf.classList.add('success');
        cpf.classList.remove('error');
        document.getElementById('cpfError').classList.remove('show');
    }
    
    var telefoneDigitado = phone.value;
    var telefoneSemMascara = telefoneDigitado.replace(/\(/g, '').replace(/\)/g, '').replace(/-/g, '').replace(/ /g, '');
    var telefoneValido = telefoneSemMascara.length >= 10 && telefoneSemMascara.length <= 11;
    
    if (!telefoneValido) {
        phone.classList.add('error');
        phone.classList.remove('success');
        document.getElementById('phoneError').classList.add('show');
        formularioOK = false;
    } else {
        phone.classList.add('success');
        phone.classList.remove('error');
        document.getElementById('phoneError').classList.remove('show');
    }
    
    var mensagemDigitada = message.value.trim();
    var mensagemGrande = mensagemDigitada.length >= 10;
    
    if (!mensagemGrande) {
        message.classList.add('error');
        message.classList.remove('success');
        document.getElementById('messageError').classList.add('show');
        formularioOK = false;
    } else {
        message.classList.add('success');
        message.classList.remove('error');
        document.getElementById('messageError').classList.remove('show');
    }
    
    if (formularioOK) {
        document.getElementById('successModal').classList.add('show');
        form.reset(); 
        
        name.classList.remove('success', 'error');
        email.classList.remove('success', 'error');
        cpf.classList.remove('success', 'error');
        phone.classList.remove('success', 'error');
        message.classList.remove('success', 'error');
    }
});


// VALIDAR CPF

function validarCPF(cpf) {
    if (cpf.length != 11) {
        return false;
    }
    
    if (cpf == '00000000000' || cpf == '11111111111' || 
        cpf == '22222222222' || cpf == '33333333333' || 
        cpf == '44444444444' || cpf == '55555555555' || 
        cpf == '66666666666' || cpf == '77777777777' || 
        cpf == '88888888888' || cpf == '99999999999') {
        return false;
    }
    
 
    var soma = 0;
    for (var i = 0; i < 9; i++) {
        soma = soma + parseInt(cpf[i]) * (10 - i);
    }
    var digito1 = 11 - (soma % 11);
    if (digito1 > 9) {
        digito1 = 0;
    }
    
    if (digito1 != parseInt(cpf[9])) {
        return false;
    }
    
    soma = 0;
    for (var i = 0; i < 10; i++) {
        soma = soma + parseInt(cpf[i]) * (11 - i);
    }
    var digito2 = 11 - (soma % 11);
    if (digito2 > 9) {
        digito2 = 0;
    }
    
    if (digito2 != parseInt(cpf[10])) {
        return false;
    }
    
    return true;
}

function closeModal() {
    document.getElementById('successModal').classList.remove('show');
}