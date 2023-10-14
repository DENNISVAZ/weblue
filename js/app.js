class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    if (this.form) {
      this.url = this.form.getAttribute("action");
    }
    this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess() {
    this.form.innerHTML = this.settings.success;
  }

  displayError() {
    this.form.innerHTML = this.settings.error;
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    });
    return formObject;
  }

  onSubmission(event) {
    event.preventDefault();
    event.target.disabled = true;
    event.target.innerText = "Enviando...";
  }

  async sendForm(event) {
    try {
      this.onSubmission(event);
      await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.getFormObject()),
      });
      this.displaySuccess(swal({   
				   title: "Muito Obrigado(a) !", 
				   text: "Dado(s) enviado(s) com sucesso...", 
			           type: "success"})
				   .then(function(){ 
      					swal({   
				   		title: "Aguarde", 
				   		text: "Recarregando...", 
			           		type: "success",
						buttons: false,
						timer: 1000})
					,location.reload()}));
    } catch (error) {
      this.displayError();
      throw new Error(swal({   
				   title: "Desculpe...", 
				   text: "Ocorreu um erro durante o envio... Favor enviar novamente....", 
			           type: "error"})
				   .then(function(){ 
					swal({   
				   		title: "Aguarde", 
				   		text: "Recarregando...", 
			           		type: "error",
						buttons: false,
						timer: 1000})
					,location.reload()}));
    }
  }

  init() {
    if (this.form) this.formButton.addEventListener("click", this.sendForm);
    return this;
  }
}

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
  success: "",
  error: "",

});
formSubmit.init();
