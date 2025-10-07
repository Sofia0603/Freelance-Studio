import {Dashboard} from "./components/dashboard";
import {Login} from "./components/login";
import {SignUp} from "./components/sign-up";

export class Router {
  constructor() {
    this.initEvents();
    this.titlePageElement = document.getElementById('title')
    this.contentPageElement = document.getElementById('content');
    this.routes = [
      {
        route: '/',
        title:'Дашборд',
        filePathTemplate:'/templates/dashboard.html',
        useLayout:'/templates/layout.html',
        load:() =>{
          new Dashboard();
        }
      },
      {
        route: '/404',
        title:'Не найдено',
        filePathTemplate:'/templates/404.html',
        useLayout: false,
      },
      {
        route: '/login',
        title:'Авторизация',
        filePathTemplate:'/templates/login.html',
        useLayout: false,
        load:() =>{
          new Login();
        }
      },
      {
        route: '/sign-up',
        title:'Регистрация',
        filePathTemplate:'/templates/sign-up.html',
        useLayout: false,
        load:() =>{
          new SignUp();
        }
      },
    ]
  }

  initEvents(){
    window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this)); // момент загрузки страницы
    window.addEventListener('popstate', this.activateRoute.bind(this)); // момент смены URL
  }

  async activateRoute(){
    const urlRoute = window.location.pathname;
    const newRoute = this.routes.find(item => item.route === urlRoute);


    if (newRoute) {

      if(newRoute.title){
        this.titlePageElement.innerText = newRoute.title + ' | Freelance Studio';
      }

      if(newRoute.filePathTemplate){
        let contentBlock = this.contentPageElement;
        if(newRoute.useLayout){
          this.contentPageElement.innerHTML = await fetch(newRoute.useLayout).then(response => response.text());
          contentBlock = document.getElementById('content-layout')
          document.body.classList.add('sidebar-mini')
          document.body.classList.add('layout-fixed')
        } else {
          document.body.classList.remove('sidebar-mini')
          document.body.classList.remove('layout-fixed')
        }

        contentBlock.innerHTML = await fetch(newRoute.filePathTemplate).then(response => response.text());

      }


      if(newRoute.load && typeof newRoute.load === 'function'){
        newRoute.load();
      }

    } else {
        console.log('Route Not Found');
        window.location = '/404';
    }

  }
}