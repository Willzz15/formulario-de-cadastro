class ValidaFormulario {
  constructor() {
    this.formulario = document.querySelector('.formulario')
    this.eventos()
  }

  eventos() {
    this.formulario.addEventListener('submit', e => {
      this.handleSubmit(e);
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const camposValidos = this.camposSaoValidos();
    const senhaSaoValidas = this.senhaSaoValidas();

    if (camposValidos && senhaSaoValidas) {
      alert('Formulário enviado');
      this.formulario.submit();
    }
  }

  senhaSaoValidas() {
    let valid = true;

    const senha = document.querySelector('.senha');
    const repetirSenha = document.querySelector('.repetir-senha');

    if (senha.value !== repetirSenha.value) {
      valid = false;
      this.criaMsgErro(senha, 'Campos senha e repetir senha precisão ser iguais.');
      this.criaMsgErro(repetirSenha, 'Campos senha e repetir senha precisão ser iguais.');
    }
    if (senha.value.length < 6 || senha.value.length > 12) {
      valid = false;
      this.criaMsgErro(senha, 'Senha precisa estar entre 6 e 12 caracteres.')
    }

    return valid
  }

  camposSaoValidos() {
    let valid = true;

    for (let errorText of this.formulario.querySelectorAll('.erro-text')) {
      errorText.remove();
    }

    for (let campo of this.formulario.querySelectorAll('.validar')) {
      const label = campo.previousElementSibling.textContent;

      if (!campo.value) {
        this.criaMsgErro(campo, `Campo "${label}" não pode estar vazio`)
        valid = false;
      }
      if (campo.classList.contains('cpf')) {
        if (!this.validaCPF(campo)) valid = false;
      }
      if (campo.classList.contains('usuario')) {
        if (!this.validaUsuario(campo)) valid = false;
      }
    }
    return valid
  }

  validaUsuario(campo) {
    const usuario = campo.value;
    //Valide mostra se deve apresentar a menssagem ou não
    let valid = true;

    if (usuario.length < 3 || usuario.length > 12) {
      this.criaMsgErro(campo, 'Usuário precisa ter entre 3 e 12 caracteres.')
      valid = false;
    }
    //Tipos de caracteres e numeros
    if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.criaMsgErro(campo, 'Nome de usuário precisa conter apenas letras ou numero.')
      valid = false;
    }
    return valid
  }

  validaCPF(campo) {
    const cpf = new ValidaCPF(campo.value);

    if (!cpf.valida()) {
      this.criaMsgErro(campo, 'CPF inválido.');
      return false;
    }

    return true;
  }

  criaMsgErro(campo, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('erro-text');
    //Inserimos apos o campo do input a menssagem com este comando
    campo.insertAdjacentElement('afterend', div);
  }
}

const valida = new ValidaFormulario();