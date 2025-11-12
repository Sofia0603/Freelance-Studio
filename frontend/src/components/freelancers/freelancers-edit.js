import {HttpUtils} from "../../utils/http-utils";
import config from "../../config/config";
import {CommonUtils} from "../../utils/common-utils";

export class FreelancersEdit {


  constructor(openNewRoute) {
    this.openNewRoute = openNewRoute;
    const urlParams = new URLSearchParams(window.location.search);

    const id = urlParams.get('id');
    if(!id){
      return this.openNewRoute('/');
    }



    document.getElementById('nameInput');
    document.getElementById('lastNameInput');
    document.getElementById('emailInput');
    document.getElementById('educationInput');
    document.getElementById('locationInput');
    document.getElementById('skillsInput');
    document.getElementById('infoInput');



    this.levelSelectElement = document.getElementById('levelSelect');

    this.getFreelancer(id).then();

  }


  async getFreelancer(id) {

    const result = await HttpUtils.request('/freelancers/' + id, )

    if(result.redirect){
      return this.openNewRoute(result.redirect);
    }

    if (result.error || !result.response || (result.response &&  result.response.error )) {
      return alert ('Возникла ошибка при запросе фрилансера. Обратитесь в поддержку')
    }

    this.showFreelancer(result.response);
  }


  showFreelancer(freelancer) {

    const breadcrumbsElement = document.getElementById('breadcrumbs-freelancer');

    breadcrumbsElement.href = '/freelancers/view?id=' + freelancer.id;
    breadcrumbsElement.innerText = freelancer.name + ' ' + freelancer.lastName;

    if (freelancer.avatar) {
      document.getElementById('avatar').src = config.host + freelancer.avatar;
    }

    document.getElementById('level').innerHTML = CommonUtils.getLevelHtml(freelancer.level)


    document.getElementById('nameInput').value = freelancer.name;
    document.getElementById('lastNameInput').value = freelancer.lastName;
    document.getElementById('emailInput').value = freelancer.email;
    document.getElementById('educationInput').value = freelancer.education;
    document.getElementById('locationInput').value = freelancer.location;
    document.getElementById('skillsInput').value = freelancer.skills;
    document.getElementById('infoInput').value = freelancer.info;

    for (let i = 0; i < this.levelSelectElement.options.length; i++) {
      if(this.levelSelectElement.options[i].value === freelancer.level) {
        this.levelSelectElement.selectedIndex = i;
      }
    }
  }


  validateForm() {
    let isValid = true;

    let textInputArray = [this.nameInputElement, this.lastNameInputElement,
      this.educationInputElement,this.locationInputElement, this.skillsInputElement,this.infoInputElement, this.levelSelectElement];



    for(let i = 0; i < textInputArray.length; i++) {
      if (textInputArray[i].value) {
        textInputArray[i].classList.remove('is-invalid');
      } else {
        textInputArray[i].classList.add('is-invalid');
        isValid = false
      }
    }

    if (this.emailInputElement.value && this.emailInputElement.value.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
      this.emailInputElement.classList.remove('is-invalid');
    } else {
      this.emailInputElement.classList.add('is-invalid');
      isValid = false;
    }
    return isValid;
  }



}