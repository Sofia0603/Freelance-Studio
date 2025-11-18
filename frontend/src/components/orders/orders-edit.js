export class OrdersEdit{
  constructor(openNewRoute){
    this.openNewRoute = openNewRoute;

    document.getElementById('saveButton').addEventListener('click', this.saveOrder.bind(this));

    const urlParams = new URLSearchParams(window.location.search);

    const id = urlParams.get('id');
    if(!id){
      return this.openNewRoute('/');
    }

    document.getElementById('updateButton').addEventListener('click', this.updateOrder.bind(this));





  }
}